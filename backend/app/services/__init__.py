from app.config import settings
from app.services.base import BaseAIProvider
from app.services.mock_provider import MockAIProvider
from app.services.openai_provider import OpenAIProvider

def get_ai_provider() -> BaseAIProvider:
    if settings.OPENAI_API_KEY and len(settings.OPENAI_API_KEY.strip()) > 10:
        return OpenAIProvider(api_key=settings.OPENAI_API_KEY)
    return MockAIProvider()
