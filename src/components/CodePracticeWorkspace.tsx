import React, { useState, useEffect } from 'react';
import { Code, Terminal, Play, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp, Lock, Unlock, RotateCcw, Copy, Check, Cpu, FileCode2, Sparkles, FileCode } from 'lucide-react';
import { evaluateUserCode } from '../utils/codeEvaluator';

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
  solutions: {
    cpp: string;
    python: string;
    java: string;
  } | string;
  onVideoClick?: () => void;
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
  const [selectedLanguage, setSelectedLanguage] = useState<'C++' | 'Python' | 'Java'>('C++');
  const [activeTab, setActiveTab] = useState<'problem' | 'practice' | 'solution' | 'testcases'>('practice');
  
  // Solution lock state - Student must practice or explicitly unlock!
  const [isSolutionUnlocked, setIsSolutionUnlocked] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1); // -1 = no hint revealed
  const [copied, setCopied] = useState(false);

  // Student User Code State
  const [userCode, setUserCode] = useState<string>('');
  const [testResult, setTestResult] = useState<{
    executed: boolean;
    passed: boolean;
    message: string;
    details: { id: number; input: string; expected: string; actual: string; passed: boolean; runtime: string; memory: string }[];
  } | null>(null);

  // Starter templates based on language
  const getStarterCode = (lang: 'C++' | 'Python' | 'Java') => {
    if (lang === 'C++') {
      return `// Type your C++ solution here for ${problemTitle}
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    // Write your optimal algorithm logic below
    void solveProblem() {
        // TODO: Start coding here
    }
};`;
    } else if (lang === 'Python') {
      return `# Type your Python 3 solution here for ${problemTitle}
class Solution:
    def solve_problem(self, inputs):
        # TODO: Start coding here
        pass`;
    } else {
      return `// Type your Java solution here for ${problemTitle}
import java.util.*;

public class Solution {
    public void solveProblem() {
        // TODO: Start coding here
    }
}`;
    }
  };

  // Reset user code to starter template
  useEffect(() => {
    setUserCode(getStarterCode(selectedLanguage));
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
    if (typeof solutions === 'string') return solutions;
    if (selectedLanguage === 'C++') return solutions.cpp;
    if (selectedLanguage === 'Python') return solutions.python || solutions.cpp;
    if (selectedLanguage === 'Java') return solutions.java || solutions.cpp;
    return solutions.cpp;
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(getReferenceSolution());
    setCopied(true);
    setTimeout(() => setCopied(false), 5000+);
  };

  const handleLoadSolution = () => {
    setUserCode(getReferenceSolution());
    setTestResult(null);
  };

  const handleRunCode = () => {
    const result = evaluateUserCode(
      userCode,
      selectedLanguage,
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
          {(['C++', 'Python', 'Java'] as const).map(lang => (
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
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              📝 Full Problem Statement
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {problemDescription}
            </p>

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
      {activeTab === 'solution' && (
        <div className="space-y-4">
          {!isSolutionUnlocked ? (
            <div className="p-8 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-center space-y-4">
              <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30 w-16 h-16 mx-auto flex items-center justify-center">
                <Lock className="h-8 w-8 text-amber-400" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-base font-bold text-white">
                  Practice Mode Active: Try First!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  To build real coding skills for engineering placements, try writing your algorithm in the <strong>Practice Editor</strong> or unlocking hints before viewing the answer.
                </p>
              </div>

              <button
                onClick={() => setIsSolutionUnlocked(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
              >
                <Unlock className="h-4 w-4" />
                <span>I Tried! Reveal Official {selectedLanguage} Solution</span>
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">
                    Optimal {selectedLanguage} Reference Implementation
                  </span>
                </div>

                <button
                  onClick={handleCopySolution}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Solution'}</span>
                </button>
              </div>

              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed selection:bg-cyan-900 max-h-[440px]">
                <code>{getReferenceSolution()}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TEST CASES & RUNTIME SUMMARY */}
      {activeTab === 'testcases' && (
        <div className="space-y-4">
          {testResult ? (
            <div className="space-y-3">
              <div className={`p-4 rounded-xl border text-xs font-bold flex items-center justify-between ${
                testResult.passed
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-rose-500/40 bg-rose-950/40 text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  {testResult.passed ? <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> : <XCircle className="h-5 w-5 text-rose-400 shrink-0" />}
                  <span>{testResult.message}</span>
                </div>

                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] hover:bg-slate-800 cursor-pointer"
                >
                  Edit Code
                </button>
              </div>

              <div className="space-y-2">
                {testResult.details.map((res) => (
                  <div key={res.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Test Case #{res.id}</span>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400">
                        <span>Time: {res.runtime}</span>
                        <span>Memory: {res.memory}</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          res.passed ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {res.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Input: <code className="text-cyan-300">{res.input}</code>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Expected Output: <code className="text-emerald-400">{res.expected}</code>
                    </div>
                    {res.actual !== res.expected && (
                      <div className="text-[11px] text-rose-400">
                        Actual Output: <code>{res.actual}</code>
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
