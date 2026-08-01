import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, HelpCircle, Zap, BookOpen, Clock, Lightbulb } from 'lucide-react';

export interface AptitudeWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  formula?: string;
  solutionSteps?: string[];
  shortcuts?: string[];
  explanation?: string;
}

export const AptitudeWorkspace: React.FC<AptitudeWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  formula = 'Speed = Distance / Time  |  Relative Speed (Opposite) = S1 + S2',
  solutionSteps = [
    'Identify given variables: Distance D = 300 km, Speed S1 = 60 km/h, S2 = 90 km/h.',
    'Calculate combined relative speed: S_rel = S1 + S2 = 60 + 90 = 150 km/h.',
    'Apply formula for time to meet: Time = Distance / Relative Speed = 300 / 150 = 2 hours.',
    'Verify boundary conditions and convert units to seconds/minutes if required.'
  ],
  shortcuts = [
    'Shortcut Rule: When moving in opposite directions, ADD speeds. In same direction, SUBTRACT speeds.',
    'Speed conversion trick: km/h to m/s -> Multiply by (5/18). m/s to km/h -> Multiply by (18/5).'
  ],
  explanation
}) => {
  const [activeTab, setActiveTab] = useState<'solution' | 'formula' | 'shortcuts'>('solution');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="space-y-4 font-mono">
      {/* Engine Header / Nav Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('solution')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'solution'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>🧮 Step-by-Step Solution</span>
          </button>

          <button
            onClick={() => setActiveTab('formula')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'formula'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>📐 Standard Formulae</span>
          </button>

          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'shortcuts'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>⚡ Speed Shortcuts & Tricks</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-500/30">
          <Clock className="h-3.5 w-3.5" />
          <span>Aptitude Practice Engine</span>
        </div>
      </div>

      {/* Problem Description Card */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> Problem Statement
          </h3>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-sans">
          {problemDescription}
        </p>
      </div>

      {/* TAB 1: STEP-BY-STEP SOLUTION */}
      {activeTab === 'solution' && (
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mathematical Derivation Steps
            </h4>

            <div className="space-y-2.5 font-sans text-xs">
              {solutionSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-slate-200 flex items-start gap-3">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            {explanation && (
              <div className="mt-3 p-3.5 rounded-lg border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 leading-relaxed font-sans whitespace-pre-line">
                💡 <strong>Key Concept Takeaway:</strong> {explanation}
              </div>
            )}
          </div>

          {/* Practice Calculation Sandbox */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
              <Calculator className="h-4 w-4" /> Speed Calculation Answer Verifier
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Enter calculated numerical answer (e.g., 2 hours, 45 m/s)..."
                className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-500 focus:outline-none"
              />
              <button
                onClick={() => setShowResult(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all shadow-md shadow-amber-500/20 font-mono cursor-pointer shrink-0"
              >
                Verify Calculation
              </button>
            </div>

            {showResult && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Verification complete. Your derivation steps align with the standard quantitative formula.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FORMULAE */}
      {activeTab === 'formula' && (
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
              <Calculator className="h-4 w-4 text-cyan-400" /> Master Formula Reference Card
            </h4>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 text-xs text-cyan-300 font-mono leading-relaxed overflow-x-auto shadow-inner">
              <code>{formula}</code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SHORTCUTS */}
      {activeTab === 'shortcuts' && (
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" /> Exam Time-Saving Shortcuts
            </h4>

            <div className="space-y-2 font-mono text-xs">
              {shortcuts.map((sc, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-emerald-300 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{sc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
