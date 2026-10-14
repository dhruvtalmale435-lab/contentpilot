import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Layers,
  Sparkles,
  Zap,
  FolderOpen,
  Calendar,
  BarChart3,
  Search,
  Flag,
  Palette,
  Share2,
  FileText,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../services/storage';

export const AppLayout: React.FC = () => {
  const { user, workspace, isDemoMode, logout, loginAsDemoAdmin } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const notifications = storage.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', to: '/app', icon: LayoutDashboard, exact: true },
    { name: 'Brand Hub', to: '/app/brand-hub', icon: Layers },
    { name: 'AI Studio', to: '/app/studio', icon: Sparkles, badge: 'AI' },
    { name: 'Potential Analyzer', to: '/app/analyzer', icon: Zap, badge: 'Differentiator', badgeColor: 'bg-chartreuse text-ink-navy' },
    { name: 'Content Library', to: '/app/library', icon: FolderOpen },
    { name: 'Calendar', to: '/app/calendar', icon: Calendar },
    { name: 'Analytics & Insights', to: '/app/analytics', icon: BarChart3 },
    { name: 'Research & Trends', to: '/app/research', icon: Search },
    { name: 'Campaigns', to: '/app/campaigns', icon: Flag },
    { name: 'Visual Studio', to: '/app/visual-studio', icon: Palette },
    { name: 'Social Accounts', to: '/app/social-accounts', icon: Share2 },
    { name: 'Reports', to: '/app/reports', icon: FileText },
    { name: 'Settings', to: '/app/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-ink-navy">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-stone-border flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand header */}
        <div className="p-4 border-b border-stone-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ink-navy flex items-center justify-center text-chartreuse shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-ink-navy block">
                ContentPilot <span className="text-cobalt">AI</span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-ink-faint uppercase block">
                Creator Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Workspace Card */}
        <div className="p-3 mx-3 mt-3 bg-surface-subtle border border-stone-border rounded-lg">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-ink-navy truncate">{workspace.name}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cobalt-light text-cobalt uppercase">
              {workspace.planTier}
            </span>
          </div>
          <p className="text-[10px] text-ink-faint">Single active brand workspace</p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-ink-navy text-white shadow-soft font-bold'
                      : 'text-ink-muted hover:text-ink-navy hover:bg-stone-hover'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      item.badgeColor || 'bg-cobalt text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Admin link at bottom */}
        <div className="p-3 border-t border-stone-divider space-y-1">
          <Link
            to="/admin"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-ink-muted hover:text-cobalt hover:bg-cobalt-light transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cobalt" />
              <span>Owner Admin</span>
            </div>
            <span className="text-[10px] font-mono text-ink-faint">/admin</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-error hover:bg-red-error-bg transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-surface border-b border-stone-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg text-ink-navy hover:bg-stone-hover"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/app" className="font-bold text-sm text-ink-navy">
              ContentPilot <span className="text-cobalt">AI</span>
            </Link>
          </div>

          {/* Left Title / Workspace info */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-bold text-ink-navy">{workspace.name}</span>
            {isDemoMode && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-warning-bg text-amber-warning border border-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-warning animate-pulse" />
                Demo Mode (Local Seed Data)
              </span>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/app/studio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Content</span>
            </Link>

            <Link
              to="/app/analyzer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy text-xs font-bold transition-all shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-ink-navy" />
              <span>Score Post</span>
            </Link>

            {/* Notifications toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg text-ink-muted hover:text-ink-navy hover:bg-stone-hover relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cobalt" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-border rounded-panel shadow-panel p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-divider">
                    <span className="text-xs font-bold text-ink-navy">Notifications</span>
                    <span className="text-[10px] text-ink-faint">{unreadCount} unread</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => storage.markNotificationRead(notif.id)}
                        className={`p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                          notif.read ? 'bg-surface-subtle text-ink-muted' : 'bg-cobalt-light/40 text-ink-navy font-medium'
                        }`}
                      >
                        <p className="font-semibold text-[11px]">{notif.title}</p>
                        <p className="text-[11px] text-ink-muted mt-0.5">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-stone-hover transition-colors"
              >
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user?.fullName || 'User'}
                  className="w-7 h-7 rounded-full object-cover border border-stone-border"
                />
                <span className="hidden sm:inline text-xs font-semibold text-ink-navy">
                  {user?.fullName || 'Elena Vance'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-ink-faint" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-stone-border rounded-panel shadow-panel py-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-stone-divider">
                    <p className="font-bold text-ink-navy">{user?.fullName}</p>
                    <p className="text-[10px] text-ink-faint truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/app/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-3 py-2 text-ink-navy hover:bg-stone-hover"
                  >
                    Workspace Settings
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => {
                      setUserMenuOpen(false);
                      loginAsDemoAdmin();
                    }}
                    className="block px-3 py-2 text-cobalt hover:bg-cobalt-light font-semibold"
                  >
                    Owner Admin Console
                  </Link>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-red-error hover:bg-red-error-bg font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Body Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-ink-navy/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative w-72 bg-white flex flex-col h-full shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-border">
              <span className="font-extrabold text-sm text-ink-navy">ContentPilot AI</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-ink-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="py-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                      isActive ? 'bg-ink-navy text-white' : 'text-ink-muted hover:bg-stone-hover'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-chartreuse text-ink-navy font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
