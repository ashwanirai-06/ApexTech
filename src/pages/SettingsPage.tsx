import React, { useState } from 'react';
import { Settings, ShieldAlert, Palette, Lock, Trash2, Check, Download, LogOut, Sun, Moon, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useTheme, SidebarBgStyle, AccentColor } from '../context/ThemeContext';

interface SettingsPageProps {
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
  onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ demoMode, setDemoMode, onThemeChange, onLogout }) => {
  const [encryptedStorage, setEncryptedStorage] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);

  const {
    currentThemeId,
    setTheme,
    allThemes,
    bgStyle,
    setBgStyle,
    accentColor,
    setAccentColor,
    sidebarWidth,
    setSidebarWidth,
    isCollapsed,
    toggleCollapse,
    themeMode,
    setThemeMode
  } = useTheme();

  const handleSelectTheme = (themeId: string) => {
    setTheme(themeId);
    if (onThemeChange) {
      onThemeChange(themeId);
    }
  };

  const SIDEBAR_BG_OPTIONS: { id: SidebarBgStyle; label: string; bgClass: string }[] = [
    { id: 'dark', label: 'Dark Slate', bgClass: 'bg-[#05060b]' },
    { id: 'pitch', label: 'Pitch Black', bgClass: 'bg-[#030712]' },
    { id: 'indigo', label: 'Cyber Indigo', bgClass: 'bg-[#090b1c]' },
    { id: 'purple', label: 'Midnight Purple', bgClass: 'bg-[#0f0919]' },
    { id: 'oled', label: 'OLED Pure Black', bgClass: 'bg-black' },
    { id: 'light', label: 'Clean Light', bgClass: 'bg-slate-100 text-slate-900' }
  ];

  const ACCENT_OPTIONS: { id: AccentColor; label: string; colorClass: string }[] = [
    { id: 'cyan', label: 'Cyan Glow', colorClass: 'bg-cyan-500' },
    { id: 'emerald', label: 'Emerald Green', colorClass: 'bg-emerald-500' },
    { id: 'purple', label: 'Royal Purple', colorClass: 'bg-purple-500' },
    { id: 'amber', label: 'Amber Gold', colorClass: 'bg-amber-500' },
    { id: 'rose', label: 'Crimson Rose', colorClass: 'bg-rose-500' },
    { id: 'blue', label: 'Electric Blue', colorClass: 'bg-blue-500' }
  ];

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "apextech_developer_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleWipeData = () => {
    if (confirm("Are you sure you want to clear all local practice data & session logs?")) {
      localStorage.clear();
      alert("Local data cleared successfully.");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 font-mono">
      
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-cyan-400" />
          <span>ApexTech Platform Settings & Theme Customization</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize full global UI themes, sidebar colors, layout width, and developer preferences.
        </p>
      </div>

      <div className="space-y-6">

        {/* FEATURE 2: 11 GLOBAL THEMES CUSTOMIZATION ENGINE */}
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-950 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
              <Palette className="h-5 w-5 text-cyan-400" />
              <span>Global Theme Customization System (11 Presets)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Instant Change & Local Storage Persistence</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Select from 11 hand-crafted dark, light, cyberpunk, OLED, and vibrant themes. Changes apply instantly across sidebars, workspaces, official solution viewers, and video cards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {allThemes.map(t => {
              const isActive = currentThemeId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
                    t.mode === 'light' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-900 text-white border-slate-800'
                  } ${isActive ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-xl scale-[1.02]' : 'hover:border-slate-700'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full border border-white/20 shadow"
                        style={{ backgroundColor: t.accentColor }}
                      />
                      <span className="text-xs font-bold font-mono truncate">{t.name}</span>
                    </div>
                    {isActive && (
                      <span className="bg-cyan-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check className="h-3 w-3" /> ACTIVE
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] opacity-75 mt-2.5 font-sans leading-snug line-clamp-2">
                    {t.description}
                  </p>

                  <div className="flex items-center gap-1 mt-3 pt-2 border-t border-black/10 dark:border-white/10 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 uppercase font-extrabold">
                      {t.mode}
                    </span>
                    <span className="text-slate-400 font-mono truncate">
                      {t.id}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR CUSTOMIZATION SYSTEM */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
              <SlidersHorizontal className="h-5 w-5 text-cyan-400" />
              <span>Sidebar Display Controls</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Adaptive App Theme Syncing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Sidebar Width */}
            <div className="space-y-2">
              <label className="text-slate-300 font-bold block">1. Sidebar Width Preset</label>
              <div className="flex items-center gap-2">
                {[
                  { id: 'compact', label: 'Compact (56)' },
                  { id: 'normal', label: 'Standard (64)' },
                  { id: 'wide', label: 'Expanded Wide (72)' }
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSidebarWidth(w.id as any)}
                    className={`flex-1 p-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                      sidebarWidth === w.id ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapse & Mode Toggle */}
            <div className="space-y-2">
              <label className="text-slate-300 font-bold block">2. Mode & Display State</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleCollapse}
                  className={`flex-1 p-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    isCollapsed ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  {isCollapsed ? 'Uncollapse Sidebar' : 'Collapse to Icons'}
                </button>

                <button
                  onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                  className={`flex-1 p-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    themeMode === 'light' ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  {themeMode === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-cyan-400" />}
                  <span>{themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Data Protection Controls */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>Privacy & Developer Data Protection</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Local AES-256 State Encryption</span>
                <span className="text-slate-400 text-[11px]">Encrypts all local study notes & mock scores on device.</span>
              </div>
              <button
                onClick={() => setEncryptedStorage(!encryptedStorage)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                  encryptedStorage ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {encryptedStorage ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Anonymous Practice Mode</span>
                <span className="text-slate-400 text-[11px]">Hides profile details on exported interview PDF summaries.</span>
              </div>
              <button
                onClick={() => setAnonymousMode(!anonymousMode)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                  anonymousMode ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {anonymousMode ? 'ACTIVE' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Export Developer Backup (JSON)</span>
            </button>
            <button
              onClick={handleWipeData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-500/30 bg-rose-950/30 text-xs font-bold text-rose-300 hover:bg-rose-900/40 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5 text-rose-400" />
              <span>Wipe Local Cache & History</span>
            </button>
          </div>
        </div>

        {/* Demo Mode Toggle Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <ShieldAlert className="h-4 w-4 text-purple-400" />
              <span>Demo Mode Toggle</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              In Demo Mode, realistic pre-generated interview evaluations are used if Gemini API key is unconfigured.
            </p>
          </div>

          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              demoMode
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {demoMode ? 'ON (Demo Mode)' : 'OFF (Live Gemini API)'}
          </button>
        </div>

        {/* Account Controls Card */}
        {onLogout && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LogOut className="h-4 w-4 text-rose-400" />
                <span>Account Session & Logout</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Sign out of your ApexTech developer account on this device.
              </p>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
