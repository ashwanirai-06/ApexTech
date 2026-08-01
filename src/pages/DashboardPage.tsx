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
  Play
} from 'lucide-react';

interface DashboardPageProps {
  user: User;
  setActiveTab: (tab: string) => void;
  onSelectSubjectForViva: (subjectCode: string, topic?: string) => void;
  onSelectCompany?: (company: string) => void;
}

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

  // Greeting behavior: Welcome, User vs Welcome back, User
  const isNewUser = analytics.totalVivaSessions === 0;
  const firstName = user.fullName.split(' ')[0] || user.fullName;
  const greetingText = isNewUser ? `Welcome, ${firstName} 👋` : `Welcome back, ${firstName} 👋`;

  // Calculated metrics
  const questionsSolved = isNewUser ? 0 : analytics.totalVivaSessions;
  const accuracyScore = isNewUser ? 0 : Math.round(analytics.averageScore || 0);
  const weeklyProgress = isNewUser ? 0 : Math.min(100, Math.round(analytics.roadmapProgress || 0));

  // Required Top Companies
  const topCompanies = [
    { name: 'Google', icon: '🌐', color: 'border-blue-500/30 bg-blue-950/20 text-blue-300' },
    { name: 'Amazon', icon: '📦', color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' },
    { name: 'Meta', icon: '♾️', color: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300' },
    { name: 'Microsoft', icon: '💻', color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300' },
    { name: 'Apple', icon: '🍎', color: 'border-slate-500/30 bg-slate-900/40 text-slate-200' },
    { name: 'Uber', icon: '🚗', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' },
    { name: 'Netflix', icon: '🍿', color: 'border-rose-500/30 bg-rose-950/20 text-rose-300' }
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
    <div className="space-y-10 max-w-7xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP SECTION: WELCOME BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 shadow-xl backdrop-blur-xl transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : `${themeConfig.cardBgClass} ${themeConfig.borderClass} text-white`
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-bold ${themeConfig.badgeClass}`}>
              <Sparkles className="h-4 w-4" />
              <span>AI Tech Preparation Engine</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
              {greetingText}
            </h1>
            
            <p className="text-base text-slate-400 font-medium max-w-xl leading-relaxed">
              Continue your preparation journey.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => setActiveTab('questionbank')}
              className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all shadow-lg cursor-pointer ${themeConfig.buttonClass}`}
            >
              <Terminal className="h-5 w-5" />
              <span>Browse Questions</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. START YOUR PREPARATION SECTION */}
      <div className="space-y-5">
        <h2 className={`text-lg font-extrabold tracking-wide uppercase font-mono flex items-center gap-2.5 ${
          isLight ? 'text-slate-800' : 'text-slate-200'
        }`}>
          <Zap className={`h-5 w-5 ${themeConfig.textAccentClass}`} />
          <span>Start Your Preparation</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: DSA Practice */}
          <div
            onClick={() => setActiveTab('dsa')}
            className={`group p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md ${
              isLight
                ? 'bg-white border-slate-200 hover:border-cyan-400'
                : `${themeConfig.cardBgClass} ${themeConfig.borderClass} hover:border-cyan-500/60`
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300">
                  <Terminal className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800">
                  SDE Sheet
                </span>
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors">
                DSA Practice Sheet
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Master 180+ topic-wise coding problems covering Arrays, Graphs, DP & Trees.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs font-mono font-bold text-cyan-400">
              <span>Start Solving</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Question Bank */}
          <div
            onClick={() => setActiveTab('questionbank')}
            className={`group p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md ${
              isLight
                ? 'bg-white border-slate-200 hover:border-purple-400'
                : `${themeConfig.cardBgClass} ${themeConfig.borderClass} hover:border-purple-500/60`
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300">
                  <Layers className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-800">
                  2000+ Questions
                </span>
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-purple-300 transition-colors">
                Question Bank
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Complete solutions with dry runs, complexity analysis & video explanations.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs font-mono font-bold text-purple-400">
              <span>Explore Bank</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: AI Technical Viva */}
          <div
            onClick={() => setActiveTab('mock-interview')}
            className={`group p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md ${
              isLight
                ? 'bg-white border-slate-200 hover:border-emerald-400'
                : `${themeConfig.cardBgClass} ${themeConfig.borderClass} hover:border-emerald-500/60`
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Interactive AI
                </span>
              </div>
              <h3 className="text-xl font-bold font-sans text-white group-hover:text-emerald-300 transition-colors">
                AI Mock Interview
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Simulate realistic technical viva interviews with real-time feedback.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs font-mono font-bold text-emerald-400">
              <span>Begin Session</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. TOP COMPANIES SECTION */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-extrabold tracking-wide uppercase font-mono flex items-center gap-2.5 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <Building2 className={`h-5 w-5 ${themeConfig.textAccentClass}`} />
            <span>Top Companies</span>
          </h2>
          <button
            onClick={() => setActiveTab('questionbank-company')}
            className={`text-xs font-mono font-bold ${themeConfig.textAccentClass} hover:underline cursor-pointer`}
          >
            View All Companies →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {topCompanies.map(comp => (
            <button
              key={comp.name}
              onClick={() => handleCompanyClick(comp.name)}
              className={`p-5 rounded-3xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 shadow-md ${comp.color}`}
            >
              <span className="text-3xl">{comp.icon}</span>
              <span className="text-sm font-extrabold font-mono">{comp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. PROGRESS SECTION */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-extrabold tracking-wide uppercase font-mono flex items-center gap-2.5 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <span>Progress Section</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Metrics Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-8 rounded-3xl border space-y-6 ${
              isLight
                ? 'bg-white border-slate-200'
                : `${themeConfig.cardBgClass} ${themeConfig.borderClass}`
            }`}>
              <h3 className="text-base font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                <span>Preparation Overview</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Metric 1: Questions Solved */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Questions Solved</span>
                  <span className="text-3xl font-extrabold text-white block font-mono">
                    {questionsSolved}
                  </span>
                  <span className="text-[11px] text-slate-500 font-sans block">Verified Solutions</span>
                </div>

                {/* Metric 2: Accuracy */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Accuracy</span>
                  <span className={`text-3xl font-extrabold block font-mono ${
                    accuracyScore > 0 ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {accuracyScore}%
                  </span>
                  <span className="text-[11px] text-slate-500 font-sans block">Evaluation Average</span>
                </div>

                {/* Metric 3: Weekly Progress */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Weekly Progress</span>
                  <span className={`text-3xl font-extrabold block font-mono ${themeConfig.textAccentClass}`}>
                    {weeklyProgress}%
                  </span>
                  <span className="text-[11px] text-slate-500 font-sans block">Roadmap Target</span>
                </div>

              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Roadmap Completion</span>
                  <span className={`font-bold ${themeConfig.textAccentClass}`}>{weeklyProgress}%</span>
                </div>
                <div className="w-full h-3.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
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
            <div className={`p-8 rounded-3xl border space-y-5 h-full flex flex-col justify-between ${
              isLight
                ? 'bg-white border-slate-200'
                : `${themeConfig.cardBgClass} ${themeConfig.borderClass}`
            }`}>
              <h3 className="text-base font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <span>Recently Solved Questions</span>
              </h3>

              {recentSessions.length === 0 ? (
                <div className="py-8 text-center space-y-3 my-auto">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-slate-400 border border-slate-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono">No recent sessions yet</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Start your preparation journey to see your recently completed questions here.
                  </p>
                  <button
                    onClick={() => setActiveTab('questionbank')}
                    className={`mt-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${themeConfig.buttonClass}`}
                  >
                    Solve Questions Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSessions.slice(0, 4).map(session => (
                    <div
                      key={session.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-white font-mono">{session.subjectName}</h4>
                        <p className="text-xs text-slate-400">{session.topic}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400">{session.averageScore}%</span>
                        <span className="text-[10px] text-slate-500 block font-mono">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setActiveTab('history')}
                className="w-full py-2.5 text-center text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors border-t border-slate-800/60 pt-4 cursor-pointer"
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
