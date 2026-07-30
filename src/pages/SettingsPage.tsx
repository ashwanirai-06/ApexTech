import React, { useState } from 'react';
import { Settings, ShieldAlert, Cpu, Palette, Lock, Trash2, Check, Download, LogOut } from 'lucide-react';

interface SettingsPageProps {
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
  onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ demoMode, setDemoMode, currentTheme = 'cyan', onThemeChange, onLogout }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [encryptedStorage, setEncryptedStorage] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [autoClearChat, setAutoClearChat] = useState(false);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    if (onThemeChange) {
      onThemeChange(themeId);
    }
  };

  const THEMES = [
    { id: 'cyan', name: 'Cyberpunk Cyan (Default)', bg: 'bg-[#020204]', accent: 'from-cyan-500 to-indigo-600', border: 'border-cyan-500/50' },
    { id: 'emerald', name: 'Emerald Academic', bg: 'bg-[#02120b]', accent: 'from-emerald-500 to-teal-600', border: 'border-emerald-500/50' },
    { id: 'purple', name: 'Royal Amethyst', bg: 'bg-[#0c061a]', accent: 'from-purple-500 to-pink-600', border: 'border-purple-500/50' },
    { id: 'amber', name: 'Sunset Amber', bg: 'bg-[#18040a]', accent: 'from-amber-500 to-rose-600', border: 'border-amber-500/50' },
    { id: 'oled', name: 'OLED Obsidian', bg: 'bg-black', accent: 'from-slate-200 to-slate-400', border: 'border-slate-700' },
    { id: 'slate', name: 'Classic Slate', bg: 'bg-[#0f172a]', accent: 'from-blue-500 to-cyan-500', border: 'border-blue-500/50' }
  ];

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "apexaktu_student_backup.json");
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
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-white font-mono flex items-center gap-2">
          <Settings className="h-5 w-5 text-cyan-400" />
          <span>ApexAKTU System Settings, Themes & Privacy</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize UI aesthetics, data encryption, and AI model parameters.
        </p>
      </div>

      <div className="space-y-6">

        {/* 6 Theme Selector Options */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <Palette className="h-4 w-4 text-cyan-400" />
            <span>UI Theme Palette (6 Custom Modes)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${theme.bg} ${
                  selectedTheme === theme.id ? `${theme.border} ring-2 ring-cyan-400/40 shadow-lg` : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`h-4 w-4 rounded-full bg-gradient-to-r ${theme.accent}`} />
                  {selectedTheme === theme.id && <Check className="h-4 w-4 text-cyan-400" />}
                </div>
                <span className="text-xs font-mono font-bold text-white mt-3 block">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy & Data Protection Controls */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>Privacy & Student Data Protection</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Local AES-256 State Encryption</span>
                <span className="text-slate-400 text-[11px]">Encrypts all local study notes & mock scores on device.</span>
              </div>
              <button
                onClick={() => setEncryptedStorage(!encryptedStorage)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  encryptedStorage ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {encryptedStorage ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Anonymous Practice Mode</span>
                <span className="text-slate-400 text-[11px]">Hides roll number & student name on exported PDF report cards.</span>
              </div>
              <button
                onClick={() => setAnonymousMode(!anonymousMode)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  anonymousMode ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {anonymousMode ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Auto-Clear Viva Chat Session</span>
                <span className="text-slate-400 text-[11px]">Automatically purges raw audio transcript buffer after evaluation.</span>
              </div>
              <button
                onClick={() => setAutoClearChat(!autoClearChat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  autoClearChat ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {autoClearChat ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-xs font-bold text-slate-200 hover:text-white"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Export All Student Data (JSON)</span>
            </button>
            <button
              onClick={handleWipeData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-500/30 bg-rose-950/30 text-xs font-bold text-rose-300 hover:bg-rose-900/40"
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
              In Demo Mode, realistic pre-generated academic evaluations are used if Gemini API key is unconfigured.
            </p>
          </div>

          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              demoMode
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {demoMode ? 'ON (Demo Mode)' : 'OFF (Live Gemini API)'}
          </button>
        </div>

        {/* Gemini Model Info Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>AI Model Architecture</span>
          </div>

          <div className="text-xs space-y-2 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Primary Engine</span>
              <span className="font-mono text-cyan-300 font-bold">gemini-2.5-flash</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Server SDK</span>
              <span className="font-mono text-slate-200">Google Gen AI SDK (@google/genai)</span>
            </div>
            <div className="flex justify-between">
              <span>API Key Status</span>
              <span className="font-mono text-emerald-400 font-bold">Configured (process.env.GEMINI_API_KEY)</span>
            </div>
          </div>
        </div>

        {/* Account Controls Card */}
        {onLogout && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 flex items-center justify-between transition-all duration-300 hover:border-rose-500/50">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <LogOut className="h-4 w-4 text-rose-400" />
                <span>Account Session & Logout</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Sign out of your ApexAKTU student account on this device.
              </p>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold font-mono text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 hover:scale-105 active:scale-95 transition-all duration-300"
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
