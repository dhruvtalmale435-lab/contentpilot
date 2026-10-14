import json
import uuid
from typing import Optional
from openai import AsyncOpenAI
from app.services.base import BaseAIProvider
from app.services.mock_provider import MockAIProvider
from app.models.schemas import (
    ContentGenerationRequest,
    ContentGenerationResponse,
    GeneratedContentItem,
    AnalyzerRequest,
    AnalyzerResponse,
    RewriteRequest,
    RewriteResponse,
    RecommendationRequest,
    RecommendationResponse,
)

class OpenAIProvider(BaseAIProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.client = AsyncOpenAI(api_key=api_key) if api_key else None
        self.mock_fallback = MockAIProvider()

    async def generate_content(self, request: ContentGenerationRequest) -> ContentGenerationResponse:
        if not self.client:
            return await self.mock_fallback.generate_content(request)

        brand_info = ""
        if request.brand_context:
            bc = request.brand_context
            brand_info = (
                f"\nBrand Name: {bc.business_name}\n"
                f"Description: {bc.business_description}\n"
                f"Tone: {bc.tone_of_voice}\n"
                f"Content Pillars: {', '.join(bc.content_pillars)}\n"
                f"Prohibited Claims: {', '.join(bc.prohibited_claims)}\n"
            )

        prompt = f"""You are an elite creative director and social media strategist.
Generate 2 distinct, high-impact content pieces for {request.platform} in the format of {request.format_type}.
Topic / Goal: {request.topic_or_goal}
Objective: {request.objective}
Tone: {request.tone}
Target Audience: {request.target_audience or 'Target social audience'}
{brand_info}

Return ONLY valid JSON matching this schema:
{{
  "items": [
    {{
      "title": "Short creative title",
      "hook": "Compelling first 3 seconds or line 1 hook",
      "body_caption": "Full scannable body text with line breaks",
      "hashtags": ["#tag1", "#tag2", "#tag3"],
      "call_to_action": "Specific engagement or save CTA",
      "visual_direction": "Brief description of the accompanying image, video shot, or visual card"
    }}
  ]
}}
"""
        try:
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                temperature=0.7,
                max_tokens=1200,
            )
            data = json.loads(response.choices[0].message.content or "{}")
            raw_items = data.get("items", [])
            items = []
            for item in raw_items:
                items.append(
                    GeneratedContentItem(
                        id=str(uuid.uuid4()),
                        platform=request.platform,
                        format_type=request.format_type,
                        title=item.get("title", "Untitled Content"),
                        hook=item.get("hook", ""),
                        body_caption=item.get("body_caption", ""),
                        hashtags=item.get("hashtags", []),
                        call_to_action=item.get("call_to_action", ""),
                        visual_direction=item.get("visual_direction", ""),
                        estimated_read_time_seconds=20
                    )
                )
            if not items:
                return await self.mock_fallback.generate_content(request)

            tokens = response.usage.total_tokens if response.usage else 500
            cost = (tokens / 1000) * 0.0006 # approximate gpt-4o-mini cost
            return ContentGenerationResponse(
                items=items,
                provider="OpenAI gpt-4o-mini (Live Cloud Provider)",
                is_mock=False,
                tokens_used=tokens,
                estimated_cost_usd=round(cost, 6)
            )
        except Exception:
            # Resilient fallback to mock provider with notification
            res = await self.mock_fallback.generate_content(request)
            res.provider = "ContentPilot Fallback Engine (OpenAI API Call Failed)"
            return res

    async def analyze_content(self, request: AnalyzerRequest) -> AnalyzerResponse:
        if not self.client:
            return await self.mock_fallback.analyze_content(request)

        # In production OpenAI mode, prompt for structured JSON matching AnalyzerResponse
        # For simplicity and speed, if OpenAI fails or key missing, fallback to mock
        try:
            prompt = f"""You are a master social media content packaging analyst (inspired by vidIQ and TubeBuddy).
Critique this social media piece:
Platform: {request.platform}
Format: {request.content_type}
Content:
\"\"\"{request.text_content}\"\"\"

Score each of these 10 dimensions from 0 to 100:
1. hook_strength
2. audience_relevance
3. curiosity_retention_structure
4. clarity_readability
5. emotional_resonance
6. shareability_save_worthiness
7. cta_clarity
8. brand_consistency
9. originality_repetition
10. visual_concept

Return valid JSON with keys:
- content_readiness_score (0-100)
- status_label ("Ready to Publish", "Minor Tweaks Recommended", or "Rethink Hook")
- dimension_scores: list of {{ "name", "key", "score", "rating", "feedback" }}
- strengths: list of strings
- weaknesses: list of strings
- suggested_revisions: list of strings
- before_after_examples: list of {{ "aspect", "before", "after", "why_it_works" }}
- improved_draft: string
- assessment_explanation: string
"""
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                temperature=0.3,
                max_tokens=1500,
            )
            data = json.loads(response.choices[0].message.content or "{}")
            return AnalyzerResponse(
                content_readiness_score=data.get("content_readiness_score", 75),
                status_label=data.get("status_label", "Ready to Publish"),
                dimension_scores=data.get("dimension_scores", []),
                strengths=data.get("strengths", ["Clear messaging"]),
                weaknesses=data.get("weaknesses", ["Could sharpen the hook"]),
                suggested_revisions=data.get("suggested_revisions", ["Add explicit CTA"]),
                before_after_examples=data.get("before_after_examples", []),
                improved_draft=data.get("improved_draft", request.text_content),
                assessment_explanation=data.get("assessment_explanation", "AI analyzed content readiness."),
                provider="OpenAI gpt-4o-mini (Live Cloud Provider)",
                is_mock=False
            )
        except Exception:
            return await self.mock_fallback.analyze_content(request)

    async def rewrite_content(self, request: RewriteRequest) -> RewriteResponse:
        if not self.client:
            return await self.mock_fallback.rewrite_content(request)
        try:
            prompt = f"""Rewrite this social media text:
Instruction: {request.instruction}
Original:
\"\"\"{request.text_content}\"\"\"

Return JSON:
{{
  "rewritten_text": "...",
  "rationale": "...",
  "changes_made": ["...", "..."]
}}
"""
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                temperature=0.7,
            )
            data = json.loads(response.choices[0].message.content or "{}")
            return RewriteResponse(
                rewritten_text=data.get("rewritten_text", request.text_content),
                rationale=data.get("rationale", "Applied requested instruction"),
                changes_made=data.get("changes_made", ["Adjusted phrasing"]),
                provider="OpenAI gpt-4o-mini (Live Cloud Provider)",
                is_mock=False
            )
        except Exception:
            return await self.mock_fallback.rewrite_content(request)

    async def get_recommendations(self, request: RecommendationRequest) -> RecommendationResponse:
        return await self.mock_fallback.get_recommendations(request)
