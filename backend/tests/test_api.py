import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.config import settings

@pytest.mark.asyncio
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data
        assert "ai_provider" in data

@pytest.mark.asyncio
async def test_content_generation():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "platform": "instagram",
            "format_type": "feed_post",
            "topic_or_goal": "Launching our organic artisan coffee line",
            "objective": "sales",
            "tone": "warm and artisanal",
            "brand_context": {
                "business_name": "Roast & Co",
                "business_description": "Artisan coffee roaster based in Portland",
                "tone_of_voice": "Warm, artisanal, authentic",
                "content_pillars": ["Bean origins", "Brewing guides", "Community"],
                "prohibited_claims": ["100% cure for fatigue"]
            }
        }
        response = await client.post("/generation/create", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert len(data["items"]) >= 1
        assert "hook" in data["items"][0]
        assert "body_caption" in data["items"][0]
        assert len(data["items"][0]["hashtags"]) > 0

@pytest.mark.asyncio
async def test_content_analyzer():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "content_type": "caption",
            "platform": "instagram",
            "text_content": (
                "Stop buying stale coffee from grocery store shelves.\n\n"
                "Here is why: roasted beans lose 60% of their aromatic compounds within 14 days.\n"
                "At Roast & Co, every bag is stamped with the exact roast date and shipped within 24 hours.\n\n"
                "Save this post to test your beans at home!"
            ),
            "target_audience": "Coffee enthusiasts"
        }
        response = await client.post("/analyzer/score", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert 0 <= data["content_readiness_score"] <= 100
        assert len(data["dimension_scores"]) == 10
        assert len(data["strengths"]) > 0
        assert len(data["before_after_examples"]) > 0
        assert "improved_draft" in data

@pytest.mark.asyncio
async def test_admin_authorization():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Without admin key -> 403 Forbidden
        unauth_response = await client.get("/admin/metrics")
        assert unauth_response.status_code == 403

        # With valid admin key -> 200 OK
        headers = {"X-Admin-Key": settings.ADMIN_SECRET_KEY}
        auth_response = await client.get("/admin/metrics", headers=headers)
        assert auth_response.status_code == 200
        data = auth_response.json()
        assert "mrr_usd" in data
        assert "active_subscriptions" in data
