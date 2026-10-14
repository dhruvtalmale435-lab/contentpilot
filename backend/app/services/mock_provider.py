import re
import uuid
from typing import List
from app.services.base import BaseAIProvider
from app.models.schemas import (
    ContentGenerationRequest,
    ContentGenerationResponse,
    GeneratedContentItem,
    AnalyzerRequest,
    AnalyzerResponse,
    DimensionScore,
    BeforeAfterExample,
    RewriteRequest,
    RewriteResponse,
    RecommendationRequest,
    RecommendationResponse,
    ActionableInsight,
)

class MockAIProvider(BaseAIProvider):
    async def generate_content(self, request: ContentGenerationRequest) -> ContentGenerationResponse:
        brand_name = request.brand_context.business_name if request.brand_context else "ContentPilot Brand"
        topic = request.topic_or_goal or "Transform your social media strategy"
        platform = request.platform.lower()
        format_type = request.format_type.lower()
        
        items: List[GeneratedContentItem] = []
        
        # High quality tailored templates based on format and platform
        if "reel" in format_type or "script" in format_type or platform == "tiktok":
            items.append(
                GeneratedContentItem(
                    id=str(uuid.uuid4()),
                    platform=request.platform,
                    format_type="Reel / Short Script",
                    title=f"3 Common Mistakes in {topic}",
                    hook="Stop making this 1 mistake if you want real engagement on social media.",
                    body_caption=(
                        f"Most creators overcomplicate {topic}. Here is the exact 3-step framework we use at {brand_name}:\n\n"
                        "1. Clarify the core transformation before filming.\n"
                        "2. Cut the first 3 seconds of fluff — start in the action.\n"
                        "3. Deliver on the promise before asking for anything.\n\n"
                        "Save this for your next batch filming day! 🎬"
                    ),
                    hashtags=["#ContentStrategy", "#CreatorEconomy", "#SocialMediaTips", "#GrowthHacks", f"#{brand_name.replace(' ', '')}"],
                    call_to_action="Comment 'FRAMEWORK' below and we will send you our complete planning checklist.",
                    visual_direction="Open with tight framing, bold on-screen text overlay. Fast cut every 2.5 seconds with B-roll of the workspace.",
                    script_scenes=[
                        {"scene": "0:00 - 0:03", "visual": "Facing camera, direct eye contact with text popping above head", "audio": "Stop making this 1 mistake if you want actual engagement."},
                        {"scene": "0:03 - 0:15", "visual": "Screen recording showing high dropoff vs. high retention hook curve", "audio": "When you introduce yourself for 5 seconds, 70% of viewers scroll. Jump straight into the conflict."},
                        {"scene": "0:15 - 0:30", "visual": "Over-the-shoulder shot writing 3 concrete steps in notebook", "audio": "Step one: hook the pain point. Step two: deliver unexpected insight. Step three: direct micro-CTA."},
                        {"scene": "0:30 - 0:35", "visual": "Call to action card with brand colors", "audio": "Comment 'FRAMEWORK' and I'll send you our ready-to-use template."}
                    ],
                    estimated_read_time_seconds=35
                )
            )
            items.append(
                GeneratedContentItem(
                    id=str(uuid.uuid4()),
                    platform=request.platform,
                    format_type="Quick Reaction Script",
                    title=f"The Truth About {topic}",
                    hook="I used to think posting every day was the answer. I was wrong.",
                    body_caption=(
                        f"Consistency without intentionality is just noise. At {brand_name}, we shifted from 7 posts a week to 3 high-impact pieces.\n\n"
                        "The result? 2.4x higher reach and 4x more bookmarks.\n\n"
                        "Quality > Volume. What's your current posting cadence?"
                    ),
                    hashtags=["#SmartSocial", "#ContentCreation", "#OrganicGrowth", "#MarketingTips"],
                    call_to_action="Drop your thoughts in the comments — do you prioritize daily volume or weekly depth?",
                    visual_direction="Casual handheld camera walk-and-talk, relaxed warm lighting, subtitle style with yellow highlight.",
                    estimated_read_time_seconds=30
                )
            )
        elif "carousel" in format_type or platform == "linkedin":
            items.append(
                GeneratedContentItem(
                    id=str(uuid.uuid4()),
                    platform=request.platform,
                    format_type="Carousel / Document Outline",
                    title=f"The Blueprint for {topic}",
                    hook=f"Why 90% of approaches to {topic} fail (and how {brand_name} solves it):",
                    body_caption=(
                        f"A breakdown of the modern playbook for {topic}.\n\n"
                        "Swipe through for the 5 fundamental rules we live by.\n\n"
                        "Key takeaway: Never publish without a clear answer to 'Why would someone bookmark this?'\n\n"
                        "Repost ♻️ if this helped your workflow!"
                    ),
                    hashtags=["#ThoughtLeadership", "#SocialMediaROI", "#ContentMarketing", "#BusinessStrategy"],
                    call_to_action="Which of these 5 steps is your team currently focused on? Let's discuss below.",
                    visual_direction="Minimalist editorial design, clean typography on warm ivory background, high contrast cobalt accents.",
                    carousel_slides=[
                        {"slide": "Slide 1 (Cover)", "headline": f"The No-Nonsense Guide to {topic}", "subtext": "5 principles for scalable organic growth without burning out."},
                        {"slide": "Slide 2 (The Problem)", "headline": "The Hidden Vanity Metric Trap", "subtext": "Likes feel good. Bookmarks and shares drive pipeline and conversions."},
                        {"slide": "Slide 3 (Principle 1)", "headline": "1 Idea Per Asset", "subtext": "Confusion kills retention. If your post needs two conclusions, you have two posts."},
                        {"slide": "Slide 4 (Principle 2)", "headline": "Make the Hook Unskippable", "subtext": "Pose a problem your audience felt today, not a broad theoretical concept."},
                        {"slide": "Slide 5 (Summary & Action)", "headline": "Ready to test this?", "subtext": "Save this post and implement Principle 1 on your next scheduled post."}
                    ],
                    estimated_read_time_seconds=60
                )
            )
        else:
            # Standard single image / feed post
            items.append(
                GeneratedContentItem(
                    id=str(uuid.uuid4()),
                    platform=request.platform,
                    format_type="Feed Post",
                    title=f"Actionable Guide: {topic}",
                    hook="Here is the unglamorous truth about building momentum on social:",
                    body_caption=(
                        f"You don't need a viral video. You need an engine that reliably turns {topic} into engaged conversations.\n\n"
                        f"At {brand_name}, we follow 3 rules:\n"
                        "• Lead with the payoff in line 1.\n"
                        "• Cut jargon. If a 12-year-old can't grasp the core benefit, rephrase it.\n"
                        "• Give one clear next step.\n\n"
                        "Double-tap if you agree, or share with a teammate who needs this today."
                    ),
                    hashtags=["#SmallBusinessMarketing", "#OrganicReach", "#ContentPilot", "#StrategyFirst"],
                    call_to_action="Hit Save to reference this during your weekly planning session.",
                    visual_direction="High resolution quote card with clean dark ink navy text on soft stone container.",
                    estimated_read_time_seconds=20
                )
            )
            items.append(
                GeneratedContentItem(
                    id=str(uuid.uuid4()),
                    platform=request.platform,
                    format_type="Story / Quick Prompt",
                    title=f"Question of the Day: {topic}",
                    hook="Quick pulse check for everyone working on their brand this month:",
                    body_caption=(
                        f"When it comes to {topic}, what is your biggest bottleneck right now?\n\n"
                        "A) Generating fresh hooks\n"
                        "B) Consistency in posting\n"
                        "C) Understanding what actually drove results\n\n"
                        "Reply with your letter!"
                    ),
                    hashtags=["#CommunityCheckin", "#SocialMediaSurvey"],
                    call_to_action="Tap the poll or DM us your answer.",
                    visual_direction="Interactive story layout with sticker poll placeholder and brand color gradient.",
                    estimated_read_time_seconds=12
                )
            )
            
        return ContentGenerationResponse(
            items=items,
            provider="ContentPilot Mock AI Provider (Deterministic Local Engine)",
            is_mock=True,
            tokens_used=420,
            estimated_cost_usd=0.0
        )

    async def analyze_content(self, request: AnalyzerRequest) -> AnalyzerResponse:
        text = request.text_content.strip()
        words = text.split()
        word_count = len(words)
        
        # Qualitative heuristics
        first_sentence = text.split("\n")[0] if "\n" in text else (text.split(".")[0] if "." in text else text)
        has_question = "?" in first_sentence
        has_numbers = bool(re.search(r'\d+', first_sentence))
        has_clear_cta = any(phrase in text.lower() for phrase in ["comment", "save", "share", "link in bio", "dm", "click", "read more", "tap", "repost"])
        has_emojis = bool(re.search(r'[^\w\s,.\-!?:;\'"()/@]', text))
        has_bullet_points = "•" in text or "- " in text or "1." in text
        
        # 1. Hook Strength (0-100)
        hook_score = 65
        if has_numbers or has_question:
            hook_score += 18
        if len(first_sentence) < 80 and len(first_sentence) > 15:
            hook_score += 12
        if any(weak in first_sentence.lower() for weak in ["in this post", "i am excited to", "hello guys", "check out"]):
            hook_score -= 25
        hook_score = max(35, min(96, hook_score))
        
        # 2. Audience Relevance
        audience_score = 78 if request.target_audience else 68
        
        # 3. Curiosity and Retention Structure
        retention_score = 75 if (has_bullet_points and word_count > 30) else 62
        
        # 4. Clarity and Readability
        readability_score = 85 if (word_count < 150 and "\n" in text) else 70
        
        # 5. Emotional Resonance
        emotional_score = 72 if any(word in text.lower() for word in ["truth", "mistake", "secret", "love", "hate", "struggle", "finally", "stop", "transform"]) else 60
        
        # 6. Shareability and Save-worthiness
        save_score = 80 if (has_bullet_points or "framework" in text.lower() or "steps" in text.lower()) else 64
        
        # 7. CTA Clarity
        cta_score = 90 if has_clear_cta else 45
        
        # 8. Brand Consistency
        brand_score = 82 if (request.brand_context and request.brand_context.business_name.lower() in text.lower()) else 74
        
        # 9. Originality and Repetition
        originality_score = 76
        
        # 10. Visual Concept
        visual_score = 80 if request.visual_concept_description else 65
        
        # Overall readiness score (weighted average)
        overall = int(
            hook_score * 0.18 +
            cta_score * 0.14 +
            readability_score * 0.12 +
            retention_score * 0.12 +
            save_score * 0.12 +
            audience_score * 0.10 +
            emotional_score * 0.08 +
            brand_score * 0.06 +
            originality_score * 0.04 +
            visual_score * 0.04
        )
        
        status_label = "Ready to Publish" if overall >= 80 else ("Minor Tweaks Recommended" if overall >= 65 else "Rethink Hook & Structure")
        
        dimension_scores = [
            DimensionScore(
                name="Hook Strength",
                key="hook_strength",
                score=hook_score,
                rating="Strong" if hook_score >= 80 else ("Moderate" if hook_score >= 60 else "Weak"),
                feedback="First line directly challenges conventional wisdom or piques curiosity." if hook_score >= 75 else "Opening is passive or introductory. Lead with the conflict or immediate value."
            ),
            DimensionScore(
                name="Audience Relevance",
                key="audience_relevance",
                score=audience_score,
                rating="High" if audience_score >= 75 else "Fair",
                feedback="Speaks clearly to the pain points of the intended viewer."
            ),
            DimensionScore(
                name="Curiosity & Retention",
                key="curiosity_retention",
                score=retention_score,
                rating="Good" if retention_score >= 70 else "Average",
                feedback="Pacing maintains momentum through distinct visual breaks and short paragraphs."
            ),
            DimensionScore(
                name="Clarity & Readability",
                key="clarity_readability",
                score=readability_score,
                rating="Excellent" if readability_score >= 80 else "Good",
                feedback="Clean whitespace and scannable rhythm. No dense multi-sentence text walls."
            ),
            DimensionScore(
                name="Emotional Resonance",
                key="emotional_resonance",
                score=emotional_score,
                rating="Good" if emotional_score >= 70 else "Neutral",
                feedback="Addresses real frustration rather than generic corporate pleasantries."
            ),
            DimensionScore(
                name="Share & Save Worthiness",
                key="shareability",
                score=save_score,
                rating="High" if save_score >= 75 else "Moderate",
                feedback="Contains high utility information that users bookmark for future reference."
            ),
            DimensionScore(
                name="CTA Clarity",
                key="cta_clarity",
                score=cta_score,
                rating="Direct" if cta_score >= 80 else "Missing/Vague",
                feedback="Provides a single, low-friction action for the audience to take." if cta_score >= 70 else "CTA is either missing or asks for too much commitment upfront."
            ),
            DimensionScore(
                name="Brand Voice Consistency",
                key="brand_consistency",
                score=brand_score,
                rating="Aligned" if brand_score >= 75 else "General",
                feedback="Aligns with the defined tone and terminology."
            ),
            DimensionScore(
                name="Originality & Repetition",
                key="originality",
                score=originality_score,
                rating="Solid",
                feedback="Avoids clichéd filler phrases (e.g. 'In today's fast-paced world')."
            ),
            DimensionScore(
                name="Visual Concept Alignment",
                key="visual_concept",
                score=visual_score,
                rating="Good",
                feedback="Text complements graphic/video pacing effectively."
            ),
        ]
        
        strengths = []
        if hook_score >= 75:
            strengths.append(f"Strong opening hook ({first_sentence[:45]}...) captures attention quickly.")
        if readability_score >= 75:
            strengths.append("Formatting uses ample whitespace and scannable line breaks.")
        if has_clear_cta:
            strengths.append("Explicit call-to-action reduces friction for reader response.")
        if not strengths:
            strengths.append("Topic choice is relevant and addresses a clear problem area.")
            
        weaknesses = []
        if hook_score < 75:
            weaknesses.append("Opening sentence is too generic or descriptive. Turn it into a provocative statement or question.")
        if not has_clear_cta:
            weaknesses.append("Missing an explicit CTA (e.g. 'Save this', 'Leave a comment with X', or 'Share with a friend').")
        if word_count > 180 and not has_bullet_points:
            weaknesses.append("Body copy is dense. Add bullet points or numbered lists to increase retention.")
        if not weaknesses:
            weaknesses.append("Could incorporate an even more specific data point or real-world example to boost credibility.")
            
        suggested_revisions = [
            "Cut any opening pleasantries and lead with the surprising insight in line 1.",
            "Use active voice throughout (e.g. 'Build an engine' instead of 'An engine should be built').",
            "Pair with a high-contrast visual (e.g., text overlay or step-by-step diagram)."
        ]
        
        improved_draft = (
            f"Stop scrolling if you want actual engagement on {request.platform.title()}.\n\n"
            f"{first_sentence}\n\n"
            "Here is the simple 3-part framework that changes everything:\n"
            "• Step 1: Hook the exact problem your audience felt today.\n"
            "• Step 2: Deliver 1 actionable insight with zero fluff.\n"
            "• Step 3: Ask 1 low-friction question.\n\n"
            "Bookmark this 📌 for your next creation session!"
        )
        
        before_after_examples = [
            BeforeAfterExample(
                aspect="Hook / Opening Line",
                before=first_sentence if len(first_sentence) < 90 else first_sentence[:80] + "...",
                after=f"Stop making this 1 critical mistake with {request.platform.title()} content:",
                why_it_works="Creates an open curiosity loop and signals immediate problem resolution."
            ),
            BeforeAfterExample(
                aspect="Call to Action (CTA)",
                before="Thanks for reading!" if not has_clear_cta else "Check it out",
                after="Save this post 📌 so you can apply Step 2 before publishing tomorrow.",
                why_it_works="Gives a clear, specific utility reason to save the post right now."
            )
        ]
        
        assessment_explanation = (
            f"This piece scored {overall}/100. It demonstrates sound topical relevance, but elevating "
            "the opening hook and sharpening the closing CTA will significantly enhance viewer completion "
            "rates and bookmark velocity based on creator optimization best practices."
        )
        
        return AnalyzerResponse(
            content_readiness_score=overall,
            status_label=status_label,
            dimension_scores=dimension_scores,
            strengths=strengths,
            weaknesses=weaknesses,
            suggested_revisions=suggested_revisions,
            before_after_examples=before_after_examples,
            improved_draft=improved_draft,
            assessment_explanation=assessment_explanation,
            provider="ContentPilot Heuristic Evaluator (Local Deterministic Engine)",
            is_mock=True
        )

    async def rewrite_content(self, request: RewriteRequest) -> RewriteResponse:
        instruction = request.instruction.lower()
        original = request.text_content
        
        if "punch" in instruction or "short" in instruction:
            rewritten = "\n".join([line for line in original.split("\n") if line.strip()][:3])
            changes = ["Removed filler phrases", "Compressed into 3 punchy lines", "Highlighted the core benefit"]
            rationale = "Shortened text to maximize scanning speed and mobile screen real estate."
        elif "witty" in instruction or "humor" in instruction:
            rewritten = f"Plot twist: {original.strip()} (Yes, really. We checked twice.)"
            changes = ["Added conversational self-awareness", "Injected playful hook phrasing"]
            rationale = "Elevated tone to conversational and witty for community resonance."
        elif "hook" in instruction:
            rewritten = f"Here is the uncomfortable truth about this:\n\n{original}"
            changes = ["Replaced soft introduction with high-friction curiosity hook"]
            rationale = "Increased opening retention potential by creating a curiosity gap."
        else:
            rewritten = f"✨ Refined for clarity:\n\n{original}\n\n👉 What are your thoughts on this?"
            changes = ["Enhanced structure", "Added clarifying CTA"]
            rationale = "Applied standard readability and engagement polishing."
            
        return RewriteResponse(
            rewritten_text=rewritten,
            rationale=rationale,
            changes_made=changes,
            provider="ContentPilot Mock AI Provider",
            is_mock=True
        )

    async def get_recommendations(self, request: RecommendationRequest) -> RecommendationResponse:
        insights = [
            ActionableInsight(
                observation="Short-form Reels and carousel posts generate 3.1x more bookmarks than single static image posts.",
                supporting_metrics={"carousel_avg_bookmarks": 42, "static_avg_bookmarks": 13, "sample_size": "24 posts across 30 days"},
                limitations="Based on a 30-day window; algorithm distribution shifts periodically.",
                recommended_experiment="Convert your top 2 text ideas this week into a 5-slide carousel and compare 7-day bookmark volume.",
                expected_outcome="Targeting 25%+ increase in 7-day bookmark-to-impression ratio."
            ),
            ActionableInsight(
                observation="Publishing between 9:00 AM - 10:30 AM local time yields 48% higher first-hour comment velocity.",
                supporting_metrics={"morning_first_hour_comments": 18.4, "afternoon_first_hour_comments": 12.1},
                limitations="Manual metric entry sample; weekend patterns differ from weekdays.",
                recommended_experiment="Schedule Tuesday and Thursday posts strictly at 9:15 AM and monitor initial notification responses.",
                expected_outcome="Faster initial engagement signal helps organic reach expansion."
            )
        ]
        
        return RecommendationResponse(
            insights=insights,
            next_week_strategy="Prioritize 2 educational carousels, 1 behind-the-scenes reel, and 1 community check-in post."
        )
