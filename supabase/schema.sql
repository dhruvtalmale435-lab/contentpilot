-- ContentPilot AI — Supabase PostgreSQL Schema & Row Level Security
-- Generated: October 15, 2026

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'agency_owner')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Workspaces (Businesses) Table
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    plan_tier TEXT NOT NULL DEFAULT 'free' CHECK (plan_tier IN ('free', 'pro', 'agency')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Workspace Members Table
CREATE TABLE IF NOT EXISTS public.workspace_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (workspace_id, user_id)
);

-- 4. Brand Hub Profile
CREATE TABLE IF NOT EXISTS public.brand_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL UNIQUE REFERENCES public.workspaces(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_description TEXT,
    industry TEXT DEFAULT 'General',
    tone_of_voice TEXT DEFAULT 'Conversational, authentic, authoritative',
    target_audiences JSONB DEFAULT '[]'::jsonb,
    content_pillars JSONB DEFAULT '[]'::jsonb,
    brand_colors JSONB DEFAULT '["#202D46", "#3457F1", "#F6F5F1", "#D9F078"]'::jsonb,
    prohibited_claims JSONB DEFAULT '[]'::jsonb,
    logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Products and Services Catalog
CREATE TABLE IF NOT EXISTS public.brand_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price_cents INTEGER DEFAULT 0,
    offer_details TEXT,
    key_benefits JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Campaigns Table
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    objective TEXT NOT NULL,
    target_audience TEXT,
    start_date DATE,
    end_date DATE,
    content_pillars JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'paused')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Content Items & Versions Table
CREATE TABLE IF NOT EXISTS public.content_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('instagram', 'linkedin', 'twitter', 'tiktok', 'youtube', 'facebook', 'pinterest')),
    format_type TEXT NOT NULL CHECK (format_type IN ('feed_post', 'reel_script', 'carousel', 'story', 'hook_list', 'batch')),
    hook TEXT,
    body_caption TEXT NOT NULL,
    hashtags JSONB DEFAULT '[]'::jsonb,
    call_to_action TEXT,
    visual_concept TEXT,
    script_scenes JSONB DEFAULT '[]'::jsonb,
    carousel_slides JSONB DEFAULT '[]'::jsonb,
    readiness_score INTEGER CHECK (readiness_score >= 0 AND readiness_score <= 100),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('idea', 'draft', 'in_review', 'approved', 'scheduled', 'published', 'archived', 'failed')),
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Content Calendar Entries Table
CREATE TABLE IF NOT EXISTS public.content_calendar_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    content_item_id UUID NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'scheduled',
    reminder_sent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Content Performance Metrics (Manual / Imported)
CREATE TABLE IF NOT EXISTS public.content_performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_item_id UUID NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    impressions INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    leads INTEGER DEFAULT 0,
    data_source TEXT NOT NULL DEFAULT 'manual_entry' CHECK (data_source IN ('manual_entry', 'api_sync', 'demo_seed')),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Research & Competitors Table
CREATE TABLE IF NOT EXISTS public.competitor_research (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    competitor_name TEXT NOT NULL,
    platform TEXT NOT NULL,
    handle TEXT,
    notes TEXT,
    observed_strengths TEXT,
    observed_gaps TEXT,
    source_url TEXT,
    last_checked_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Saved Trends Table
CREATE TABLE IF NOT EXISTS public.saved_trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    platform TEXT,
    keyword TEXT,
    notes TEXT,
    source_link TEXT,
    adapted_idea TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Subscriptions & Usage Records
CREATE TABLE IF NOT EXISTS public.usage_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    billing_period_month DATE NOT NULL,
    generations_used INTEGER NOT NULL DEFAULT 0,
    analyzer_runs_used INTEGER NOT NULL DEFAULT 0,
    estimated_cost_usd NUMERIC(10, 4) DEFAULT 0.0000,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (workspace_id, billing_period_month)
);

-- 13. Audit Events Table
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    details JSONB DEFAULT '{{}}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- Helper function: Is member of workspace
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = ws_id AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read/write own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Workspaces: Members can view, Owner can update
CREATE POLICY "Members can view workspace"
    ON public.workspaces FOR SELECT
    USING (public.is_workspace_member(id) OR owner_id = auth.uid());

CREATE POLICY "Owners can update workspace"
    ON public.workspaces FOR UPDATE
    USING (owner_id = auth.uid());

-- Brand Hub: Workspace members can view & edit
CREATE POLICY "Members can view brand profile"
    ON public.brand_profiles FOR SELECT
    USING (public.is_workspace_member(workspace_id));

CREATE POLICY "Members can update brand profile"
    ON public.brand_profiles FOR ALL
    USING (public.is_workspace_member(workspace_id));

-- Content Items: Workspace isolation
CREATE POLICY "Members can view content items"
    ON public.content_items FOR SELECT
    USING (public.is_workspace_member(workspace_id));

CREATE POLICY "Members can mutate content items"
    ON public.content_items FOR ALL
    USING (public.is_workspace_member(workspace_id));

-- Calendar: Workspace isolation
CREATE POLICY "Members can manage calendar entries"
    ON public.content_calendar_entries FOR ALL
    USING (public.is_workspace_member(workspace_id));

-- Performance Metrics: Workspace isolation
CREATE POLICY "Members can manage performance metrics"
    ON public.content_performance_metrics FOR ALL
    USING (public.is_workspace_member(workspace_id));

-- Research & Trends: Workspace isolation
CREATE POLICY "Members can manage research"
    ON public.competitor_research FOR ALL
    USING (public.is_workspace_member(workspace_id));

CREATE POLICY "Members can manage trends"
    ON public.saved_trends FOR ALL
    USING (public.is_workspace_member(workspace_id));
