import React, { useState, useEffect } from 'react';
import { Layout, Eye, Code, FileText, Sparkles, Check, Copy, RotateCcw, Play, CheckCircle2 } from 'lucide-react';

export interface HtmlCssWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  initialHtml?: string;
  initialCss?: string;
  solutionHtml?: string;
  solutionCss?: string;
  explanation?: string;
  onVideoClick?: () => void;
}

export const HtmlCssWorkspace: React.FC<HtmlCssWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  initialHtml = '<div class="card">\n  <h2>Hero Component</h2>\n  <p>Interactive HTML & CSS live preview sandbox.</p>\n  <button class="btn font-sans font-bold">Explore Feature</button>\n</div>',
  initialCss = '.card {\n  background: #0f172a;\n  color: #f8fafc;\n  padding: 24px;\n  border-radius: 12px;\n  border: 1px solid #334155;\n  font-family: system-ui, sans-serif;\n  max-width: 400px;\n}\n.card h2 {\n  margin-top: 0;\n  color: #38bdf8;\n}\n.btn {\n  background: #0284c7;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  margin-top: 12px;\n}\n.btn:hover {\n  background: #0369a1;\n}',
  solutionHtml,
  solutionCss,
  explanation
}) => {
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'explanation'>('preview');
  const [editorSubTab, setEditorSubTab] = useState<'html' | 'css'>('html');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
  }, [problemTitle, initialHtml, initialCss]);

  // Generate combined HTML for live preview iframe
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            background-color: #020617;
            color: #f8fafc;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  const handleCopyCode = () => {
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSolution = () => {
    if (solutionHtml && !solutionHtml.includes('class Solution') && !solutionHtml.includes('solveProblem()') && solutionHtml !== 'Official solution is currently unavailable for this problem.') {
      setHtmlCode(solutionHtml);
    }
    if (solutionCss && !solutionCss.includes('class Solution') && !solutionCss.includes('solveProblem()') && solutionCss !== 'Official solution is currently unavailable for this problem.') {
      setCssCode(solutionCss);
    }
  };

  const handleReset = () => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Workspace Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>🎨 Live UI Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="h-4 w-4" />
            <span>💻 HTML & CSS Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('explanation')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'explanation'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>📖 Concept & Best Practices</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {solutionHtml && (
            <button
              onClick={handleLoadSolution}
              className="px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-950/40 text-amber-300 text-xs font-bold hover:bg-amber-900/60 transition-all cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Load Official Solution</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Reset to starter code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE INTERACTIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Sparkles className="h-4 w-4" /> Real-Time Iframe Browser Renderer
            </span>
            <span>Edits in Code Editor reflect instantly here</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-[11px] font-mono text-slate-400 ml-2 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  sandbox://localhost:3000/preview
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">● Active Sandbox</span>
            </div>

            <div className="h-[360px] w-full bg-slate-950">
              <iframe
                srcDoc={srcDoc}
                title="Live UI Preview"
                sandbox="allow-scripts"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HTML & CSS CODE EDITOR */}
      {activeTab === 'editor' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditorSubTab('html')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  editorSubTab === 'html'
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HTML5 Markup
              </button>
              <button
                onClick={() => setEditorSubTab('css')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  editorSubTab === 'css'
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CSS3 Stylesheet
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All Code'}</span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            {editorSubTab === 'html' ? (
              <textarea
                value={htmlCode}
                onChange={e => setHtmlCode(e.target.value)}
                rows={14}
                spellCheck={false}
                className="w-full p-4 bg-slate-950 text-xs font-mono text-amber-300 focus:outline-none leading-relaxed resize-none scrollbar-thin selection:bg-amber-900"
                placeholder="Write HTML5 code here..."
              />
            ) : (
              <textarea
                value={cssCode}
                onChange={e => setCssCode(e.target.value)}
                rows={14}
                spellCheck={false}
                className="w-full p-4 bg-slate-950 text-xs font-mono text-cyan-300 focus:outline-none leading-relaxed resize-none scrollbar-thin selection:bg-cyan-900"
                placeholder="Write CSS3 styles here..."
              />
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CONCEPTS & BEST PRACTICES */}
      {activeTab === 'explanation' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 font-sans">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Core Frontend Concepts & Standards</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {problemDescription}
            </p>

            {explanation && (
              <div className="p-3.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs text-slate-200 leading-relaxed space-y-2 font-mono">
                <span className="text-cyan-300 font-bold block">💡 Architectural Breakdown:</span>
                <p className="whitespace-pre-line">{explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
