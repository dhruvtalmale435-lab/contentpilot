from fastapi import APIRouter, HTTPException
from app.models.schemas import RecommendationRequest, RecommendationResponse
from app.services import get_ai_provider

router = APIRouter(prefix="/recommendations", tags=["Recommendations & Insights"])

@router.post("/insights", response_model=RecommendationResponse)
async def generate_recommendations(request: RecommendationRequest):
    try:
        provider = get_ai_provider()
        return await provider.get_recommendations(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate recommendations: {str(e)}")
