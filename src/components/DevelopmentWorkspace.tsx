import React, { useState } from 'react';
import { Code, FileCode2, Sparkles, Copy, Check, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

export interface DevelopmentWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  mode?: 'JavaScript' | 'React';
  codeSnippets?: {
    jsTs?: string;
    reactNode?: string;
    output?: string;
  };
  explanation?: string;
  edgeCases?: string[];
  bestPractices?: string[];
}

export const DevelopmentWorkspace: React.FC<DevelopmentWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  mode = 'JavaScript',
  codeSnippets = {
    jsTs: `// JavaScript ES6+ Implementation for ${problemTitle}
function solveProblem(inputs) {
  if (!inputs) return null;
  console.log('Executing JS logic for ${problemTitle}');
  return { success: true, data: inputs };
}

module.exports = { solveProblem };`,
    reactNode: `// React Functional Component / Custom Hook Pattern for ${problemTitle}
import React, { useState, useEffect, useMemo } from 'react';

export function InteractiveComponent({ initialData }: { initialData?: any }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const computedValue = useMemo(() => {
    return data ? Object.keys(data).length : 0;
  }, [data]);

  useEffect(() => {
    console.log('Component mounted for ${problemTitle}');
  }, []);

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-cyan-300">
      <h3>${problemTitle}</h3>
      <p>Computed Keys: {computedValue}</p>
    </div>
  );
}`,
    output: `// Console Output Execution:
> solveProblem({ id: 101, name: "Sample Input" });
> Output: { success: true, data: { id: 101, name: "Sample Input" } }
> Execution completed in 1.2ms.`
  },
  explanation,
  edgeCases = [
    'Null or undefined input values leading to runtime TypeError crashes.',
    'Asynchronous race conditions when multiple promises resolve out of order.',
    'Memory leaks caused by uncleaned event listeners or interval timers.',
    'Unintended closure variable mutation in looping constructs.'
  ],
  bestPractices = [
    'Always use immutable state updates in React to prevent silent re-render bugs.',
    'Memoize expensive sub-computations with useMemo and callbacks with useCallback.',
    'Keep state flat and lift shared state up to the nearest common ancestor.',
    'Ensure cleanup functions are returned in useEffect for subscriptions/timers.'
  ]
}) => {
  const isReact = mode === 'React' || problemTitle.toLowerCase().includes('react');
  const [activeTab, setActiveTab] = useState<'explanation' | 'code' | 'output' | 'edgecases'>('explanation');
  const [copied, setCopied] = useState(false);

  const currentCode = isReact 
    ? (codeSnippets.reactNode || codeSnippets.jsTs || '') 
    : (codeSnippets.jsTs || codeSnippets.reactNode || '');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Workspace Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'explanation'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode2 className="h-4 w-4" />
            <span>📖 {isReact ? 'React Architecture Explanation' : 'JS Concept Explanation'}</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="h-4 w-4" />
            <span>💻 {isReact ? 'Hook / Component Example' : 'Code Example'}</span>
          </button>

          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'output'
                ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>⚡ {isReact ? 'Best Practices' : 'Console Output'}</span>
          </button>

          <button
            onClick={() => setActiveTab('edgecases')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'edgecases'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>⚠️ {isReact ? 'Re-render & Lifecycle Edge Cases' : 'Edge Cases'}</span>
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
        </button>
      </div>

      {/* TAB: EXPLANATION */}
      {activeTab === 'explanation' && (
        <div className="space-y-4 font-sans">
          <div className="p-6 rounded-3xl border border-cyan-500/30 bg-slate-950 space-y-4 shadow-xl">
            <h3 className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <span>{isReact ? 'React Component & Hook Architecture' : 'JavaScript Core Concept Explanation'}</span>
            </h3>

            <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900 p-4 rounded-2xl border border-slate-800">
              {explanation || problemDescription}
            </p>

            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold block">💡 Problem Context & Overview:</span>
              <p className="text-slate-300 leading-relaxed font-sans">{problemDescription}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CODE EXAMPLE */}
      {activeTab === 'code' && (
        <div className="space-y-3 font-mono">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{isReact ? 'React Functional Component Implementation' : 'JavaScript Solution Implementation'}</span>
              <span className="text-emerald-400 font-bold">ES6+ Standard</span>
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed selection:bg-cyan-900 max-h-[440px]">
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB: OUTPUT / BEST PRACTICES */}
      {activeTab === 'output' && (
        <div className="space-y-4 font-mono">
          <div className="p-6 rounded-3xl border border-purple-500/30 bg-slate-950 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              {isReact ? <Sparkles className="h-4 w-4 text-purple-400" /> : <Terminal className="h-4 w-4 text-purple-400" />}
              <span>{isReact ? 'React Production Best Practices' : 'Expected Console Execution & Output'}</span>
            </h3>

            {isReact ? (
              <div className="space-y-2.5 font-sans text-xs">
                {bestPractices.map((bp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bp}</span>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-amber-300 overflow-x-auto leading-relaxed">
                <code>{codeSnippets.output || `// Output Execution for ${problemTitle}\n> Expected Result Verified.`}</code>
              </pre>
            )}
          </div>
        </div>
      )}

      {/* TAB: EDGE CASES */}
      {activeTab === 'edgecases' && (
        <div className="space-y-4 font-sans">
          <div className="p-6 rounded-3xl border border-amber-500/30 bg-slate-950 space-y-4 shadow-xl">
            <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>{isReact ? 'Re-render, State Mutation & Lifecycle Edge Cases' : 'Critical Edge Cases & Potential Traps'}</span>
            </h3>

            <div className="space-y-2.5 font-sans text-xs">
              {edgeCases.map((ec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0">⚠️</span>
                  <span className="leading-relaxed">{ec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
