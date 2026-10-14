// ContentPilot AI — Comprehensive Type System

export type Platform = 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'facebook' | 'pinterest';

export type ContentFormat = 'feed_post' | 'reel_script' | 'carousel' | 'story' | 'hook_list' | 'batch';

export type ContentStatus = 'idea' | 'draft' | 'in_review' | 'approved' | 'scheduled' | 'published' | 'archived' | 'failed';

export type UserRole = 'customer' | 'admin' | 'agency_owner';

export type PlanTier = 'free' | 'pro' | 'agency';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  currentWorkspaceId: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  planTier: PlanTier;
  createdAt: string;
}

export interface BrandProduct {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  priceCents: number;
  offerDetails?: string;
  keyBenefits: string[];
}

export interface BrandProfile {
  id: string;
  workspaceId: string;
  businessName: string;
  businessDescription: string;
  industry: string;
  toneOfVoice: string;
  targetAudiences: string[];
  contentPillars: string[];
  brandColors: string[];
  prohibitedClaims: string[];
  logoUrl?: string;
  websiteUrl?: string;
}

export interface ScriptScene {
  scene: string;
  visual: string;
  audio: string;
}

export interface CarouselSlide {
  slide: string;
  headline: string;
  subtext: string;
}

export interface ContentItem {
  id: string;
  workspaceId: string;
  campaignId?: string;
  title: string;
  platform: Platform;
  formatType: ContentFormat;
  hook?: string;
  bodyCaption: string;
  hashtags: string[];
  callToAction?: string;
  visualConcept?: string;
  scriptScenes?: ScriptScene[];
  carouselSlides?: CarouselSlide[];
  readinessScore?: number;
  status: ContentStatus;
  scheduledFor?: string; // ISO date
  publishedAt?: string; // ISO date
  createdAt: string;
  updatedAt: string;
}

export interface DimensionScore {
  name: string;
  key: string;
  score: number; // 0 to 100
  rating: string;
  feedback: string;
}

export interface BeforeAfterExample {
  aspect: string;
  before: string;
  after: string;
  whyItWorks: string;
}

export interface AnalyzerResult {
  contentReadinessScore: number;
  statusLabel: string;
  dimensionScores: DimensionScore[];
  strengths: string[];
  weaknesses: string[];
  suggestedRevisions: string[];
  beforeAfterExamples: BeforeAfterExample[];
  improvedDraft: string;
  assessmentExplanation: string;
  methodologyNote: string;
  provider: string;
  isMock: boolean;
}

export interface CalendarEntry {
  id: string;
  workspaceId: string;
  contentItemId: string;
  startTime: string; // ISO string
  endTime?: string;
  status: string;
  reminderSent: boolean;
  contentItem?: ContentItem;
}

export interface Campaign {
  id: string;
  workspaceId: string;
  name: string;
  objective: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  contentPillars: string[];
  status: 'planning' | 'active' | 'completed' | 'paused';
  attachedPostIds?: string[];
}

export interface PerformanceMetric {
  id: string;
  contentItemId: string;
  workspaceId: string;
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  leads: number;
  dataSource: 'manual_entry' | 'api_sync' | 'demo_seed';
  recordedAt: string;
}

export interface CompetitorItem {
  id: string;
  workspaceId: string;
  name: string;
  platform: Platform;
  handle: string;
  notes: string;
  observedStrengths: string;
  observedGaps: string;
  sourceUrl?: string;
  lastCheckedDate: string;
}

export interface TrendItem {
  id: string;
  workspaceId: string;
  topic: string;
  platform: Platform;
  keyword: string;
  notes: string;
  sourceLink?: string;
  adaptedIdea: string;
}

export interface PlanConfig {
  id: PlanTier;
  name: string;
  monthlyPriceUsd: number;
  generationsLimit: number;
  analyzerRunsLimit: number;
  workspacesAllowed: number;
  features: string[];
  recommended?: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  workspaceId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  read: boolean;
  createdAt: string;
}

export interface SocialAccountConnection {
  platform: Platform;
  name: string;
  handle: string;
  connected: boolean;
  isSimulated: boolean;
  lastSynced?: string;
  avatarUrl?: string;
}
