from abc import ABC, abstractmethod
from app.models.schemas import (
    ContentGenerationRequest,
    ContentGenerationResponse,
    AnalyzerRequest,
    AnalyzerResponse,
    RewriteRequest,
    RewriteResponse,
    RecommendationRequest,
    RecommendationResponse,
)

class BaseAIProvider(ABC):
    @abstractmethod
    async def generate_content(self, request: ContentGenerationRequest) -> ContentGenerationResponse:
        pass

    @abstractmethod
    async def analyze_content(self, request: AnalyzerRequest) -> AnalyzerResponse:
        pass

    @abstractmethod
    async def rewrite_content(self, request: RewriteRequest) -> RewriteResponse:
        pass

    @abstractmethod
    async def get_recommendations(self, request: RecommendationRequest) -> RecommendationResponse:
        pass
