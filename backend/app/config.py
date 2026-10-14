import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    APP_NAME: str = "ContentPilot AI API"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    ADMIN_SECRET_KEY: str = os.getenv("ADMIN_SECRET_KEY", "contentpilot-admin-dev-secret-key-2026")
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://contentpilotai.vercel.app"
    ]

settings = Settings()
