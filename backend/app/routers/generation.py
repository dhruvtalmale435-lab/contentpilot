from fastapi import APIRouter, HTTPException
from app.models.schemas import ContentGenerationRequest, ContentGenerationResponse, RewriteRequest, RewriteResponse
from app.services import get_ai_provider

router = APIRouter(prefix="/generation", tags=["Generation"])

@router.post("/create", response_model=ContentGenerationResponse)
async def generate_content(request: ContentGenerationRequest):
    try:
        provider = get_ai_provider()
        return await provider.generate_content(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@router.post("/rewrite", response_model=RewriteResponse)
async def rewrite_content(request: RewriteRequest):
    try:
        provider = get_ai_provider()
        return await provider.rewrite_content(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Rewrite failed: {str(e)}")
