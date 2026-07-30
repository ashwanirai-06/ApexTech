import React from 'react';
import { InteractiveMascot } from '../components/InteractiveMascot';
import { Mic, BookOpen, Map, Calendar, Video, Code2, BarChart3, Target, ArrowRight, CheckCircle, Sparkles, Terminal } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  const features = [
    { icon: Terminal, title: 'DSA Practice Sheets', desc: '450+ curated Striver, PW, CodeChef & Alpha questions with test cases and optimal C++ templates.' },
    { icon: Video, title: 'Top Educator Masterclasses', desc: 'Direct topic videos from Striver, Gate Smashers, CodeWithHarry, and Love Babbar embedded in-app.' },
    { icon: Map, title: 'Targeted Tech Roadmaps', desc: 'Milestone timelines customized for your target score, exam dates, and daily study hours.' },
    { icon: Code2, title: 'AI Code Reviewer', desc: 'Instant complexity analysis and optimization suggestions for C++, Java, Python, and JavaScript.' },
    { icon: Mic, title: 'AI Technical Mock Practice', desc: 'Interactive AI-driven interview and oral technical drills to build core confidence.' },
    { icon: BarChart3, title: 'Performance Analytics', desc: 'Comprehensive domain progress tracking, score breakdown, and weakness diagnostics.' },
    { icon: Target, title: 'AI Weak Topic Practice', desc: 'Automatic detection of low-accuracy concepts with targeted revision drills.' },
    { icon: Calendar, title: 'Smart Study Planner', desc: 'Custom daily study schedules organized by technical topic priorities.' }
  ];

  return (
    <div className="min-h-screen bg-[#020204] text-slate-300 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-5xl text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-bold font-mono text-cyan-300 uppercase tracking-widest mb-6">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>🚀 Tech Domain Mastery & DSA Career Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-mono">
            Apex<span className="text-cyan-400">Tech</span> ⚡
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-cyan-300 tracking-wide font-sans">
            DSA Sheets, System Design & Technical Mastery Hub 🎓
          </p>

          <p className="mt-4 mx-auto max-w-3xl text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            Master Data Structures & Algorithms, Full Stack Web Development, Artificial Intelligence, and System Design with top educator video masterclasses, interactive problem solvers, and AI code analysis.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all font-mono"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onLogin}
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all font-mono"
            >
              Existing Account Login
            </button>
          </div>

        </div>

        {/* Interactive AI Mascot Hero Display */}
        <div className="mt-14 mx-auto max-w-4xl">
          <div className="border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 rounded-3xl shadow-2xl shadow-cyan-950/40 backdrop-blur-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            
            <div className="flex-shrink-0 relative">
              <InteractiveMascot focusedField={null} showPassword={false} textLength={0} />
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Meet Your Interactive AI Tech Mascot
              </div>
              <h3 className="text-xl font-bold font-mono text-white">
                ApexTech Companion — Always Guiding Your Progress
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                Your AI study companion guides you through DSA problem solving, recommends verified educator videos, protects your security with interactive eye tracking, and analyzes weak topics.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="text-[11px] font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300">🐶 Reactive Pupils & Eye Tracking</span>
                <span className="text-[11px] font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300">⚡ 100% Tech Ready Analytics</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
            Comprehensive Tech Platform
          </h2>
          <p className="mt-1 text-2xl font-bold text-white tracking-tight">
            Everything you need for DSA, Web Dev, System Design & AI
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/15 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Pipeline Showcase */}
      <section className="border-t border-white/10 bg-[#050508] px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#050508] p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-center text-white tracking-tight mb-6 font-mono">
            Structured Technical Engineering Progression Pipeline
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 text-center">
            {['DSA Basics', 'Arrays & Strings', 'Binary Search', 'Trees & Graphs', 'System Design', 'Web Stack', 'AI Models', '100% Ready'].map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                <div className="text-[10px] font-mono font-bold text-cyan-400 mb-1">0{idx + 1}</div>
                <div className="text-xs font-bold text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
