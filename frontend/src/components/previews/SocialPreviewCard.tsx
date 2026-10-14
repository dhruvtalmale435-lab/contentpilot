import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Platform } from '../../types';
import { Heart, MessageCircle, Share2, Bookmark, Repeat, ThumbsUp, MoreHorizontal } from 'lucide-react';

interface SocialPreviewCardProps {
  platform: Platform;
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;
  hook?: string;
  bodyCaption: string;
  hashtags?: string[];
  visualConcept?: string;
  formatType?: string;
  className?: string;
}

export const SocialPreviewCard: React.FC<SocialPreviewCardProps> = ({
  platform,
  authorName,
  authorHandle,
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  hook,
  bodyCaption,
  hashtags = [],
  visualConcept,
  className = ''
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Platform specific styling and layout
  if (platform === 'linkedin') {
    return (
      <div className={`bg-white border border-stone-border rounded-panel shadow-soft p-5 max-w-lg w-full card-tactile ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={avatarUrl} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-stone-border shadow-2xs" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-ink-navy">{authorName}</span>
                <span className="text-ink-faint text-[10px]">• 1st</span>
              </div>
              <p className="text-[11px] text-ink-muted leading-tight">{authorHandle}</p>
              <p className="text-[10px] text-ink-faint">1d • Edited • 🌐</p>
            </div>
          </div>
          <button className="text-ink-muted hover:text-ink-navy cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
        </div>

        {/* Content */}
        <div className="text-xs text-ink-navy space-y-2 mb-3 leading-relaxed whitespace-pre-wrap font-sans">
          {hook && <p className="font-bold text-ink-navy">{hook}</p>}
          <p>{bodyCaption}</p>
          {hashtags.length > 0 && (
            <p className="text-cobalt font-medium pt-1">{hashtags.join(' ')}</p>
          )}
        </div>

        {/* Visual Box Placeholder / Concept */}
        {visualConcept && (
          <div className="bg-surface-warm rounded-subtle p-3.5 mb-3 border border-stone-border flex items-center justify-center text-center">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-cobalt uppercase">Attached Visual Asset</span>
              <p className="text-xs text-ink-muted mt-1 italic max-w-xs">{visualConcept}</p>
            </div>
          </div>
        )}

        {/* Engagement stats */}
        <div className="flex items-center justify-between text-[11px] text-ink-faint py-2 border-b border-stone-divider">
          <span>👍 {liked ? 143 : 142} reactions</span>
          <span>28 comments • 14 reposts</span>
        </div>

        {/* Action Buttons with Interactive Spring */}
        <div className="flex items-center justify-around pt-2 text-ink-muted text-xs font-semibold">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded transition-colors cursor-pointer ${liked ? 'text-cobalt bg-cobalt-light/50 font-bold' : 'hover:text-cobalt hover:bg-surface-subtle'}`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-cobalt' : ''}`} /> Like
          </motion.button>
          <button className="flex items-center gap-1.5 hover:text-cobalt py-1 px-2.5 rounded hover:bg-surface-subtle transition-colors cursor-pointer">
            <MessageCircle className="w-3.5 h-3.5" /> Comment
          </button>
          <button className="flex items-center gap-1.5 hover:text-cobalt py-1 px-2.5 rounded hover:bg-surface-subtle transition-colors cursor-pointer">
            <Repeat className="w-3.5 h-3.5" /> Repost
          </button>
          <button className="flex items-center gap-1.5 hover:text-cobalt py-1 px-2.5 rounded hover:bg-surface-subtle transition-colors cursor-pointer">
            <Share2 className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>
    );
  }

  if (platform === 'twitter') {
    return (
      <div className={`bg-white border border-stone-border rounded-panel shadow-soft p-5 max-w-lg w-full card-tactile ${className}`}>
        <div className="flex gap-3">
          <img src={avatarUrl} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-stone-border flex-shrink-0 shadow-2xs" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-bold text-xs text-ink-navy truncate">{authorName}</span>
              <span className="text-ink-faint text-xs truncate">@{authorHandle.replace(/^@/, '')}</span>
              <span className="text-ink-faint text-xs">· 4h</span>
            </div>

            <div className="text-xs text-ink-navy space-y-1.5 leading-relaxed whitespace-pre-wrap mb-3">
              {hook && <p className="font-bold">{hook}</p>}
              <p>{bodyCaption}</p>
              {hashtags.length > 0 && <p className="text-cobalt font-medium">{hashtags.join(' ')}</p>}
            </div>

            {visualConcept && (
              <div className="bg-surface-warm rounded-subtle p-3 mb-3 border border-stone-border text-center">
                <span className="text-[10px] font-bold text-cobalt uppercase tracking-wider">Image / Video Preview</span>
                <p className="text-xs text-ink-muted mt-1 italic">{visualConcept}</p>
              </div>
            )}

            <div className="flex items-center justify-between text-ink-faint text-xs max-w-xs pt-1">
              <button className="flex items-center gap-1 hover:text-cobalt cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /> 18</button>
              <button className="flex items-center gap-1 hover:text-teal-success cursor-pointer"><Repeat className="w-3.5 h-3.5" /> 34</button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1 cursor-pointer transition-colors ${liked ? 'text-red-error font-bold' : 'hover:text-red-error'}`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-error' : ''}`} /> {liked ? 211 : 210}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-1 cursor-pointer transition-colors ${saved ? 'text-cobalt font-bold' : 'hover:text-cobalt'}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-cobalt' : ''}`} /> {saved ? 46 : 45}
              </motion.button>
              <button className="hover:text-cobalt cursor-pointer"><Share2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Instagram / TikTok Feed Post
  return (
    <div className={`bg-white border border-stone-border rounded-panel shadow-soft overflow-hidden max-w-md w-full card-tactile ${className}`}>
      {/* IG Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-stone-divider bg-surface-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 to-rose-600 shadow-2xs">
            <img src={avatarUrl} alt={authorName} className="w-full h-full rounded-full object-cover border-2 border-white" />
          </div>
          <div>
            <p className="font-bold text-xs text-ink-navy">{authorHandle.replace(/^@/, '') || 'brand_account'}</p>
            <p className="text-[10px] text-ink-faint">Original audio • Sponsored</p>
          </div>
        </div>
        <button className="text-ink-muted hover:text-ink-navy cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
      </div>

      {/* Visual Area with subtle contrast */}
      <div className="bg-surface-navy text-white min-h-[220px] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
        <span className="relative z-10 px-2.5 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase tracking-wider mb-2 shadow-2xs">
          {platform.toUpperCase()} POST PREVIEW
        </span>
        <p className="relative z-10 font-extrabold text-base max-w-xs leading-snug tracking-tight">
          {hook || 'Stop scrolling: The unglamorous truth about building momentum'}
        </p>
        {visualConcept && (
          <p className="relative z-10 text-[11px] text-stone-border mt-2.5 max-w-xs italic opacity-90 leading-relaxed">
            {visualConcept}
          </p>
        )}
      </div>

      {/* IG Actions Bar */}
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4 text-ink-navy">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setLiked(!liked)}
              className={`transition-colors cursor-pointer ${liked ? 'text-red-error' : 'hover:text-red-error'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-error text-red-error' : ''}`} />
            </motion.button>
            <button className="hover:text-cobalt transition-colors cursor-pointer"><MessageCircle className="w-4 h-4" /></button>
            <button className="hover:text-cobalt transition-colors cursor-pointer"><Share2 className="w-4 h-4" /></button>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setSaved(!saved)}
            className={`transition-colors cursor-pointer ${saved ? 'text-cobalt' : 'hover:text-cobalt'}`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-cobalt text-cobalt' : ''}`} />
          </motion.button>
        </div>

        <p className="text-[11px] font-bold text-ink-navy mb-1.5">{liked ? 385 : 384} likes</p>

        {/* Caption */}
        <div className="text-xs text-ink-navy leading-relaxed space-y-1">
          <p>
            <span className="font-bold mr-1.5">{authorHandle.replace(/^@/, '') || 'brand_account'}</span>
            {bodyCaption}
          </p>
          {hashtags.length > 0 && (
            <p className="text-cobalt font-medium pt-1">{hashtags.join(' ')}</p>
          )}
        </div>

        <p className="text-[10px] text-ink-faint uppercase tracking-wide mt-2 font-mono">2 HOURS AGO</p>
      </div>
    </div>
  );
};
