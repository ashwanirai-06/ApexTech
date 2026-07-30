import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Terminal,
  Mic,
  Code2,
  Video,
  Target,
  BarChart3,
  History,
  User,
  Settings,
  ChevronRight,
  Sparkles,
  Database
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuCategories = [
    {
      title: '3000+ INTERVIEW QUESTION BANK',
      items: [
        { id: 'questionbank', label: 'Question Bank (3000+ Questions)', icon: Database, highlight: true },
        { id: 'dsa', label: 'DSA Sheets (Striver, GFG, LeetCode)', icon: Terminal },
      ]
    },
    {
      title: 'TECH STACK & DOMAINS',
      items: [
        { id: 'domains', label: 'Domain Roadmaps (Web, AI, Cloud)', icon: Compass },
      ]
    },
    {
      title: 'LEARNING & CODE TOOLS',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'code', label: 'AI Code Reviewer', icon: Code2 },
        { id: 'resources', label: 'Educators & Video Masterclasses', icon: Video },
        { id: 'weaks', label: 'Weak Concept Drills', icon: Target },
        { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'profile', label: 'Developer Profile', icon: User },
        { id: 'settings', label: 'Settings & Themes', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#050508] p-4 hidden md:flex flex-col justify-between min-h-[calc(100vh-4rem)] select-none">
      <div className="space-y-6">
        {menuCategories.map((cat, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-widest text-slate-500 font-mono uppercase">
              {cat.title}
            </p>
            <div className="space-y-1 mt-1">
              {cat.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex w-full items-center gap-3 px-3.5 py-2 text-xs font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-bold'
                        : item.highlight
                        ? 'text-cyan-300 hover:bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/50'
                        : 'text-slate-400 hover:bg-slate-900/80 hover:text-white border border-transparent hover:border-slate-800'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive
                          ? 'text-cyan-400'
                          : item.highlight
                          ? 'text-cyan-400'
                          : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>

                    {item.highlight && (
                      <span className="ml-auto rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 uppercase font-mono border border-cyan-500/30">
                        SHEETS
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight className="ml-auto h-3.5 w-3.5 text-cyan-400 animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI Guardian Footer Box */}
      <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <p className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold font-mono">
              ApexTech Engine Active
            </p>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Powered by Gemini AI for technical oral vivas & code evaluation.
          </p>
        </div>
      </div>
    </aside>
  );
};
