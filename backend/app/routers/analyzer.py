from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyzerRequest, AnalyzerResponse
from app.services import get_ai_provider

router = APIRouter(prefix="/analyzer", tags=["Content Potential Analyzer"])

@router.post("/score", response_model=AnalyzerResponse)
async def analyze_content_potential(request: AnalyzerRequest):
    if not request.text_content.strip():
        raise HTTPException(status_code=400, detail="Text content cannot be empty.")
    try:
        provider = get_ai_provider()
        return await provider.analyze_content(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
