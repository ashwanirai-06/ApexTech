import React, { useState, useEffect } from 'react';
import { Code, Terminal, Play, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp, Lock, Unlock, RotateCcw, Copy, Check, Cpu, FileCode2, Sparkles, FileCode, BookOpen, Layers, Award, Clock, HardDrive, Video, AlertTriangle, ShieldCheck } from 'lucide-react';
import { evaluateUserCode, CodeEvaluationResult } from '../utils/codeEvaluator';
import { TtsAudioPlayer } from './TtsAudioPlayer';
import { detectProblemTechnology, validateAndFormatSolution, getComprehensiveOfficialSolution, hasOfficialSolution } from '../utils/solutionValidator';

export interface TestCaseItem {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface CodePracticeWorkspaceProps {
  problemTitle: string;
  problemDescription: string;
  inputExample: string;
  outputExample: string;
  hints: string[];
  testCases: TestCaseItem[];
  solutions: any;
  onVideoClick?: (language?: 'English' | 'Hindi') => void;
}

export const CodePracticeWorkspace: React.FC<CodePracticeWorkspaceProps> = ({
  problemTitle,
  problemDescription,
  inputExample,
  outputExample,
  hints,
  testCases,
  solutions,
  onVideoClick
}) => {
  const detectedTech = detectProblemTechnology(problemTitle, '', '', problemDescription);

  const getAvailableLanguages = (): string[] => {
    if (detectedTech === 'HTML') return ['HTML', 'JavaScript'];
    if (detectedTech === 'CSS') return ['CSS', 'HTML'];
    if (detectedTech === 'JavaScript') return ['JavaScript', 'TypeScript'];
    if (detectedTech === 'React') return ['React', 'JavaScript'];
    if (detectedTech === 'SQL') return ['SQL'];
    if (detectedTech === 'Java') return ['Java'];
    if (detectedTech === 'C++') return ['C++', 'Python', 'Java'];
    if (detectedTech === 'Python') return ['Python', 'C++', 'Java'];
    return ['C++', 'Python', 'Java'];
  };

  const availableLangs = getAvailableLanguages();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(availableLangs[0]);
  const [activeTab, setActiveTab] = useState<'problem' | 'practice' | 'solution' | 'testcases'>('practice');
  
  const officialSolAvailable = hasOfficialSolution({
    title: problemTitle,
    description: problemDescription,
    solutions
  });

  // Solution lock state - Student must practice or explicitly unlock!
  const [isSolutionUnlocked, setIsSolutionUnlocked] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1); // -1 = no hint revealed
  const [copied, setCopied] = useState(false);

  // Student User Code State
  const [userCode, setUserCode] = useState<string>('');
  const [testResult, setTestResult] = useState<CodeEvaluationResult | null>(null);

  // Starter templates based on language
  const getStarterCode = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.includes('html')) {
      return `<!-- Type your HTML solution here for ${problemTitle} -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>${problemTitle}</title>\n</head>\n<body>\n  <main>\n    <h1>${problemTitle}</h1>\n    <!-- Write semantic HTML tags below -->\n  </main>\n</body>\n</html>`;
    } else if (l.includes('css')) {
      return `/* Type your CSS solution here for ${problemTitle} */\n.container {\n  /* Add layout and styling rules */\n}`;
    } else if (l.includes('react')) {
      return `// Type your React solution here for ${problemTitle}\nimport React from 'react';\n\nexport default function Component() {\n  return (\n    <div>\n      <h2>${problemTitle}</h2>\n    </div>\n  );\n}`;
    } else if (l.includes('javascript') || l.includes('js')) {
      return `// Type your JavaScript solution here for ${problemTitle}\nfunction solveProblem(inputs) {\n  // TODO: Implementation logic\n  return inputs;\n}`;
    } else if (l.includes('sql')) {
      return `-- Type your SQL query solution here for ${problemTitle}\nSELECT * FROM table_name;`;
    } else if (l.includes('python')) {
      return `# Type your Python solution here for ${problemTitle}\ndef solve_problem(inputs):\n    # TODO: Start coding here\n    pass`;
    } else if (l.includes('java')) {
      return `// Type your Java solution here for ${problemTitle}\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // TODO: Start coding here\n    }\n}`;
    } else {
      return `// Type your C++ solution here for ${problemTitle}\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    void solveProblem() {\n        // TODO: Start coding here\n    }\n};`;
    }
  };

  // Reset user code to starter template
  useEffect(() => {
    const langs = getAvailableLanguages();
    const initialLang = langs.includes(selectedLanguage) ? selectedLanguage : langs[0];
    if (initialLang !== selectedLanguage) {
      setSelectedLanguage(initialLang);
    }
    setUserCode(getStarterCode(initialLang));
    setTestResult(null);
    setIsSolutionUnlocked(false);
    setActiveHintIndex(-1);
  }, [problemTitle, selectedLanguage]);

  const handleResetUserCode = () => {
    setUserCode(getStarterCode(selectedLanguage));
    setTestResult(null);
  };

  // Get official reference solution
  const getReferenceSolution = (): string => {
    const result = validateAndFormatSolution(
      solutions,
      selectedLanguage,
      problemTitle,
      '',
      '',
      problemDescription
    );
    return result.solutionText;
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(getReferenceSolution());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSolution = () => {
    setUserCode(getReferenceSolution());
    setTestResult(null);
  };

  const handleRunCode = () => {
    const result = evaluateUserCode(
      userCode,
      selectedLanguage as any,
      testCases,
      solutions,
      problemTitle,
      problemDescription
    );

    setTestResult(result);
    setActiveTab('testcases');
  };

  return (
    <div className="space-y-4 font-mono">
      
      {/* Workspace Tabs & Language Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>💻 Practice Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('problem')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'problem'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode2 className="h-3.5 w-3.5" />
            <span>Problem Description</span>
          </button>

          {officialSolAvailable && (
            <button
              onClick={() => setActiveTab('solution')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'solution'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {isSolutionUnlocked ? <Unlock className="h-3.5 w-3.5 text-emerald-400" /> : <Lock className="h-3.5 w-3.5 text-amber-400" />}
              <span>Official Solution {isSolutionUnlocked ? '🔓' : '🔒'}</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-rose-500/30">
            <span className="text-xs text-rose-300 font-bold flex items-center gap-1 px-1.5">
              <Video className="h-3.5 w-3.5 text-rose-400" />
              <span>Watch Video Solution:</span>
            </span>
            <button
              onClick={() => onVideoClick?.('English')}
              className="px-2 py-1 text-[11px] font-mono font-bold rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-all cursor-pointer flex items-center gap-1"
              title="Watch English Educator Video Solution"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => onVideoClick?.('Hindi')}
              className="px-2 py-1 text-[11px] font-mono font-bold rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-all cursor-pointer flex items-center gap-1"
              title="Watch Hindi Educator Video Solution"
            >
              🇮🇳 Hindi
            </button>
          </div>

          <button
            onClick={() => setActiveTab('testcases')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'testcases'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Test Results {testResult ? (testResult.passed ? '✅' : '❌') : ''}</span>
          </button>
        </div>

        {/* Language Selection Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-1">Lang:</span>
          {availableLangs.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: PRACTICE CODE EDITOR */}
      {activeTab === 'practice' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">
                  Write Your {selectedLanguage} Code below
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleLoadSolution}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-950/60 text-[11px] text-amber-300 hover:text-white transition-all cursor-pointer font-bold"
                  title="Load official reference solution into practice editor"
                >
                  <FileCode className="h-3 w-3" />
                  <span>Load Official Code</span>
                </button>

                <button
                  onClick={handleResetUserCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-[11px] text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Reset to starter template"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Code</span>
                </button>

                <button
                  onClick={handleRunCode}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>Run & Submit Code</span>
                </button>
              </div>
            </div>

            {/* Code Input Textarea */}
            <div className="relative">
              <textarea
                value={userCode}
                onChange={e => setUserCode(e.target.value)}
                rows={14}
                spellCheck={false}
                className="w-full p-4 bg-slate-950 text-xs font-mono text-cyan-300 focus:outline-none leading-relaxed resize-none scrollbar-thin selection:bg-cyan-900"
                placeholder="Start typing your algorithm logic here..."
              />
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Student Practice Rule:</strong> Try implementing the solution on your own first! Click <strong>Run & Submit Code</strong> to test logic against sample inputs.
              </span>
            </div>

            <button
              onClick={() => {
                if (activeHintIndex < hints.length - 1) {
                  setActiveHintIndex(prev => prev + 1);
                }
                setActiveTab('problem');
              }}
              className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/40 text-amber-300 font-bold hover:bg-amber-900/60 transition-all shrink-0 cursor-pointer"
            >
              💡 Need a Hint? ({activeHintIndex + 1}/{hints.length})
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PROBLEM DESCRIPTION */}
      {activeTab === 'problem' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              📝 Question Audio & Bilingual Text
            </h3>

            {/* AI Audio Synthesizer */}
            <TtsAudioPlayer
              englishText={`${problemTitle}: ${problemDescription}`}
              hindiText={`यह प्रश्न ${problemTitle} के बारे में है। ${problemDescription}`}
              title="Question Audio Narrator"
            />

            {/* Bilingual Display Box */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 text-xs">
                <span className="font-bold text-cyan-300 block mb-1 font-mono">🇺🇸 English Question:</span>
                <p className="text-slate-200 font-sans leading-relaxed font-medium">{problemTitle}: {problemDescription}</p>
              </div>

              <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-950/20 text-xs">
                <span className="font-bold text-amber-300 block mb-1 font-mono">🇮🇳 हिन्दी प्रश्न विवरण (Hindi Translation):</span>
                <p className="text-slate-200 font-sans leading-relaxed font-medium">
                  प्रश्न: {problemTitle}। विवरण: {problemDescription}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 font-mono text-[11px]">
                <span className="text-slate-400 font-bold block mb-1">Sample Input:</span>
                <code className="text-cyan-300">{inputExample}</code>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 font-mono text-[11px]">
                <span className="text-slate-400 font-bold block mb-1">Expected Output:</span>
                <code className="text-emerald-400">{outputExample}</code>
              </div>
            </div>
          </div>

          {/* Progressive Hints Section */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400" />
                <span>Progressive Hints for Students</span>
              </h4>
              <span className="text-[10px] text-amber-400/80">
                Revealed {activeHintIndex + 1} of {hints.length} hints
              </span>
            </div>

            {hints.map((hint, idx) => {
              const isRevealed = idx <= activeHintIndex;
              return (
                <div key={idx} className="rounded-lg border border-amber-500/20 bg-slate-950/80 overflow-hidden">
                  {isRevealed ? (
                    <div className="p-3 text-xs text-slate-200 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">{idx + 1}.</span>
                      <p className="leading-relaxed">{hint}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveHintIndex(idx)}
                      className="w-full p-2.5 px-3 flex items-center justify-between text-left text-xs font-bold text-slate-400 hover:text-amber-300 hover:bg-amber-950/30 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-amber-400/70" />
                        <span>Unlock Hint #{idx + 1}</span>
                      </span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL SOLUTION (LOCKED DEFAULT) */}
      {activeTab === 'solution' && (() => {
        const fullSol = getComprehensiveOfficialSolution({
          title: problemTitle,
          category: 'DSA',
          description: problemDescription,
          inputExample,
          outputExample,
          hints,
          solutions
        }, selectedLanguage);

        return (
          <div className="space-y-4">
            {!isSolutionUnlocked ? (
              <div className="p-8 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-center space-y-4">
                <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30 w-16 h-16 mx-auto flex items-center justify-center">
                  <Lock className="h-8 w-8 text-amber-400" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-base font-bold text-white font-mono">
                    Practice Mode Active: Try First!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    To build real coding skills for engineering placements, try writing your algorithm in the <strong>Practice Editor</strong> or unlocking hints before viewing the answer.
                  </p>
                </div>

                <button
                  onClick={() => setIsSolutionUnlocked(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20 inline-flex items-center gap-2 font-mono"
                >
                  <Unlock className="h-4 w-4" />
                  <span>I Tried! Reveal Official {selectedLanguage} Solution</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 font-mono">
                {/* 1. Problem Explanation & 2. Recommended Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-cyan-400" /> 1. Problem Explanation
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                      {fullSol.problemExplanation}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="h-4 w-4 text-purple-400" /> 2. Recommended Approach
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                      {fullSol.recommendedApproach}
                    </p>
                  </div>
                </div>

                {/* 3. Step-by-step Answer / Code Solution */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-200">
                        3. Step-by-Step {selectedLanguage} Reference Solution
                      </span>
                    </div>

                    <button
                      onClick={handleCopySolution}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed selection:bg-cyan-900 max-h-[440px]">
                    <code>{fullSol.stepByStepCode}</code>
                  </pre>
                </div>

                {/* 4. Key Points & 5. Interview Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2.5">
                    <h4 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                      <Award className="h-4 w-4 text-emerald-400" /> 4. Key Takeaways & Logic Invariants
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                      {fullSol.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2.5">
                    <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400" /> 5. FAANG / MNC Interviewer Tips
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                      {fullSol.interviewTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Time & 7. Space Complexity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-900/60 text-cyan-400 border border-cyan-500/40 shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">6. Time Complexity</span>
                      <span className="text-xs font-bold text-white font-mono">{fullSol.timeComplexity}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-950/20 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-900/60 text-purple-400 border border-purple-500/40 shrink-0">
                      <HardDrive className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">7. Space Complexity</span>
                      <span className="text-xs font-bold text-white font-mono">{fullSol.spaceComplexity}</span>
                    </div>
                  </div>
                </div>

                {/* Bilingual AI Audio Model Response */}
                <div className="pt-2">
                  <TtsAudioPlayer
                    englishText={fullSol.englishAnswer}
                    hindiText={fullSol.hindiExplanation}
                    title="Bilingual Model Response Audio & Text"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* TAB 4: TEST CASES & AI CODING JUDGE RESULT */}
      {activeTab === 'testcases' && (
        <div className="space-y-4 font-mono">
          {testResult ? (
            <div className="space-y-4">
              {/* Overall Status Banner */}
              <div className={`p-4.5 rounded-xl border text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg ${
                testResult.status === 'Accepted ✅'
                  ? 'border-emerald-500/50 bg-gradient-to-r from-emerald-950/80 to-slate-950 text-emerald-300 shadow-emerald-950/50'
                  : testResult.status === 'Solution works but can be optimized.'
                  ? 'border-amber-500/50 bg-gradient-to-r from-amber-950/80 to-slate-950 text-amber-300 shadow-amber-950/50'
                  : 'border-rose-500/50 bg-gradient-to-r from-rose-950/80 to-slate-950 text-rose-300 shadow-rose-950/50'
              }`}>
                <div className="flex items-center gap-3">
                  {testResult.status === 'Accepted ✅' ? (
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <ShieldCheck className="h-6 w-6 shrink-0" />
                    </div>
                  ) : testResult.status === 'Solution works but can be optimized.' ? (
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <AlertTriangle className="h-6 w-6 shrink-0" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      <XCircle className="h-6 w-6 shrink-0" />
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <div className="text-sm font-extrabold flex items-center gap-2">
                      <span>{testResult.status}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-normal">
                        Passed {testResult.totalPassed} / {testResult.totalCases} Test Cases
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90 leading-relaxed font-sans">{testResult.message}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold hover:bg-slate-800 transition-all shrink-0 cursor-pointer"
                >
                  ✏️ Modify Code
                </button>
              </div>

              {/* AI Coding Judge Detailed Analysis Box */}
              {testResult.aiFeedback && (
                <div className={`p-4 rounded-xl border space-y-3 font-sans ${
                  testResult.status === 'Accepted ✅'
                    ? 'border-emerald-500/30 bg-slate-950'
                    : testResult.status === 'Solution works but can be optimized.'
                    ? 'border-amber-500/30 bg-slate-950'
                    : 'border-rose-500/30 bg-slate-950'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-cyan-300">
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <span>🤖 AI Coding Judge Execution Feedback</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Strict Compiler & Logic Evaluator</span>
                  </div>

                  {testResult.aiFeedback.whatIsWrong && (
                    <div className="p-3 rounded-lg border border-rose-500/20 bg-rose-950/20 text-xs text-slate-200 space-y-1">
                      <span className="font-bold text-rose-300 font-mono block">⚠️ What is Wrong:</span>
                      <p className="leading-relaxed">{testResult.aiFeedback.whatIsWrong}</p>
                    </div>
                  )}

                  {testResult.aiFeedback.whichConditionFails && (
                    <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-950/20 text-xs text-slate-200 space-y-1">
                      <span className="font-bold text-amber-300 font-mono block">🔍 Which Condition Fails:</span>
                      <p className="leading-relaxed font-mono text-[11px] text-amber-200">{testResult.aiFeedback.whichConditionFails}</p>
                    </div>
                  )}

                  {testResult.aiFeedback.whyLogicFails && (
                    <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-200 space-y-1">
                      <span className="font-bold text-slate-300 font-mono block">💡 Why Logic Fails:</span>
                      <p className="leading-relaxed">{testResult.aiFeedback.whyLogicFails}</p>
                    </div>
                  )}

                  {testResult.aiFeedback.howToImprove && (
                    <div className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs text-slate-200 space-y-1">
                      <span className="font-bold text-cyan-300 font-mono block">🚀 How to Improve:</span>
                      <p className="leading-relaxed whitespace-pre-line">{testResult.aiFeedback.howToImprove}</p>
                    </div>
                  )}

                  {testResult.aiFeedback.optimizationAdvice && (
                    <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-950/20 text-xs text-slate-200 space-y-2">
                      <span className="font-bold text-amber-300 font-mono block">⚡ Optimization Analysis:</span>
                      <p className="leading-relaxed">{testResult.aiFeedback.optimizationAdvice}</p>
                      {testResult.aiFeedback.currentComplexity && (
                        <div className="flex items-center gap-4 text-[11px] font-mono text-amber-400/90 pt-1">
                          <span>Current Time: <strong>{testResult.aiFeedback.currentComplexity.time}</strong></span>
                          <span>Target Time: <strong>{testResult.aiFeedback.optimalComplexity?.time}</strong></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Test Cases Breakdown (Sample, Hidden & Edge Cases) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>🧪 Test Suite Execution Breakdown ({testResult.details.length} Test Cases)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Sample + Hidden + Edge Cases</span>
                </h4>

                {testResult.details.map((res) => (
                  <div
                    key={res.id}
                    className={`p-3.5 rounded-xl border bg-slate-950 space-y-2 font-mono ${
                      res.passed ? 'border-slate-800' : 'border-rose-500/40 bg-rose-950/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">Test Case #{res.id}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          res.type === 'sample'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : res.type === 'hidden'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {res.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">({res.description})</span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{res.runtime}</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          res.passed
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {res.passed ? 'PASSED ✅' : 'FAILED ❌'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 font-bold block mb-0.5">Input:</span>
                        <code className="text-cyan-300 break-all">{res.input}</code>
                      </div>

                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 font-bold block mb-0.5">Expected Output:</span>
                        <code className="text-emerald-400 break-all">{res.expected}</code>
                      </div>

                      <div className={`p-2 rounded border ${
                        res.passed ? 'bg-slate-900/80 border-slate-800' : 'bg-rose-950/40 border-rose-800/80'
                      }`}>
                        <span className="text-slate-400 font-bold block mb-0.5">Your Output:</span>
                        <code className={res.passed ? "text-emerald-400 break-all" : "text-rose-300 font-bold break-all"}>
                          {res.actual}
                        </code>
                      </div>
                    </div>

                    {!res.passed && res.failureReason && (
                      <div className="p-2.5 rounded-lg border border-rose-800/60 bg-rose-950/40 text-[11px] text-rose-200">
                        <span className="font-bold text-rose-300 block mb-0.5">Reason of Failure:</span>
                        <p className="leading-relaxed">{res.failureReason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-3 font-mono">
              <Cpu className="h-8 w-8 text-cyan-400 mx-auto" />
              <p className="text-xs text-slate-300">
                Go to the <strong className="text-cyan-300">Practice Editor</strong> tab and click <strong className="text-emerald-400">"Run & Submit Code"</strong> to run tests.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
