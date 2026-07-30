import React, { useEffect, useState } from 'react';
import { User, AnalyticsSummary } from '../types';
import { DBService } from '../db/dbService';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { FEATURED_TOPIC_VIDEOS, TopicVideoInfo } from '../utils/videoUtils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Mic,
  Map,
  Video,
  Code2,
  BarChart3,
  Flame,
  Zap,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Terminal,
  Compass,
  Play,
  CheckCircle2,
  Tv,
  BookOpen,
  Filter
} from 'lucide-react';

interface DashboardPageProps {
  user: User;
  setActiveTab: (tab: string) => void;
  onSelectSubjectForViva: (subjectCode: string, topic?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, setActiveTab, onSelectSubjectForViva }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [masterclassCategory, setMasterclassCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<{
    title: string;
    youtubeId?: string;
    query?: string;
    educator?: string;
  } | null>(null);

  const refreshAnalytics = () => {
    DBService.getAnalytics(user.id).then(setAnalytics);
  };

  useEffect(() => {
    refreshAnalytics();
    window.addEventListener('apexaktu_streak_updated', refreshAnalytics);
    return () => window.removeEventListener('apexaktu_streak_updated', refreshAnalytics);
  }, [user.id]);

  if (!analytics) {
    return (
      <div className="flex h-64 items-center justify-center text-cyan-400">
        <div className="h-8 w-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#050508] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-cyan-300 mb-2 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Tech & Placement Preparation Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user.fullName} 👋
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
              Target Role: <span className="text-cyan-400 font-semibold">{user.profile?.targetRole || 'Full Stack Software Engineer'}</span> • {user.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('dsa')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all font-mono"
            >
              <Terminal className="h-4 w-4" />
              <span>Open DSA Sheets 🔥</span>
            </button>

            <button
              onClick={() => setActiveTab('domains')}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-all font-mono"
            >
              <Compass className="h-4 w-4 text-purple-400" />
              <span>Domain Roadmaps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-500/10">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-tighter flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Tech Readiness
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-serif text-cyan-400">100<span className="text-sm font-sans">%</span></span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">100% Ready</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-tighter flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            Avg Technical Score
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-serif text-white">{analytics.averageScore || 95}<span className="text-sm font-sans opacity-50">%</span></span>
            <span className="text-[10px] text-indigo-300 font-semibold bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-500/30">Top 1%</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('dsa')}
          className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/40 hover:border-cyan-500/80 flex flex-col gap-2 text-left cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/15 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-400 font-mono uppercase tracking-tighter flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              DSA Patterns
            </span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded-full border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
              Solve Sheets ⚡
            </span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-serif text-white">450+ <span className="text-sm font-sans italic opacity-50">Questions</span></span>
            <div className="flex gap-1 mb-1">
              <div className="w-1.5 h-3.5 bg-cyan-500 rounded-full"></div>
              <div className="w-1.5 h-3.5 bg-cyan-500/60 rounded-full"></div>
              <div className="w-1.5 h-3.5 bg-cyan-500/30 rounded-full"></div>
            </div>
          </div>
        </button>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 transition-all duration-300 hover:scale-[1.03] hover:border-purple-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-purple-500/10">
          <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-tighter flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-purple-400" />
            Mock Technical Drills
          </span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-serif text-white">{analytics.totalVivaSessions}</span>
            <span className="text-[10px] text-purple-300 font-semibold bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">MAANG Level</span>
          </div>
        </div>

      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Launchpad & Trend Chart */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0c14] to-[#050508] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Tech Career Launchpad</h2>
              <button onClick={() => setActiveTab('dsa')} className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium">
                <span>View All DSA Sheets</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div
                onClick={() => setActiveTab('dsa')}
                className="group cursor-pointer rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 hover:border-cyan-500/60 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider font-mono bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    DSA Sheets
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Striver, PW, CodeChef & Apna College</h3>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  Optimal patterns & video links.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('domains')}
                className="group cursor-pointer rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 hover:border-purple-500/60 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                    <Compass className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider font-mono bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-500/30">
                    Roadmaps
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Domain Specializations</h3>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  Full Stack, AI/ML, DevOps & Cloud roadmaps.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('code')}
                className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider font-mono bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    AI Review
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">AI Code Auditor</h3>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  Detect time complexity & edge cases.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('viva')}
                className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                    <Mic className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider font-mono bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Oral Viva
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">AI Technical Interviewer</h3>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  Real-time audio questions & score.
                </p>
              </div>

            </div>
          </div>

          {/* Performance Area Chart */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xs font-bold text-slate-300 font-mono mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Technical Growth & Score Trend</span>
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.scoreTrends}>
                  <defs>
                    <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#050508', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }} />
                  <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Weak Topics & Video Boost */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Weak Topics Detected</h2>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-xs text-white font-medium">Dynamic Programming: 0/1 Knapsack</span>
                <span className="text-[10px] text-red-400 bg-red-400/10 border border-red-500/20 px-2 py-0.5 rounded-full font-mono">High Priority</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-xs text-white font-medium">Graph Traversal (Kahn's Topo Sort)</span>
                <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono font-bold">Medium</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-xs text-white font-medium">System Design: Rate Limiting & Redis</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-400/10 border border-cyan-500/20 px-2 py-0.5 rounded-full font-mono">Review</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('weaks')}
              className="mt-4 w-full rounded-xl bg-amber-500/20 border border-amber-500/30 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-all font-mono"
            >
              Practice Weak Topic Drills
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/20 via-slate-900 to-rose-950/20 border border-indigo-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Tv className="h-4 w-4 text-rose-400" />
                  <span>Featured Educator Video Boost</span>
                </h2>
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  takeUforward
                </span>
              </div>

              <div 
                onClick={() => setPlayingVideo({
                  title: "Striver's 3Sum Two Pointers Pattern",
                  youtubeId: "UXDSeD9mN-k",
                  query: "Striver 3Sum Two Sum takeuforward",
                  educator: "takeUforward (Striver)"
                })}
                className="flex gap-4 items-center bg-slate-950/80 p-3 rounded-2xl border border-indigo-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-lg"
              >
                <div className="w-20 h-14 rounded-xl bg-rose-950/80 border border-rose-500/40 flex-shrink-0 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all">
                  <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center pl-0.5 shadow-lg group-hover:bg-rose-500">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">Striver's 3Sum Two Pointers</p>
                  <p className="text-[10px] text-slate-400 mb-1">takeUforward • 28:00 mins</p>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded uppercase font-bold border border-cyan-500/30 font-mono">MAANG Favorite ⚡</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setPlayingVideo({
                  title: "Striver's 3Sum Two Pointers Pattern",
                  youtubeId: "UXDSeD9mN-k",
                  query: "Striver 3Sum Two Sum takeuforward",
                  educator: "takeUforward (Striver)"
                })}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-rose-600/30 transition-all font-mono flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Watch Explanation</span>
              </button>
              <button
                onClick={() => setActiveTab('dsa')}
                className="py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-[11px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-all font-mono"
              >
                Solve Sheet
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* NEW: TOP YOUTUBE EDUCATOR MASTERCLASSES SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-rose-300 font-mono mb-1">
              <Tv className="h-3.5 w-3.5 text-rose-400" />
              <span>Top Educator YouTube Mapping</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight font-mono">
              DSA & System Design Masterclasses
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Watch curated video explanations mapped directly to technical interview topics by Striver, Love Babbar, Abdul Bari, Gate Smashers & more.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {['All', 'DSA & Placements', 'System Design & CS Core', 'Full Stack & Web Dev', 'AI & Data Science'].map(cat => (
              <button
                key={cat}
                onClick={() => setMasterclassCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  masterclassCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Masterclass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_TOPIC_VIDEOS
            .filter(v => masterclassCategory === 'All' || v.subjectOrCategory === masterclassCategory)
            .map(video => (
              <div
                key={video.id}
                className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                      👤 {video.educator}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 shrink-0">
                      ⏱️ {video.duration}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug font-mono">
                    {video.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((t, i) => (
                      <span key={i} className="text-[9px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setPlayingVideo({
                      title: video.title,
                      youtubeId: video.youtubeId,
                      query: video.query,
                      educator: video.educator
                    })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md shadow-rose-600/20"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {playingVideo && (
        <VideoPlayerModal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          videoTitle={playingVideo.title}
          youtubeId={playingVideo.youtubeId}
          videoQuery={playingVideo.query || playingVideo.title}
          educator={playingVideo.educator || 'Expert Educator'}
        />
      )}

    </div>
  );
};
