from fastapi import APIRouter, Header, HTTPException, Depends
from typing import Optional, List
from pydantic import BaseModel
from app.config import settings
from app.models.schemas import AdminMetricsResponse

router = APIRouter(prefix="/admin", tags=["Owner Admin Console"])

def verify_admin_authorization(
    x_admin_key: Optional[str] = Header(None, alias="X-Admin-Key"),
    authorization: Optional[str] = Header(None)
):
    """
    Strict server-side verified authorization for owner-admin operations.
    Rejects requests unless verified against the server-configured admin secret or admin token.
    Frontend role switching cannot bypass this check.
    """
    valid = False
    if x_admin_key and x_admin_key == settings.ADMIN_SECRET_KEY:
        valid = True
    elif authorization and authorization.replace("Bearer ", "") == settings.ADMIN_SECRET_KEY:
        valid = True

    if not valid:
        raise HTTPException(
            status_code=403,
            detail="Forbidden: Admin access requires verified server-side credentials."
        )
    return True

class UserAccount(BaseModel):
    id: str
    email: str
    business_name: str
    plan: str # free, pro, agency
    status: str # active, suspended, past_due
    created_at: str
    monthly_generations: int
    generations_limit: int

class PlanConfig(BaseModel):
    id: str
    name: str
    monthly_price_usd: float
    generations_limit: int
    analyzer_runs_limit: int
    workspaces_allowed: int
    features: List[str]

# Seeded in-memory store for demo / development administrative inspection
DEMO_USERS: List[UserAccount] = [
    UserAccount(
        id="usr_01",
        email="elena@solocreator.io",
        business_name="Elena's Visual Storytelling",
        plan="pro",
        status="active",
        created_at="2026-09-12",
        monthly_generations=46,
        generations_limit=100
    ),
    UserAccount(
        id="usr_02",
        email="marcus@growthpilot.agency",
        business_name="GrowthPilot Agency",
        plan="agency",
        status="active",
        created_at="2026-08-01",
        monthly_generations=285,
        generations_limit=500
    ),
    UserAccount(
        id="usr_03",
        email="sarah@roastandco.com",
        business_name="Roast & Co. Artisanal Coffee",
        plan="free",
        status="active",
        created_at="2026-10-02",
        monthly_generations=8,
        generations_limit=15
    ),
    UserAccount(
        id="usr_04",
        email="alex@flowdesign.dev",
        business_name="FlowDesign Studio",
        plan="pro",
        status="active",
        created_at="2026-09-28",
        monthly_generations=72,
        generations_limit=100
    ),
    UserAccount(
        id="usr_05",
        email="billing-issue@sample.org",
        business_name="Sample Retail Co",
        plan="pro",
        status="past_due",
        created_at="2026-07-15",
        monthly_generations=12,
        generations_limit=100
    )
]

PLANS: List[PlanConfig] = [
    PlanConfig(
        id="free",
        name="Free Starter",
        monthly_price_usd=0.0,
        generations_limit=15,
        analyzer_runs_limit=10,
        workspaces_allowed=1,
        features=["Basic AI generation", "Content Library", "Manual calendar entry"]
    ),
    PlanConfig(
        id="pro",
        name="Pro Creator",
        monthly_price_usd=29.0,
        generations_limit=150,
        analyzer_runs_limit=100,
        workspaces_allowed=3,
        features=["Full Content Potential Analyzer", "Brand Hub presets", "Visual Studio layouts", "Weekly content batches", "Campaign tracking"]
    ),
    PlanConfig(
        id="agency",
        name="Agency / Multi-Brand",
        monthly_price_usd=89.0,
        generations_limit=750,
        analyzer_runs_limit=500,
        workspaces_allowed=15,
        features=["Unlimited Brand Hubs", "Team collaboration", "Priority AI throughput", "Executive PDF reports", "Dedicated support"]
    )
]

@router.get("/metrics", response_model=AdminMetricsResponse, dependencies=[Depends(verify_admin_authorization)])
async def get_admin_metrics():
    total_users = len(DEMO_USERS) + 38 # realistic baseline
    active_subs = 32
    mrr = (24 * 29.0) + (8 * 89.0) # $1,408
    return AdminMetricsResponse(
        total_users=total_users,
        active_subscriptions=active_subs,
        mrr_usd=mrr,
        free_users=11,
        pro_users=24,
        agency_users=8,
        ai_generations_month=1420,
        estimated_ai_cost_usd=8.52,
        system_status="All services operational",
        storage_used_mb=342.8,
        active_workspaces=48
    )

@router.get("/users", response_model=List[UserAccount], dependencies=[Depends(verify_admin_authorization)])
async def get_users():
    return DEMO_USERS

@router.get("/plans", response_model=List[PlanConfig], dependencies=[Depends(verify_admin_authorization)])
async def get_plans():
    return PLANS

@router.post("/users/{user_id}/toggle-status", dependencies=[Depends(verify_admin_authorization)])
async def toggle_user_status(user_id: str):
    for u in DEMO_USERS:
        if u.id == user_id:
            u.status = "suspended" if u.status == "active" else "active"
            return {"success": True, "user_id": user_id, "new_status": u.status}
    raise HTTPException(status_code=404, detail="User not found")
