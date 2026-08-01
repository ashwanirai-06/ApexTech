import React, { useState } from 'react';
import { Layout, Code, FileCode2, Sparkles, Copy, Check, CheckCircle2, RotateCcw, Cpu } from 'lucide-react';

export interface DevelopmentWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  codeSnippets?: {
    jsTs?: string;
    reactNode?: string;
    python?: string;
  };
  explanation?: string;
  bestPractices?: string[];
}

export const DevelopmentWorkspace: React.FC<DevelopmentWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  codeSnippets = {
    jsTs: `// Modern TypeScript / ES6+ Pattern Implementation
export async function handleDataProcessing(payload: Record<string, unknown>) {
  try {
    const sanitized = Object.freeze({ ...payload });
    console.log('Processing development pipeline...', sanitized);
    return { status: 200, success: true };
  } catch (error) {
    console.error('Pipeline error:', error);
    throw new Error('Processing failed');
  }
}`,
    reactNode: `// Production React Custom Hook Pattern
import { useState, useEffect } from 'react';

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then(res => res.json())
      .then(result => {
        if (isMounted) setData(result);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading };
}`
  },
  explanation,
  bestPractices = [
    'Always sanitize and validate external payload schema before mutation.',
    'Use immutable data structures and strict TypeScript typing.',
    'Implement graceful error boundaries and logging middleware.',
    'Optimize bundle size using lazy loading and code splitting.'
  ]
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'architecture' | 'practices'>('code');
  const [selectedLang, setSelectedLang] = useState<'jsTs' | 'reactNode'>('jsTs');
  const [copied, setCopied] = useState(false);

  const currentCode = codeSnippets[selectedLang] || codeSnippets.jsTs || '';

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
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="h-4 w-4" />
            <span>💻 Full-Stack Development Snippets</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode2 className="h-4 w-4" />
            <span>🏗️ Engineering Architecture Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('practices')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'practices'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>✨ Production Best Practices</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CODE SNIPPETS */}
      {activeTab === 'code' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedLang('jsTs')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === 'jsTs'
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JavaScript / TS Module
              </button>
              <button
                onClick={() => setSelectedLang('reactNode')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === 'reactNode'
                    ? 'bg-emerald-500 text-slate-950 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                React / Node Pattern
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed selection:bg-cyan-900 max-h-[440px]">
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              📝 Full-Stack Feature Specification
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {problemDescription}
            </p>

            {explanation && (
              <div className="p-3.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                {explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BEST PRACTICES */}
      {activeTab === 'practices' && (
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" /> Web Development Engineering Guidelines
            </h4>

            <div className="space-y-2 font-mono text-xs">
              {bestPractices.map((bp, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
