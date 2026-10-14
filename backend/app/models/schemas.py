from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Health Schema ---
class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
    ai_provider: str
    supabase_configured: bool

# --- Brand Hub Context ---
class BrandContext(BaseModel):
    business_name: str
    business_description: str
    industry: Optional[str] = "General"
    tone_of_voice: str = "Professional yet conversational"
    target_audiences: List[str] = Field(default_factory=list)
    content_pillars: List[str] = Field(default_factory=list)
    products_services: List[Dict[str, Any]] = Field(default_factory=list)
    prohibited_claims: List[str] = Field(default_factory=list)
    brand_colors: List[str] = Field(default_factory=lambda: ["#202D46", "#3457F1", "#F6F5F1", "#D9F078"])

# --- Content Generation ---
class ContentGenerationRequest(BaseModel):
    platform: str = Field(..., description="e.g. instagram, linkedin, twitter, tiktok, youtube")
    format_type: str = Field(..., description="e.g. post, reel_script, carousel, hook_list, weekly_batch, story")
    topic_or_goal: str
    objective: str = "engagement"
    tone: str = "conversational"
    target_audience: Optional[str] = None
    product_name: Optional[str] = None
    language: str = "English"
    reference_material: Optional[str] = None
    brand_context: Optional[BrandContext] = None

class GeneratedContentItem(BaseModel):
    id: str
    platform: str
    format_type: str
    title: str
    hook: str
    body_caption: str
    hashtags: List[str]
    call_to_action: str
    visual_direction: Optional[str] = None
    script_scenes: Optional[List[Dict[str, str]]] = None # for Reels/TikToks
    carousel_slides: Optional[List[Dict[str, str]]] = None # for Carousels
    estimated_read_time_seconds: int = 15

class ContentGenerationResponse(BaseModel):
    items: List[GeneratedContentItem]
    provider: str
    is_mock: bool
    tokens_used: int = 0
    estimated_cost_usd: float = 0.0

# --- Content Potential Analyzer (Key Differentiator) ---
class AnalyzerRequest(BaseModel):
    content_type: str = "caption" # caption, hook, reel_script, carousel, idea
    platform: str = "instagram"
    text_content: str
    visual_concept_description: Optional[str] = None
    target_audience: Optional[str] = None
    objective: Optional[str] = "engagement"
    brand_context: Optional[BrandContext] = None

class DimensionScore(BaseModel):
    name: str
    key: str
    score: int # 0 to 100
    rating: str # Poor, Needs Improvement, Good, Excellent
    feedback: str

class BeforeAfterExample(BaseModel):
    aspect: str
    before: str
    after: str
    why_it_works: str

class AnalyzerResponse(BaseModel):
    content_readiness_score: int # 0 to 100
    status_label: str # e.g. "Ready to Publish", "Minor Tweaks Suggested", "Rethink Hook"
    dimension_scores: List[DimensionScore]
    strengths: List[str]
    weaknesses: List[str]
    suggested_revisions: List[str]
    before_after_examples: List[BeforeAfterExample]
    improved_draft: str
    assessment_explanation: str
    methodology_note: str = (
        "Content Readiness Score is a heuristic and AI-assisted qualitative critique evaluated "
        "against creator retention, hook mechanics, clarity, and platform standards. It is an "
        "editorial estimate and does not constitute a guaranteed predictive probability of virality."
    )
    provider: str
    is_mock: bool

# --- Rewrite / Critique Tool ---
class RewriteRequest(BaseModel):
    text_content: str
    instruction: str # e.g. "make it punchier", "change tone to witty", "shorten to under 100 words"
    platform: Optional[str] = "instagram"
    brand_context: Optional[BrandContext] = None

class RewriteResponse(BaseModel):
    rewritten_text: str
    rationale: str
    changes_made: List[str]
    provider: str
    is_mock: bool

# --- Insights & Recommendations ---
class RecommendationRequest(BaseModel):
    business_id: Optional[str] = None
    recent_metrics: Optional[List[Dict[str, Any]]] = None
    target_goals: Optional[List[str]] = None

class ActionableInsight(BaseModel):
    observation: str
    supporting_metrics: Dict[str, Any]
    limitations: str
    recommended_experiment: str
    expected_outcome: str

class RecommendationResponse(BaseModel):
    insights: List[ActionableInsight]
    next_week_strategy: str

# --- Admin & Subscription Schemas ---
class AdminMetricsResponse(BaseModel):
    total_users: int
    active_subscriptions: int
    mrr_usd: float
    free_users: int
    pro_users: int
    agency_users: int
    ai_generations_month: int
    estimated_ai_cost_usd: float
    system_status: str
    storage_used_mb: float
    active_workspaces: int
