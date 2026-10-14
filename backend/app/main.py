from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import health, generation, analyzer, recommendations, admin

app = FastAPI(
    title="ContentPilot AI — Core API Engine",
    description=(
        "Production AI content creation, multi-dimensional optimization, "
        "planning, and business analytics platform."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # allow all during dev for local frontend testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router)
app.include_router(generation.router)
app.include_router(analyzer.router)
app.include_router(recommendations.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {
        "name": "ContentPilot AI API",
        "status": "online",
        "documentation": "/docs",
        "health": "/health"
    }
