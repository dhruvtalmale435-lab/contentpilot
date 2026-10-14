import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink-navy text-white pt-16 pb-12 border-t border-ink-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cobalt flex items-center justify-center text-chartreuse shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                ContentPilot <span className="text-chartreuse">AI</span>
              </span>
            </div>
            <p className="text-xs text-stone-border/80 leading-relaxed">
              The unified social media creation, pre-publishing optimization, and planning platform for small businesses, creators, and modern teams.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-chartreuse font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-chartreuse mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-stone-border/70">
              <li><Link to="/app/studio" className="hover:text-white transition-colors">AI Content Studio</Link></li>
              <li><Link to="/app/analyzer" className="hover:text-white transition-colors">Potential Analyzer</Link></li>
              <li><Link to="/app/brand-hub" className="hover:text-white transition-colors">Brand Hub</Link></li>
              <li><Link to="/app/calendar" className="hover:text-white transition-colors">Content Calendar</Link></li>
              <li><Link to="/app/analytics" className="hover:text-white transition-colors">Hypothesis Analytics</Link></li>
              <li><Link to="/app/visual-studio" className="hover:text-white transition-colors">Visual Studio</Link></li>
            </ul>
          </div>

          {/* Solutions & Verticals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-chartreuse mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs text-stone-border/70">
              <li><span className="hover:text-white transition-colors cursor-pointer">Small Businesses</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Independent Creators</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Social Media Managers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Boutique Agencies</span></li>
              <li><Link to="/admin" className="hover:text-chartreuse transition-colors flex items-center gap-1.5 pt-1 text-chartreuse">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Owner Admin Portal</span>
              </Link></li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-chartreuse mb-4">Transparency</h4>
            <p className="text-xs text-stone-border/70 leading-relaxed mb-3">
              Content Readiness Scores are heuristic & AI editorial assessments. We do not make false virality claims or fake live platform feeds.
            </p>
            <p className="text-[11px] text-stone-border/50">
              Built with React, Vite, TypeScript, Tailwind CSS, FastAPI, and Supabase PostgreSQL.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-border/60 gap-4">
          <p>© {new Date().getFullYear()} ContentPilot AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for thoughtful creators <Heart className="w-3 h-3 text-chartreuse fill-chartreuse" />
          </p>
        </div>
      </div>
    </footer>
  );
};
