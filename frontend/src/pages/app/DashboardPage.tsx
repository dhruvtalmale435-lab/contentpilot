import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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
  Repeat,
  Layers,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
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

  // Mini Chart Data
  const formatData = [
    { name: 'Carousels', saves: 420, rate: 8.4 },
    { name: 'Reels', saves: 840, rate: 9.2 },
    { name: 'Feed', saves: 160, rate: 4.8 },
    { name: 'Stories', saves: 45, rate: 3.1 },
  ];

  return (
    <div className="space-y-8">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
              Workspace Overview • {workspace.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-success animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">
            Good morning, {user?.fullName?.split(' ')[0] || 'Elena'}.
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Your brand is anchored to {brandProfile.contentPillars.length} active pillars with {plannedCount} posts ready in the queue.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/app/analyzer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy font-bold text-xs shadow-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-ink-navy" /> Score New Post
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/app/studio"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-soft transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Studio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* KPI Stats Row with Spring Hover and Color Accents */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Drafts */}
        <motion.div
          whileHover={{ y: -3, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
          className="bg-white p-5 rounded-panel border border-stone-border shadow-soft card-tactile relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-warning/70" />
          <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">Ideas & Drafts</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-ink-navy">{draftCount}</span>
            <span className="text-xs font-medium text-amber-warning bg-amber-subtle px-1.5 py-0.5 rounded border border-amber-200">
              In progress
            </span>
          </div>
        </motion.div>

        {/* Planned / Scheduled */}
        <motion.div
          whileHover={{ y: -3, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
          className="bg-white p-5 rounded-panel border border-stone-border shadow-soft card-tactile relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-cobalt" />
          <span className="text-[11px] font-bold text-cobalt uppercase tracking-wider block">Planned & Queued</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-cobalt">{plannedCount}</span>
            <span className="text-xs font-medium text-cobalt bg-cobalt-light px-1.5 py-0.5 rounded border border-cobalt/20">
              Ready to publish
            </span>
          </div>
        </motion.div>

        {/* Published */}
        <motion.div
          whileHover={{ y: -3, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
          className="bg-white p-5 rounded-panel border border-stone-border shadow-soft card-tactile relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-success" />
          <span className="text-[11px] font-bold text-teal-success uppercase tracking-wider block">Published</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-success">{publishedCount}</span>
            <span className="text-xs font-medium text-teal-success bg-teal-subtle px-1.5 py-0.5 rounded border border-teal-200">
              Recorded live
            </span>
          </div>
        </motion.div>

        {/* Avg Engagement Rate */}
        <motion.div
          whileHover={{ y: -3, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
          className="bg-white p-5 rounded-panel border border-stone-border shadow-soft card-tactile relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-ink-navy" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-ink-navy uppercase tracking-wider">Avg Engagement</span>
            <span className="text-[9px] font-bold bg-teal-subtle text-teal-success px-1.5 py-0.2 rounded border border-teal-200">+0.8%</span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-ink-navy">{avgEngagementRate}%</span>
            <span className="text-[10px] text-ink-faint">(Interactions)/Reach</span>
          </div>
        </motion.div>
      </div>

      {/* Next Step Recommendation Box with Tactile Depth */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        className="bg-gradient-to-r from-surface to-surface-warm border-2 border-stone-border rounded-panel p-5 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-tactile"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cobalt text-white flex items-center justify-center flex-shrink-0 shadow-cobalt-glow">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase shadow-2xs">
                Recommended Action
              </span>
              <span className="text-xs font-bold text-ink-navy">High Bookmark Opportunity</span>
            </div>
            <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
              Your recent carousel post generated a <strong>92 Readiness Rating</strong>. Convert your upcoming brew guide into a 5-slide carousel to capture high bookmark intent this weekend.
            </p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/app/studio"
            className="px-4 py-2 rounded-lg bg-ink-navy hover:bg-cobalt text-white text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm"
          >
            Generate Carousel Outline <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Split Columns: Upcoming Queue & Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Upcoming Scheduled Posts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-ink-navy flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cobalt" /> Upcoming Publishing Schedule
            </h3>
            <Link to="/app/calendar" className="text-xs font-bold text-cobalt hover:underline flex items-center gap-1">
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingPosts.length === 0 ? (
              <div className="bg-white border border-stone-border rounded-panel p-8 text-center text-xs text-ink-muted card-tactile">
                No scheduled posts found. Use AI Studio or Content Library to assign dates.
              </div>
            ) : (
              upcomingPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -2, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                  className="bg-white border border-stone-border rounded-panel p-4 shadow-soft hover:border-cobalt transition-colors space-y-3 card-tactile"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-tinted text-ink-navy border border-stone-border">
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
                      <span className="text-[11px] font-mono text-cobalt font-semibold flex items-center gap-1 bg-cobalt-light/60 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        {post.scheduledFor ? new Date(post.scheduledFor).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Scheduled'}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-ink-navy">{post.title}</h4>
                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed bg-surface-subtle p-2 rounded-lg border border-stone-border">
                    {post.hook || post.bodyCaption}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-divider">
                    <span className="text-[11px] text-ink-faint flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-success animate-pulse" />
                      Status: <span className="font-semibold text-teal-success uppercase text-[10px]">Pending Auto-Publish</span>
                    </span>
                    <Link
                      to={`/app/analyzer?item=${post.id}`}
                      className="text-xs font-bold text-cobalt hover:underline flex items-center gap-1"
                    >
                      <span>Audit Score</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Brand Hub Quick View & Format Mini Chart */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand Hub Quick View */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3 card-tactile">
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
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-warm border border-stone-border text-ink-navy shadow-2xs"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mini Format Performance Chart */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3 card-tactile">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy">Bookmark Saves by Asset</h4>
                <p className="text-[10px] text-ink-faint">Carousels & Reels outperform static copy</p>
              </div>
              <Link to="/app/analytics" className="text-xs font-bold text-cobalt hover:underline flex items-center gap-0.5">
                <span>Metrics</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="h-40 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEA" vertical={false} />
                  <XAxis dataKey="name" stroke="#8E9BAE" fontSize={10} tickLine={false} />
                  <YAxis stroke="#8E9BAE" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E7E1', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="saves" name="Saves" fill="#3457F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Creations Library Snippet */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3 card-tactile">
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-subtle text-teal-success border border-teal-200">
                      {it.readinessScore}/100
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
