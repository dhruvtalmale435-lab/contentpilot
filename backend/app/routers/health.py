from fastapi import APIRouter
from app.config import settings
from app.models.schemas import HealthResponse
from app.services import get_ai_provider

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
async def health_check():
    provider = get_ai_provider()
    provider_name = "OpenAI Live Cloud" if hasattr(provider, "client") and provider.client else "Mock Local Engine"
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        environment=settings.ENVIRONMENT,
        ai_provider=provider_name,
        supabase_configured=bool(settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY)
    )
