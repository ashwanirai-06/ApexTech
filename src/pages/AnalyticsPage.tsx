import React, { useEffect, useState } from 'react';
import { AnalyticsSummary } from '../types';
import { DBService } from '../db/dbService';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { BarChart3, TrendingUp, Award, Zap, Flame, ShieldAlert } from 'lucide-react';

export const AnalyticsPage: React.FC<{ userId: string }> = ({ userId }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    DBService.getAnalytics(userId).then(setAnalytics);
  }, [userId]);

  if (!analytics) return null;

  const subjectData = [
    { name: 'Data Struct (KCS301)', score: 85 },
    { name: 'DBMS (KCS501)', score: 78 },
    { name: 'OS (KCS401)', score: 82 },
    { name: 'COA (KCS302)', score: 70 },
    { name: 'Algorithm (KCS502)', score: 88 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300 mb-1">
            <BarChart3 className="h-3.5 w-3.5 text-cyan-400" />
            <span>SQLite Analytics Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white font-mono">
            Performance & AI Readiness Insights
          </h1>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Total Sessions</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{analytics.totalVivaSessions}</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Average Score</div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">{analytics.averageScore}%</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Best Performance</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{analytics.bestScore}%</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">AI Readiness</div>
          <div className="text-2xl font-bold font-mono text-purple-400 mt-1">{analytics.aiReadinessScore}%</div>
        </div>
      </div>

      {/* Charts Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Trend Area Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-xs font-bold text-slate-300 font-mono mb-4">Viva Accuracy Trend</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.scoreTrends}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Skills Breakdown Radar Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-xs font-bold text-slate-300 font-mono mb-4">Domain & Coding Skills Breakdown</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                { subject: 'DSA & Algorithms', A: 92, fullMark: 100 },
                { subject: 'System Design', A: 85, fullMark: 100 },
                { subject: 'Full Stack', A: 88, fullMark: 100 },
                { subject: 'CS Fundamentals', A: 80, fullMark: 100 },
                { subject: 'Problem Solving', A: 95, fullMark: 100 }
              ]}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                <Radar name="Student Proficiency" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
