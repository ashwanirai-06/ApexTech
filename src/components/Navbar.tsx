import React from 'react';
import { User } from '../types';
import { Zap, ShieldAlert, LogOut, Code2, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  demoMode,
  setDemoMode,
  onLogout
}) => {
  const { themeConfig } = useTheme();

  return (
    <header 
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200 ${
        themeConfig.mode === 'light'
          ? 'bg-white/90 border-slate-200 text-slate-800'
          : `${themeConfig.cardBgClass}/90 ${themeConfig.borderClass} text-white`
      }`}
      style={{
        backgroundColor: themeConfig.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : undefined
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Mobile Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab(user ? 'dashboard' : 'login')}
            className="flex items-center gap-2 text-left group transition-all cursor-pointer"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${themeConfig.accentGradient} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-xl font-mono">
                <span className={themeConfig.mode === 'light' ? 'text-slate-900' : 'text-white'}>
                  Apex<span className={themeConfig.textAccentClass}>Tech</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans hidden sm:block">DSA Sheets & Tech Career Engineering</p>
            </div>
          </button>

          {/* User Profile Badge */}
          {user && (
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <Code2 className={`h-3.5 w-3.5 ${themeConfig.textAccentClass}`} />
              <span className={`font-semibold ${themeConfig.textAccentClass} font-mono truncate max-w-[150px]`}>{user.profile?.targetRole || 'Full Stack'}</span>
            </div>
          )}
        </div>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Theme Quick Switcher Link */}
          <button
            onClick={() => setActiveTab('settings-theme')}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${themeConfig.badgeClass}`}
            title="Change Theme Palette"
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Theme: {themeConfig.name}</span>
          </button>

          {/* AI Readiness Score */}
          <div className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold ${themeConfig.badgeClass}`}>
            <Zap className="h-4 w-4 fill-current" />
            <span>100% Tech Ready</span>
          </div>

          {/* Demo Mode Badge / Toggle */}
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-medium transition-all ${
              demoMode
                ? 'border-purple-500/40 bg-purple-950/40 text-purple-300 hover:bg-purple-900/40'
                : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
            }`}
            title="Toggle Demo Mode"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{demoMode ? 'Demo Mode' : 'Live Gemini AI'}</span>
          </button>

          {/* User Profile / Logout */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 text-xs text-white hover:bg-white/10 transition-colors"
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr ${themeConfig.accentGradient} font-bold text-white text-xs`}>
                  {user.fullName.charAt(0)}
                </div>
                <span className="hidden lg:inline-block font-medium pr-1">{user.fullName.split(' ')[0]}</span>
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all font-mono"
            >
              Sign In
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
