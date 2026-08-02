import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User, AnalyticsSummary, VivaSession } from '../types';
import { DBService } from '../db/dbService';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Terminal,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Building2,
  Clock,
  Target,
  Layers,
  Zap,
  Award,
  BarChart3,
  Play,
  Compass,
  History,
  Code
} from 'lucide-react';

interface DashboardPageProps {
  user: User;
  setActiveTab: (tab: string) => void;
  onSelectSubjectForViva: (subjectCode: string, topic?: string) => void;
  onSelectCompany?: (company: string) => void;
}

const StudentLaptopIllustration = () => (
  <div className="relative w-48 h-48 sm:w-64 sm:h-64 shrink-0 flex items-center justify-center">
    {/* Soft ambient glowing shadow behind student */}
    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl transform scale-95" />
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-2xl">
      {/* Soft floor shadow */}
      <ellipse cx="120" cy="210" rx="90" ry="12" fill="#020617" fillOpacity="0.6" filter="blur(4px)" />
      
      {/* Desk Base */}
      <rect x="30" y="170" width="180" height="8" rx="4" fill="#1e293b" />
      <rect x="40" y="178" width="8" height="32" fill="#0f172a" />
      <rect x="192" y="178" width="8" height="32" fill="#0f172a" />

      {/* Student Character - Minimal Vector */}
      <path d="M75 170 C75 130, 100 120, 120 120 C140 120, 165 130, 165 170 Z" fill="#0284c7" />
      <path d="M100 125 L120 150 L140 125" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      
      {/* Head & Hair */}
      <circle cx="120" cy="92" r="22" fill="#f8fafc" />
      <path d="M98 88 C98 70, 142 70, 142 88 C135 75, 105 75, 98 88 Z" fill="#0f172a" />
      {/* Glasses */}
      <circle cx="112" cy="92" r="5" stroke="#0284c7" strokeWidth="2" fill="none" />
      <circle cx="128" cy="92" r="5" stroke="#0284c7" strokeWidth="2" fill="none" />
      <line x1="117" y1="92" x2="123" y2="92" stroke="#0284c7" strokeWidth="2" />
      <path d="M115 102 Q120 106 125 102" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Laptop */}
      <rect x="85" y="158" width="70" height="12" rx="3" fill="#64748b" />
      <path d="M85 168 L155 168 L160 172 L80 172 Z" fill="#475569" />
      <rect x="90" y="112" width="60" height="46" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      <rect x="94" y="116" width="52" height="38" rx="2" fill="#0369a1" />
      {/* Code lines */}
      <line x1="98" y1="122" x2="120" y2="122" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <line x1="98" y1="128" x2="135" y2="128" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <line x1="104" y1="134" x2="140" y2="134" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      <line x1="104" y1="140" x2="128" y2="140" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="98" y1="146" x2="115" y2="146" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

      {/* Floating Elements */}
      <g opacity="0.8">
        <circle cx="45" cy="70" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="36" y="75" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>

        <circle cx="195" cy="80" r="18" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
        <text x="187" y="85" fill="#34d399" fontSize="16" fontFamily="sans-serif">⚡</text>

        <circle cx="210" cy="140" r="12" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="204" y="145" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">🎯</text>
      </g>
    </svg>
  </div>
);

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  setActiveTab,
  onSelectSubjectForViva,
  onSelectCompany
}) => {
  const { themeConfig } = useTheme();
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [recentSessions, setRecentSessions] = useState<VivaSession[]>([]);

  const refreshAnalytics = async () => {
    const summary = await DBService.getAnalytics(user.id);
    const sessions = await DBService.getVivaSessionsByUser(user.id);
    setAnalytics(summary);
    setRecentSessions(sessions);
  };

  useEffect(() => {
    refreshAnalytics();
    window.addEventListener('apexaktu_streak_updated', refreshAnalytics);
    return () => window.removeEventListener('apexaktu_streak_updated', refreshAnalytics);
  }, [user.id]);

  if (!analytics) {
    return (
      <div className="flex h-64 items-center justify-center text-cyan-400">
        <div className="h-10 w-10 rounded-full border-3 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const isNewUser = analytics.totalVivaSessions === 0;
  const firstName = user.fullName.split(' ')[0] || user.fullName;
  const greetingText = isNewUser ? `Welcome, ${firstName} 👋` : `Welcome back, ${firstName} 👋`;

  const questionsSolved = isNewUser ? 0 : analytics.totalVivaSessions;
  const accuracyScore = isNewUser ? 0 : Math.round(analytics.averageScore || 0);
  const weeklyProgress = isNewUser ? 0 : Math.min(100, Math.round(analytics.roadmapProgress || 0));

  const topCompanies = [
    { name: 'Google', icon: '🌐', color: 'border-blue-500/30 bg-blue-950/30 text-blue-300 hover:border-blue-400' },
    { name: 'Amazon', icon: '📦', color: 'border-amber-500/30 bg-amber-950/30 text-amber-300 hover:border-amber-400' },
    { name: 'Meta', icon: '♾️', color: 'border-indigo-500/30 bg-indigo-950/30 text-indigo-300 hover:border-indigo-400' },
    { name: 'Microsoft', icon: '💻', color: 'border-cyan-500/30 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400' },
    { name: 'Apple', icon: '🍎', color: 'border-slate-500/30 bg-slate-900/60 text-slate-200 hover:border-slate-400' },
    { name: 'Uber', icon: '🚗', color: 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:border-emerald-400' },
    { name: 'Netflix', icon: '🍿', color: 'border-rose-500/30 bg-rose-950/30 text-rose-300 hover:border-rose-400' }
  ];

  const handleCompanyClick = (companyName: string) => {
    if (onSelectCompany) {
      onSelectCompany(companyName);
    } else {
      setActiveTab('questionbank-company');
    }
  };

  const isLight = themeConfig.mode === 'light';

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20 font-sans">
      
      {/* 1. WELCOME SECTION WITH VECTOR ILLUSTRATION */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-3xl border p-8 sm:p-12 shadow-2xl backdrop-blur-xl transition-all ${
          isLight
            ? 'bg-gradient-to-r from-slate-50 via-cyan-50 to-indigo-50 border-slate-200 text-slate-900'
            : 'bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/80 border-slate-800 text-white'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-mono font-bold ${themeConfig.badgeClass}`}>
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span>AI Placement Preparation Engine</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans leading-tight">
              Master Technical Interviews & Land Your Dream Tech Job
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
              {greetingText}. Solve company-wise coding challenges, practice AI viva mock interviews, and master domain roadmaps.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('dsa')}
                className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all shadow-xl cursor-pointer ${themeConfig.buttonClass}`}
              >
                <Zap className="h-5 w-5" />
                <span>Start Daily Challenge</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Minimal Vector Illustration with Soft Shadows */}
          <StudentLaptopIllustration />
        </div>
      </motion.div>

      {/* 2. TOP COMPANIES SECTION - STRUCTURED GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className={`text-xl font-extrabold tracking-wide uppercase font-mono flex items-center gap-3 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <Building2 className={`h-6 w-6 ${themeConfig.textAccentClass}`} />
            <span>Target Top Companies</span>
          </h2>
          <button
            onClick={() => setActiveTab('questionbank-company')}
            className={`text-xs sm:text-sm font-mono font-bold ${themeConfig.textAccentClass} hover:underline cursor-pointer flex items-center gap-1`}
          >
            <span>View All Companies</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {topCompanies.map(comp => (
            <button
              key={comp.name}
              onClick={() => handleCompanyClick(comp.name)}
              className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-105 shadow-lg ${comp.color}`}
            >
              <span className="text-4xl">{comp.icon}</span>
              <span className="text-sm font-extrabold font-mono">{comp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. RIGHT SECTION & QUICK ACTION CARDS GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className={`text-xl font-extrabold tracking-wide uppercase font-mono flex items-center gap-3 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <Zap className={`h-6 w-6 ${themeConfig.textAccentClass}`} />
            <span>Quick Action Cards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Action Card 1: Start Daily Challenge */}
          <div
            onClick={() => setActiveTab('dsa')}
            className={`group p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-5 hover:-translate-y-1.5 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200 hover:border-cyan-400'
                : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/60'
            }`}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 w-fit">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors">
                Start Daily Challenge
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Solve handpicked daily coding problem from top SDE sheets.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono font-bold text-cyan-400">
              <span>Start Solving</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action Card 2: Take Mock Interview */}
          <div
            onClick={() => setActiveTab('mock-interview')}
            className={`group p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-5 hover:-translate-y-1.5 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200 hover:border-emerald-400'
                : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/60'
            }`}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 w-fit">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-emerald-300 transition-colors">
                Take Mock Interview
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Experience real-time AI technical viva sessions with feedback.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono font-bold text-emerald-400">
              <span>Begin Session</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action Card 3: Explore Roadmaps */}
          <div
            onClick={() => setActiveTab('domain-roadmaps')}
            className={`group p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-5 hover:-translate-y-1.5 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200 hover:border-purple-400'
                : 'bg-slate-900/90 border-slate-800 hover:border-purple-500/60'
            }`}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-300 w-fit">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-purple-300 transition-colors">
                Explore Roadmaps
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Step-by-step career milestones and domain skill paths.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono font-bold text-purple-400">
              <span>View Roadmaps</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action Card 4: View Practice History */}
          <div
            onClick={() => setActiveTab('history')}
            className={`group p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-5 hover:-translate-y-1.5 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200 hover:border-amber-400'
                : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/60'
            }`}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-300 w-fit">
                <History className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-amber-300 transition-colors">
                View Practice History
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Review past transcripts, solutions, and AI scores.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono font-bold text-amber-400">
              <span>View History</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. PROGRESS & RECENT HISTORY SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className={`text-xl font-extrabold tracking-wide uppercase font-mono flex items-center gap-3 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <span>Preparation Overview & History</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Metrics Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-8 sm:p-10 rounded-3xl border space-y-8 ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-slate-900/90 border-slate-800'
            }`}>
              <h3 className="text-base font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2.5">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                <span>Performance Metrics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Metric 1 */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Questions Solved</span>
                  <span className="text-4xl font-extrabold text-white block font-mono">
                    {questionsSolved}
                  </span>
                  <span className="text-xs text-slate-500 block font-sans">Verified Practice Sessions</span>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Accuracy</span>
                  <span className={`text-4xl font-extrabold block font-mono ${
                    accuracyScore > 0 ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {accuracyScore}%
                  </span>
                  <span className="text-xs text-slate-500 block font-sans">Average AI Score</span>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Weekly Progress</span>
                  <span className={`text-4xl font-extrabold block font-mono ${themeConfig.textAccentClass}`}>
                    {weeklyProgress}%
                  </span>
                  <span className="text-xs text-slate-500 block font-sans">Roadmap Target</span>
                </div>

              </div>

              {/* Progress Bar */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-400">Roadmap Target Completion</span>
                  <span className={themeConfig.textAccentClass}>{weeklyProgress}%</span>
                </div>
                <div className="w-full h-4 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${themeConfig.accentGradient} transition-all duration-500`}
                    style={{ width: `${Math.max(weeklyProgress, 4)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recently Solved Questions List */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 sm:p-10 rounded-3xl border space-y-6 h-full flex flex-col justify-between ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-slate-900/90 border-slate-800'
            }`}>
              <h3 className="text-base font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-purple-400" />
                <span>Recently Practice Log</span>
              </h3>

              {recentSessions.length === 0 ? (
                <div className="py-10 text-center space-y-3 my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 text-slate-400 border border-slate-800 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="h-7 w-7 text-slate-500" />
                  </div>
                  <h4 className="text-base font-bold text-white font-mono">No practice sessions yet</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Start practicing questions or taking mock interviews to see your logs here.
                  </p>
                  <button
                    onClick={() => setActiveTab('questionbank')}
                    className={`mt-2 px-6 py-3 rounded-xl text-xs font-mono font-bold cursor-pointer ${themeConfig.buttonClass}`}
                  >
                    Solve Questions Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSessions.slice(0, 4).map(session => (
                    <div
                      key={session.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white font-mono">{session.subjectName}</h4>
                        <p className="text-xs text-slate-400">{session.topic}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-400">{session.averageScore}%</span>
                        <span className="text-[10px] text-slate-500 block font-mono">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setActiveTab('history')}
                className="w-full py-3 text-center text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors border-t border-slate-800 pt-4 cursor-pointer"
              >
                View Full Practice History →
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
