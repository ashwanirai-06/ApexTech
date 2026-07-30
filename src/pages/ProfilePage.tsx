import React, { useState } from 'react';
import { User } from '../types';
import { 
  User as UserIcon, 
  Mail, 
  Save, 
  Target, 
  Award, 
  Briefcase,
  CheckCircle2,
  Sparkles,
  LogOut,
  Code2,
  Layers,
  Building
} from 'lucide-react';

export const ProfilePage: React.FC<{ user: User; onLogout?: () => void }> = ({ user, onLogout }) => {
  const [fullName, setFullName] = useState(user.fullName || 'Ashwani Rai');
  const [targetRole, setTargetRole] = useState(user.profile?.targetRole || 'Full Stack Software Engineer');
  const [primaryStack, setPrimaryStack] = useState(user.profile?.primaryStack || 'React, Node.js, C++ & Python');
  const [experienceLevel, setExperienceLevel] = useState('Student / Entry-Level Engineer');
  const [targetCompanies, setTargetCompanies] = useState('MAANG / FAANG, Product Startups & High Growth Unicorns');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-2xl shadow-lg shadow-cyan-500/10">
              {fullName.charAt(0)}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-2.5 py-0.5 text-[10px] uppercase font-mono font-bold text-cyan-300 mb-1">
                <Code2 className="h-3 w-3 text-cyan-400" />
                <span>Verified Tech Developer Profile</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{fullName}</span>
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Email: <span className="text-cyan-300 font-semibold">{user.email}</span> • {targetRole}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>DSA Sheets Active</span>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 text-xs font-mono font-bold hover:bg-rose-900/60 transition-all duration-300 hover:scale-105"
              >
                <LogOut className="h-4 w-4 text-rose-400" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30">
        
        {saved && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-4 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn font-mono">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Developer Profile updated successfully! All tech goals saved.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Developer Credentials */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>1. Account Identity & Credentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <UserIcon className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Registered Gmail / Email</span>
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email || 'student@gmail.com'}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-3.5 py-2.5 text-xs text-slate-400 font-mono cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Tech Role & Skillsets */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-purple-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>2. Engineering Role & Tech Stack</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Engineering Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all font-medium font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Tech Stack</label>
                <input
                  type="text"
                  value={primaryStack}
                  onChange={e => setPrimaryStack(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-xs text-cyan-300 font-mono font-medium focus:border-cyan-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={e => setExperienceLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all font-medium font-mono"
                >
                  <option value="Student / Entry-Level Engineer">Student / Entry-Level Engineer</option>
                  <option value="Junior Developer (0-2 YOE)">Junior Developer (0-2 YOE)</option>
                  <option value="Mid-Level Engineer (2-4 YOE)">Mid-Level Engineer (2-4 YOE)</option>
                  <option value="Competitive Programmer & DSA Lead">Competitive Programmer & DSA Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Companies</label>
                <input
                  type="text"
                  value={targetCompanies}
                  onChange={e => setTargetCompanies(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold font-mono text-slate-950 shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>Save Developer Profile</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
