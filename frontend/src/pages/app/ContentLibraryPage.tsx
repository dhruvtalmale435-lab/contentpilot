import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderOpen,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List as ListIcon,
  Zap,
  Calendar,
  MoreVertical,
  Copy,
  Trash2,
  Archive,
  Edit,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { storage } from '../../services/storage';
import { ContentItem, Platform, ContentStatus, ContentFormat } from '../../types';
import { ScoreGauge } from '../../components/ui/ScoreGauge';

export const ContentLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ContentItem[]>(() => storage.getContentItems());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bodyCaption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesFormat = formatFilter === 'all' || item.formatType === formatFilter;
    return matchesSearch && matchesPlatform && matchesStatus && matchesFormat;
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this content item?')) {
      storage.deleteContentItem(id);
      setItems(storage.getContentItems());
    }
  };

  const handleDuplicate = (item: ContentItem) => {
    storage.saveContentItem({
      title: `${item.title} (Copy)`,
      platform: item.platform,
      formatType: item.formatType,
      hook: item.hook,
      bodyCaption: item.bodyCaption,
      hashtags: item.hashtags,
      callToAction: item.callToAction,
      visualConcept: item.visualConcept,
      scriptScenes: item.scriptScenes,
      carouselSlides: item.carouselSlides,
      status: 'draft'
    });
    setItems(storage.getContentItems());
  };

  const handleArchive = (item: ContentItem) => {
    storage.saveContentItem({
      ...item,
      status: 'archived'
    });
    setItems(storage.getContentItems());
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-subtle text-teal-success border border-teal-200 uppercase">Published</span>;
      case 'scheduled':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cobalt-light text-cobalt border border-cobalt/20 uppercase">Scheduled</span>;
      case 'approved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy border border-ink-navy/15 uppercase">Approved</span>;
      case 'in_review':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-subtle text-amber-warning border border-amber-200 uppercase">In Review</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-hover text-ink-muted uppercase">Archived</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-warm text-ink-muted border border-stone-border uppercase">Draft</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Asset Governance & Organization
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Content Library</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Manage your content across lifecycle stages: Idea, Draft, In Review, Approved, Scheduled, and Published.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/app/studio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-cobalt-glow transition-all"
          >
            <Plus className="w-4 h-4" /> Create New Asset
          </Link>
        </motion.div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-panel border border-stone-border shadow-soft flex flex-wrap items-center justify-between gap-3 card-tactile">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, hook, or caption..."
            className="w-full pl-9 pr-3 py-1.5 border border-stone-border rounded-lg text-xs font-medium focus:outline-cobalt"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-border rounded-lg text-xs bg-white text-ink-navy font-medium shadow-2xs"
          >
            <option value="all">All Networks</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">X (Twitter)</option>
            <option value="youtube">YouTube</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-border rounded-lg text-xs bg-white text-ink-navy font-medium shadow-2xs"
          >
            <option value="all">All Statuses</option>
            <option value="idea">Idea</option>
            <option value="draft">Draft</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-border rounded-lg text-xs bg-white text-ink-navy font-medium shadow-2xs"
          >
            <option value="all">All Formats</option>
            <option value="feed_post">Feed Post</option>
            <option value="carousel">Carousel</option>
            <option value="reel_script">Reel Script</option>
            <option value="story">Story</option>
          </select>

          {/* View toggle */}
          <div className="flex border border-stone-border rounded-lg overflow-hidden ml-1 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-ink-navy text-white' : 'bg-white text-ink-muted hover:text-ink-navy'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-ink-navy text-white' : 'bg-white text-ink-muted hover:text-ink-navy'}`}
              aria-label="List view"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Display */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-stone-border rounded-panel p-12 text-center text-xs text-ink-muted card-tactile">
          No content matches your filters. Adjust your search or create a new post in AI Studio.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="bg-white border border-stone-border rounded-panel p-5 shadow-soft hover:shadow-card-hover hover:border-cobalt transition-all flex flex-col justify-between space-y-4 card-tactile"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-warm border border-stone-border text-ink-navy">
                      {item.platform}
                    </span>
                    <span className="text-[10px] text-ink-faint uppercase font-medium">
                      {item.formatType.replace('_', ' ')}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <h3 className="font-bold text-sm text-ink-navy leading-snug line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed bg-surface-warm/60 p-2.5 rounded-lg border border-stone-border">
                  {item.hook || item.bodyCaption}
                </p>

                {item.hashtags && item.hashtags.length > 0 && (
                  <p className="text-[11px] text-cobalt font-medium truncate">
                    {item.hashtags.join(' ')}
                  </p>
                )}
              </div>

              {/* Bottom bar */}
              <div className="pt-3 border-t border-stone-divider flex items-center justify-between text-xs">
                {item.readinessScore ? (
                  <ScoreGauge score={item.readinessScore} size="sm" showLabel={true} />
                ) : (
                  <Link
                    to={`/app/analyzer?item=${item.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-warning hover:underline"
                  >
                    <Zap className="w-3 h-3" /> Audit Score
                  </Link>
                )}

                <div className="flex items-center gap-1 text-ink-faint">
                  <Link
                    to={`/app/analyzer?item=${item.id}`}
                    className="p-1.5 hover:text-cobalt hover:bg-stone-hover rounded transition-colors"
                    title="Score in Analyzer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDuplicate(item)}
                    className="p-1.5 hover:text-ink-navy hover:bg-stone-hover rounded transition-colors cursor-pointer"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleArchive(item)}
                    className="p-1.5 hover:text-amber-warning hover:bg-stone-hover rounded transition-colors cursor-pointer"
                    title="Archive"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 hover:text-red-error hover:bg-stone-hover rounded transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List Mode Table */
        <div className="bg-white border border-stone-border rounded-panel shadow-soft overflow-hidden card-tactile">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-stone-border text-ink-faint uppercase font-mono text-[10px]">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Readiness</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-divider">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-surface-warm transition-colors">
                  <td className="px-4 py-3 font-semibold text-ink-navy max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 uppercase text-[10px] font-bold text-ink-muted">
                    {item.platform}
                  </td>
                  <td className="px-4 py-3 capitalize text-ink-faint">
                    {item.formatType.replace('_', ' ')}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-4 py-3">
                    {item.readinessScore ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-subtle text-teal-success border border-teal-200">
                        {item.readinessScore}/100
                      </span>
                    ) : (
                      <span className="text-[10px] text-ink-faint">Unscored</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      to={`/app/analyzer?item=${item.id}`}
                      className="font-bold text-cobalt hover:underline"
                    >
                      Audit
                    </Link>
                    <button
                      onClick={() => handleDuplicate(item)}
                      className="text-ink-muted hover:text-ink-navy cursor-pointer"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-error hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
