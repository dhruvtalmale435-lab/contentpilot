# ContentPilot AI — Backend API Reference

**Base URL:** `http://localhost:8000` (Local) / Configured Render Server  
**OpenAPI Specification:** Available interactively at `http://localhost:8000/docs`

---

## 1. Health & Status

### `GET /health`
Returns the operational health of the backend, the active AI provider, and database connection state.

**Response `200 OK`:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "development",
  "ai_provider": "Mock Local Engine",
  "supabase_configured": false
}
```

---

## 2. Content Generation & Rewriting

### `POST /generation/create`
Generates structured social media content pieces grounded in brand context.

**Request Body:**
```json
{
  "platform": "instagram",
  "format_type": "feed_post",
  "topic_or_goal": "Why grocery store coffee stales in 14 days",
  "objective": "education",
  "tone": "Warm, educational, authentic",
  "target_audience": "Specialty coffee hobbyists",
  "product_name": "Ethiopia Guji Natural",
  "language": "English",
  "brand_context": {
    "business_name": "Roast & Co.",
    "business_description": "Direct-trade coffee roaster in Portland",
    "tone_of_voice": "Warm, authentic, craft-focused",
    "content_pillars": ["Bean Origins", "Brew Recipes"],
    "prohibited_claims": ["100% cure for fatigue"]
  }
}
```

**Response `200 OK`:**
```json
{
  "items": [
    {
      "id": "e0a6d71b-...",
      "platform": "instagram",
      "format_type": "feed_post",
      "title": "Actionable Guide: Why grocery store coffee stales in 14 days",
      "hook": "Stop buying coffee bags without a roast date stamped on the front.",
      "body_caption": "Roasted coffee beans peak between day 7 and day 21...\n\nSave this for your next shopping trip!",
      "hashtags": ["#SpecialtyCoffee", "#RoastAndCo"],
      "call_to_action": "Bookmark this 📌 for your next coffee run.",
      "visual_direction": "High contrast quote card on warm ivory background.",
      "estimated_read_time_seconds": 20
    }
  ],
  "provider": "ContentPilot Mock AI Provider (Deterministic Local Engine)",
  "is_mock": true,
  "tokens_used": 420,
  "estimated_cost_usd": 0.0
}
```

### `POST /generation/rewrite`
Transforms or polishes existing copy with specific instructions (e.g., make it punchier, add witty humor, sharpen opening hook).

**Request Body:**
```json
{
  "text_content": "We sell fresh beans every Tuesday. Come visit our website.",
  "instruction": "sharpen curiosity hook in line 1",
  "platform": "instagram"
}
```

---

## 3. Content Potential Analyzer

### `POST /analyzer/score`
Performs a pre-publishing packaging critique across 10 qualitative dimensions.

**Request Body:**
```json
{
  "content_type": "caption",
  "platform": "instagram",
  "text_content": "Stop buying stale coffee from grocery store shelves.\n\nHere is why: roasted beans lose 60% of their aromatic compounds within 14 days...\n\nSave this post to test your beans at home!",
  "visual_concept_description": "5-slide carousel on warm ivory paper",
  "target_audience": "Coffee lovers"
}
```

**Response `200 OK`:**
```json
{
  "content_readiness_score": 88,
  "status_label": "Ready to Publish",
  "dimension_scores": [
    {
      "name": "Hook Strength",
      "key": "hook_strength",
      "score": 92,
      "rating": "Strong",
      "feedback": "First line directly challenges conventional wisdom and hooks immediate interest."
    },
    {
      "name": "Audience Relevance",
      "key": "audience_relevance",
      "score": 85,
      "rating": "High",
      "feedback": "Speaks clearly to the pain points of the intended viewer."
    }
  ],
  "strengths": [
    "High-impact opening line captures attention quickly.",
    "Explicit call-to-action reduces friction for reader response."
  ],
  "weaknesses": [
    "Could incorporate an even more specific data point or real-world example to boost credibility."
  ],
  "suggested_revisions": [
    "Cut any opening pleasantries and lead with the surprising insight in line 1.",
    "Pair with a high-contrast visual."
  ],
  "before_after_examples": [
    {
      "aspect": "Hook / Opening Line",
      "before": "Stop buying stale coffee from grocery store shelves...",
      "after": "Stop making this 1 critical mistake with coffee beans:",
      "why_it_works": "Creates an open curiosity loop and signals immediate problem resolution."
    }
  ],
  "improved_draft": "Stop scrolling if you want actual fresh coffee...\n\nBookmark this 📌 for your next creation session!",
  "assessment_explanation": "This piece scored 88/100 with excellent hook momentum.",
  "methodology_note": "Content Readiness Score is a heuristic and AI-assisted qualitative critique...",
  "provider": "ContentPilot Heuristic Evaluator",
  "is_mock": true
}
```

---

## 4. Owner Administration (Protected)

Privileged endpoints require verification via the `X-Admin-Key` header. Requests without valid credentials return `403 Forbidden`.

### `GET /admin/metrics`
**Header:** `X-Admin-Key: contentpilot-admin-dev-secret-key-2026`

**Response `200 OK`:**
```json
{
  "total_users": 48,
  "active_subscriptions": 34,
  "mrr_usd": 1408.0,
  "free_users": 14,
  "pro_users": 26,
  "agency_users": 8,
  "ai_generations_month": 1420,
  "estimated_ai_cost_usd": 8.52,
  "system_status": "All services operational",
  "storage_used_mb": 342.8,
  "active_workspaces": 48
}
```

### `GET /admin/users`
Returns the customer directory with subscription plan, monthly generation count, and account status controls.
