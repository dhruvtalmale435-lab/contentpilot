# ContentPilot AI

**An AI-Powered Social Media Creation, Packaging Optimization, Planning, and Analytics Platform.**

ContentPilot AI bridges the gap between traditional social media scheduling tools (Buffer, Hootsuite, Later) and creator packaging diagnostic engines (vidIQ, TubeBuddy). It unifies brand grounding, pre-publish readiness scoring, cross-platform calendar planning, and evidence-backed hypothesis insights into a single cohesive workspace.

---

## 🌟 Key Differentiators & Features

1. **Brand Hub:** Persistent single source of truth for your business identity, verified products, tone guidelines, content pillars, target personas, and strictly enforced prohibited claims.
2. **AI Content Studio:** Generate structured hooks, captions, reel/TikTok scripts with scene shot-lists, 5-slide carousels, and weekly batches with 1-click tone shifts and text expanders.
3. **Content Potential Analyzer:** Pre-publish packaging critique evaluating 10 separate dimensions (Hook Strength, Audience Relevance, Retention Structure, Readability, Emotional Resonance, Shareability, CTA Clarity, Brand Voice Consistency, Originality, and Visual Concept) with transparent heuristic explanations and 1-click adoption of improved drafts.
4. **Content Library:** Manage asset lifecycle states from Idea → Draft → In Review → Approved → Scheduled → Published → Archived.
5. **Content Calendar:** Month, week, and agenda views with slot scheduling and status preservation.
6. **Analytics & Insights:** Reach, engagement rate formulas, bookmark velocity, top format comparisons (via Recharts), manual metric entry, and hypothesis-driven experiment suggestions.
7. **Research & Trends:** Keyword monitoring, competitor profiles, blindspot analysis, and "Adapt for my brand" one-click workflows.
8. **Campaigns:** Thematic launches, goals, start/end timelines, and attached asset rosters.
9. **Visual Studio:** Editorial quote card previews, interactive carousel viewer, and Reel storyboard shot-lists.
10. **Owner Admin Console (`/admin`):** Server-side verified administrative console tracking total users, MRR ($1,408), AI token costs, customer account status controls, and dynamic plan limits.
11. **Offline Demo Resilience:** Runs locally out-of-the-box with pre-seeded artisan coffee brand data (*Roast & Co.*). No paid OpenAI or Supabase keys are required to test the entire application.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, TypeScript, Tailwind CSS, Lucide Icons, Motion for React, React Router v7, Recharts |
| **Backend** | Python 3.14, FastAPI, Pydantic v2, Official OpenAI Python SDK, Uvicorn |
| **Database & Auth**| Supabase PostgreSQL with Row Level Security (RLS), Supabase Auth, local persistent mock repository fallback |
| **Testing** | Vitest, React Testing Library, Pytest + httpx + pytest-asyncio |

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js** v20+ / v24+
- **Python** 3.11+ / 3.14+

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv .venv

# On Windows:
.\.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
pytest
uvicorn app.main:app --port 8000 --reload
```
The API is available at `http://127.0.0.1:8000` with Swagger documentation at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm test
npm run dev
```
Open `http://127.0.0.1:5173` in your browser.

---

## 🧪 Testing Suites

- **Backend Pytest:**
  ```bash
  cd backend
  .\.venv\Scripts\pytest
  ```
  *(4/4 tests passing: health check, generation, 10-dimension analyzer, admin header verification)*

- **Frontend Vitest:**
  ```bash
  cd frontend
  npm test
  ```
  *(4/4 tests passing: ScoreGauge, SocialPreviewCard, CarouselPreview, storage data integrity)*

- **Production Build:**
  ```bash
  cd frontend
  npm run build
  ```

---

## 📁 Repository Structure

```
Contentpilotai/
├── backend/
│   ├── app/
│   │   ├── models/schemas.py      # Pydantic request/response models
│   │   ├── routers/               # health, generation, analyzer, admin
│   │   ├── services/              # mock_provider, openai_provider, factory
│   │   ├── config.py              # Settings & environment variables
│   │   └── main.py                # FastAPI entrypoint & CORS middleware
│   ├── tests/test_api.py          # Pytest integration suite
│   ├── pytest.ini
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/            # Layouts, previews (Social, Carousel), ScoreGauge
│   │   ├── context/AuthContext    # Auth & Demo mode provider
│   │   ├── pages/                 # Landing, Auth, Dashboard, Studio, Analyzer, etc.
│   │   ├── services/              # storage.ts (CRUD), apiClient.ts, mockData.ts
│   │   ├── types/index.ts         # Shared TypeScript interfaces
│   │   ├── App.tsx                # React Router v7 routes
│   │   └── index.css              # Custom styling & font imports
│   ├── tailwind.config.js         # Warm ivory, ink navy, cobalt tokens
│   ├── vitest.config.ts
│   └── .env.example
├── supabase/
│   ├── schema.sql                 # PostgreSQL tables & RLS policies
│   └── seed.sql                   # Realistic initial brand seed
└── docs/
    ├── competitor-research.md     # Phase 0 market research
    ├── architecture.md            # System design & architecture
    ├── api.md                     # Backend API reference
    └── progress.md                # Progress tracker
```

---

## 🛡️ License & Transparency
Content Readiness Scores are heuristic and AI-assisted qualitative critiques evaluated against creator retention, hook mechanics, clarity, and platform standards. It is an editorial estimate and does not constitute a guaranteed predictive probability of virality.
