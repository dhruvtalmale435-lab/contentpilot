import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  PlusCircle,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  Repeat
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../services/storage';
import { ScoreGauge } from '../../components/ui/ScoreGauge';

export const DashboardPage: React.FC = () => {
  const { user, workspace } = useAuth();
  const items = storage.getContentItems();
  const calendarEntries = storage.getCalendarEntries();
  const metrics = storage.getPerformanceMetrics();
  const brandProfile = storage.getBrandProfile();

  // Counts
  const draftCount = items.filter(i => i.status === 'draft' || i.status === 'idea').length;
  const plannedCount = items.filter(i => i.status === 'scheduled' || i.status === 'approved').length;
  const publishedCount = items.filter(i => i.status === 'published').length;

  // Aggregate metrics
  const totalImpressions = metrics.reduce((acc, m) => acc + m.impressions, 0);
  const totalSaves = metrics.reduce((acc, m) => acc + m.saves, 0);
  const totalEngagement = metrics.reduce((acc, m) => acc + (m.likes + m.comments + m.shares + m.saves), 0);
  const avgEngagementRate = totalImpressions > 0 ? ((totalEngagement / totalImpressions) * 100).toFixed(1) : '4.6';

  // Upcoming scheduled posts
  const upcomingPosts = items.filter(i => i.status === 'scheduled').slice(0, 3);

  // Recent creations
  const recentItems = items.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Workspace Overview • {workspace.name}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">
            Good morning, {user?.fullName?.split(' ')[0] || 'Elena'}.
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Your brand is anchored to {brandProfile.contentPillars.length} active pillars with {plannedCount} posts ready in the queue.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/app/analyzer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy font-bold text-xs shadow-sm transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-ink-navy" /> Score New Post
          </Link>
          <Link
            to="/app/studio"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-soft transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Studio
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Drafts */}
        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Ideas & Drafts</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-ink-navy">{draftCount}</span>
            <span className="text-xs text-ink-faint">In progress</span>
          </div>
        </div>

        {/* Planned / Scheduled */}
        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <span className="text-[11px] font-bold text-cobalt uppercase tracking-wider">Planned & Queued</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-cobalt">{plannedCount}</span>
            <span className="text-xs text-ink-muted">Ready to publish</span>
          </div>
        </div>

        {/* Published */}
        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <span className="text-[11px] font-bold text-teal-success uppercase tracking-wider">Published</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-teal-success">{publishedCount}</span>
            <span className="text-xs text-ink-muted">Recorded live</span>
          </div>
        </div>

        {/* Avg Engagement Rate */}
        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-ink-navy uppercase tracking-wider">Avg Engagement</span>
            <span className="text-[9px] font-bold bg-teal-50 text-teal-success px-1.5 py-0.2 rounded">+0.8%</span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-ink-navy">{avgEngagementRate}%</span>
            <span className="text-[11px] text-ink-faint">(Likes+Comments+Saves)/Views</span>
          </div>
        </div>
      </div>

      {/* Next Step Recommendation Box */}
      <div className="bg-gradient-to-r from-surface to-surface-subtle border-2 border-stone-border rounded-panel p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cobalt text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase">
                Recommended Action
              </span>
              <span className="text-xs font-bold text-ink-navy">High Save Opportunity</span>
            </div>
            <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
              Your recent carousel post generated a <strong>92 Readiness Rating</strong>. Convert your upcoming brew guide into a 5-slide carousel to capture high bookmark intent this weekend.
            </p>
          </div>
        </div>

        <Link
          to="/app/studio"
          className="px-4 py-2 rounded-lg bg-ink-navy hover:bg-cobalt text-white text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm"
        >
          Generate Carousel Outline <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Split Columns: Upcoming Queue & Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Upcoming Scheduled Posts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-ink-navy flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cobalt" /> Upcoming Publishing Schedule
            </h3>
            <Link to="/app/calendar" className="text-xs font-bold text-cobalt hover:underline">
              View Full Calendar →
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingPosts.length === 0 ? (
              <div className="bg-white border border-stone-border rounded-panel p-8 text-center text-xs text-ink-muted">
                No scheduled posts found. Use AI Studio or Content Library to assign dates.
              </div>
            ) : (
              upcomingPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-stone-border rounded-panel p-4 shadow-soft hover:border-cobalt transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-hover text-ink-navy">
                        {post.platform}
                      </span>
                      <span className="text-[10px] text-ink-faint uppercase font-medium">
                        {post.formatType.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {post.readinessScore && (
                        <ScoreGauge score={post.readinessScore} size="sm" showLabel={false} />
                      )}
                      <span className="text-[11px] font-mono text-cobalt font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.scheduledFor ? new Date(post.scheduledFor).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Scheduled'}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-ink-navy">{post.title}</h4>
                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {post.hook || post.bodyCaption}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-divider">
                    <span className="text-[11px] text-ink-faint">
                      Status: <span className="font-semibold text-teal-success uppercase text-[10px]">Scheduled (Pending Publish)</span>
                    </span>
                    <Link
                      to={`/app/analyzer?item=${post.id}`}
                      className="text-xs font-bold text-cobalt hover:underline"
                    >
                      Audit Score →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Recent Creative Activity & Brand Snapshot */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand Hub Quick View */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint font-bold">
                Brand Hub Memory
              </span>
              <Link to="/app/brand-hub" className="text-xs font-bold text-cobalt hover:underline">
                Edit Guidelines
              </Link>
            </div>

            <h4 className="font-bold text-sm text-ink-navy">{brandProfile.businessName}</h4>
            <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
              {brandProfile.businessDescription}
            </p>

            <div className="pt-2 border-t border-stone-divider">
              <span className="text-[10px] font-mono text-ink-faint uppercase font-bold block mb-1.5">
                Active Content Pillars
              </span>
              <div className="flex flex-wrap gap-1.5">
                {brandProfile.contentPillars.slice(0, 3).map((pillar, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-background border border-stone-border text-ink-navy"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Creations Library Snippet */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy">Recent Creations</h4>
              <Link to="/app/library" className="text-xs font-bold text-cobalt hover:underline">
                View All ({items.length})
              </Link>
            </div>

            <div className="divide-y divide-stone-divider">
              {recentItems.map((it) => (
                <div key={it.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-ink-navy truncate">{it.title}</p>
                    <p className="text-[10px] text-ink-faint capitalize">{it.platform} • {it.status}</p>
                  </div>
                  {it.readinessScore ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-success border border-teal-200">
                      {it.readinessScore}
                    </span>
                  ) : (
                    <span className="text-[10px] text-ink-faint">Unscored</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
