import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Zap,
  Download,
  Share2,
  X
} from 'lucide-react';
import { storage } from '../../services/storage';
import { CalendarEntry, ContentItem } from '../../types';

export const CalendarPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const scheduleItemId = searchParams.get('scheduleItem');

  const [entries, setEntries] = useState<CalendarEntry[]>(() => storage.getCalendarEntries());
  const [items] = useState<ContentItem[]>(() => storage.getContentItems());
  const [viewType, setViewType] = useState<'month' | 'week' | 'agenda'>('month');

  // Month navigation state
  const [currentMonthName, setCurrentMonthName] = useState('October 2026');

  // Scheduling Modal
  const [modalOpen, setModalOpen] = useState(Boolean(scheduleItemId));
  const [selectedContentId, setSelectedContentId] = useState(scheduleItemId || items[0]?.id || '');
  const [scheduleDate, setScheduleDate] = useState('2026-10-18T09:30');

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContentId || !scheduleDate) return;
    const dateIso = new Date(scheduleDate).toISOString();
    storage.scheduleContent(selectedContentId, dateIso);
    setEntries(storage.getCalendarEntries());
    setModalOpen(false);
  };

  const handleRemoveSchedule = (id: string) => {
    storage.deleteCalendarEntry(id);
    setEntries(storage.getCalendarEntries());
  };

  // Days in mock month (October 2026 has 31 days, starting on Thursday)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getPlatformBadgeColor = (platform?: string) => {
    switch (platform) {
      case 'instagram': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'linkedin': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tiktok': return 'bg-neutral-900 text-white border-neutral-800';
      case 'twitter': return 'bg-slate-100 text-slate-800 border-slate-300';
      default: return 'bg-cobalt-light text-cobalt border-cobalt/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Publishing Schedule & Orchestration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Content Calendar</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Organize publishing slots, schedule reminders, and track content pillar distribution across channels.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-cobalt-glow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Schedule Content Slot
        </motion.button>
      </div>

      {/* Calendar Top Controls */}
      <div className="bg-white p-4 rounded-panel border border-stone-border shadow-soft flex flex-wrap items-center justify-between gap-4 card-tactile">
        {/* Month Navigator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-stone-border rounded-lg overflow-hidden shadow-2xs">
            <button className="p-1.5 hover:bg-stone-hover text-ink-navy transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-stone-hover text-ink-navy transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-base font-extrabold text-ink-navy">{currentMonthName}</h2>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-surface-warm p-1 rounded-lg border border-stone-border flex items-center shadow-2xs">
            {(['month', 'week', 'agenda'] as const).map((vt) => (
              <button
                key={vt}
                onClick={() => setViewType(vt)}
                className={`px-3 py-1 rounded text-xs font-bold capitalize transition-all cursor-pointer ${
                  viewType === vt ? 'bg-white text-ink-navy shadow-sm' : 'text-ink-muted hover:text-ink-navy'
                }`}
              >
                {vt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View 1: Month View Grid */}
      {viewType === 'month' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-stone-border rounded-panel shadow-soft overflow-hidden card-tactile"
        >
          {/* Days of week header */}
          <div className="grid grid-cols-7 bg-surface-subtle border-b border-stone-border text-center text-[10px] font-mono font-bold uppercase py-2.5 text-ink-faint">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 border-b border-stone-divider divide-x divide-y divide-stone-divider">
            {/* Empty slots for Thursday start in Oct 2026 */}
            <div className="min-h-[115px] p-2 bg-surface-warm/40" />
            <div className="min-h-[115px] p-2 bg-surface-warm/40" />
            <div className="min-h-[115px] p-2 bg-surface-warm/40" />
            <div className="min-h-[115px] p-2 bg-surface-warm/40" />

            {days.map((day) => {
              const dayEntries = entries.filter((e) => {
                const d = new Date(e.startTime);
                return d.getDate() === day;
              });

              const isToday = day === 15;

              return (
                <div
                  key={day}
                  className={`min-h-[115px] p-2 relative flex flex-col justify-between transition-colors ${
                    isToday ? 'bg-cobalt-light/25' : 'bg-white hover:bg-surface-warm/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday ? 'bg-cobalt text-white shadow-xs' : 'text-ink-navy'
                      }`}
                    >
                      {day}
                    </span>
                    {dayEntries.length > 0 && (
                      <span className="text-[9px] font-bold text-cobalt bg-cobalt-light px-1.5 py-0.2 rounded-full border border-cobalt/20">
                        {dayEntries.length} post{dayEntries.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Day Content Badges */}
                  <div className="space-y-1.5 my-1">
                    {dayEntries.map((e) => (
                      <motion.div
                        key={e.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-1.5 rounded bg-white border border-stone-border shadow-2xs hover:border-cobalt transition-colors text-[10px] space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-bold uppercase text-[8px] px-1 py-0.2 rounded border ${getPlatformBadgeColor(e.contentItem?.platform)}`}>
                            {e.contentItem?.platform || 'Social'}
                          </span>
                          <span className="text-[9px] font-mono text-cobalt font-semibold">
                            {new Date(e.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="font-medium text-ink-navy truncate">{e.contentItem?.title || 'Scheduled item'}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => {
                        setScheduleDate(`2026-10-${String(day).padStart(2, '0')}T09:30`);
                        setModalOpen(true);
                      }}
                      className="text-[10px] text-ink-faint hover:text-cobalt font-semibold cursor-pointer"
                    >
                      + slot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* View 2: Agenda View */}
      {viewType === 'agenda' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-stone-border rounded-panel shadow-soft p-6 space-y-4 card-tactile"
        >
          <h3 className="font-bold text-sm text-ink-navy">Upcoming Scheduled Deliveries</h3>
          {entries.length === 0 ? (
            <p className="text-xs text-ink-muted">No scheduled slots.</p>
          ) : (
            <div className="divide-y divide-stone-divider">
              {entries.map((e) => (
                <div key={e.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-warm/40 px-2 rounded-lg transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getPlatformBadgeColor(e.contentItem?.platform)}`}>
                        {e.contentItem?.platform}
                      </span>
                      <span className="text-xs font-bold text-ink-navy">{e.contentItem?.title}</span>
                    </div>
                    <p className="text-xs text-ink-muted line-clamp-1">{e.contentItem?.bodyCaption}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs">
                      <span className="font-mono font-bold text-cobalt block">
                        {new Date(e.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(e.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-[10px] text-teal-success font-semibold uppercase flex items-center gap-1 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-success animate-pulse" />
                        Pending Auto-Publish
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveSchedule(e.id)}
                      className="px-2.5 py-1 text-xs text-red-error hover:bg-red-error-bg rounded font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* View 3: Week View */}
      {viewType === 'week' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-stone-border rounded-panel shadow-soft p-6 space-y-4 card-tactile"
        >
          <h3 className="font-bold text-sm text-ink-navy">Current Week Breakdown (Oct 12 - Oct 18)</h3>
          <div className="grid grid-cols-7 gap-2.5">
            {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15 (Today)', 'Fri 16', 'Sat 17', 'Sun 18'].map((dayHeader, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border min-h-[170px] space-y-2 ${
                  idx === 3 ? 'bg-cobalt-light/20 border-cobalt/30' : 'bg-surface-warm border-stone-border'
                }`}
              >
                <span className="text-xs font-bold text-ink-navy block">{dayHeader}</span>
                {idx === 6 && (
                  <div className="p-2.5 bg-white rounded-lg border border-cobalt shadow-2xs text-[10px] space-y-1">
                    <span className="font-bold text-cobalt block uppercase text-[9px]">Instagram Carousel</span>
                    <p className="text-ink-navy font-medium truncate">Why Supermarket Coffee Stales</p>
                    <span className="text-ink-faint font-mono">09:30 AM</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scheduling Modal with AnimatePresence */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-navy/40 backdrop-blur-xs"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative bg-white rounded-2xl border border-stone-border shadow-elevated p-6 max-w-md w-full space-y-4 z-10 card-tactile"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-divider">
                <h3 className="font-bold text-base text-ink-navy">Schedule Content Slot</h3>
                <button onClick={() => setModalOpen(false)} className="text-ink-muted hover:text-ink-navy p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Select Content Item</label>
                  <select
                    value={selectedContentId}
                    onChange={(e) => setSelectedContentId(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs bg-white font-medium"
                  >
                    {items.map((it) => (
                      <option key={it.id} value={it.id}>
                        [{it.platform.toUpperCase()}] {it.title} ({it.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-medium"
                  />
                </div>

                <div className="p-3 bg-surface-warm rounded-lg text-[11px] text-ink-muted border border-stone-border">
                  <strong>Schedule Status Rule:</strong> The post status transitions to <code className="bg-white px-1 py-0.5 rounded border border-stone-border">scheduled</code>. It will not be marked <code className="bg-white px-1 py-0.5 rounded border border-stone-border">published</code> automatically until publication occurs.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-stone-border text-xs font-bold text-ink-navy rounded-lg hover:bg-stone-hover cursor-pointer"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-4 py-2 bg-cobalt text-white text-xs font-bold rounded-lg hover:bg-cobalt-hover shadow-cobalt-glow cursor-pointer"
                  >
                    Confirm Slot
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
