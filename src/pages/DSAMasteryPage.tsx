import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ALL_DSA_SHEETS, DSASheetTopic } from '../data/dsaSheetsData';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { getVerifiedVideoForQuestion, getExactEducatorVideoForQuestion } from '../utils/videoUtils';
import { evaluateUserCode } from '../utils/codeEvaluator';
import { hasOfficialSolution } from '../utils/solutionValidator';
import { CodePracticeWorkspace } from '../components/CodePracticeWorkspace';
import { Code, Terminal, Copy, Check, Sparkles, BookOpen, Clock, Play, Video, ExternalLink, Flame, Search, Lightbulb, CheckCircle2, ChevronDown, ChevronUp, Cpu, FileCode2, Layers, Filter } from 'lucide-react';

interface DSAMasteryPageProps {
  initialFilter?: string;
  onStartVivaForTopic?: (subjectCode: string, topic: string) => void;
  onOpenQuestionBank?: (topic: string) => void;
}

export const DSAMasteryPage: React.FC<DSAMasteryPageProps> = ({
    initialFilter,
    onStartVivaForTopic,
    onOpenQuestionBank
}) => {
  const [selectedSheetCategory, setSelectedSheetCategory] = useState<'All' | 'Striver A2Z' | 'LeetCode' | 'GeeksforGeeks SDE' | 'PW College Wallah' | 'CodeChef CP' | 'Apna College Alpha'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedPattern, setSelectedPattern] = useState<string>('All');

  React.useEffect(() => {
    if (initialFilter === 'striver') {
      setSelectedSheetCategory('Striver A2Z');
      setSelectedDifficulty('All');
    } else if (initialFilter === 'beginner') {
      setSelectedSheetCategory('All');
      setSelectedDifficulty('Easy');
    } else if (initialFilter === 'advanced') {
      setSelectedSheetCategory('All');
      setSelectedDifficulty('Hard');
    } else if (initialFilter === 'progress') {
      setSelectedSheetCategory('LeetCode');
      setSelectedDifficulty('All');
    } else {
      setSelectedSheetCategory('All');
      setSelectedDifficulty('All');
    }
  }, [initialFilter]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ALL_DSA_SHEETS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Tabs inside Problem View
  const [activeRightTab, setActiveRightTab] = useState<'problem' | 'code' | 'testcases'>('problem');
  const [showHints, setShowHints] = useState(false);
  const [testResult, setTestResult] = useState<{ executed: boolean; passed: boolean; message: string; details: any[] } | null>(null);

  // Video Modal
  const [playingVideo, setPlayingVideo] = useState<{
    title: string;
    questionObject?: any;
    educatorVideo: any;
    initialLanguage?: 'English' | 'Hindi';
  } | null>(null);

  const patterns = ['All', 'Two Pointers', 'Binary Search', 'LinkedList', 'Trees', 'Graphs', 'Dynamic Programming', 'Backtracking', 'Monotonic Stack', 'Greedy', 'Grid Search'];

  const filteredSheets = ALL_DSA_SHEETS.filter(item => {
    const matchesCategory = selectedSheetCategory === 'All' || item.sheetCategory === selectedSheetCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
    const matchesPattern = selectedPattern === 'All' || item.pattern.toLowerCase().includes(selectedPattern.toLowerCase());
    const matchesQuery = !searchQuery || 
      item.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leetcodeOrProblemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesPattern && matchesQuery;
  });

  const currentTopic = ALL_DSA_SHEETS.find(t => t.id === selectedTopicId) || filteredSheets[0] || ALL_DSA_SHEETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTopic.codeTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTestCases = () => {
    const evalRes = evaluateUserCode(
      currentTopic.codeTemplate,
      'C++',
      currentTopic.testCases,
      currentTopic.codeTemplate,
      currentTopic.topicName,
      currentTopic.problemStatement
    );
    setTestResult(evalRes);
    setActiveRightTab('testcases');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>2500+ Question Master Collection (LeetCode, HackerRank, Striver A2Z & GFG)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              DSA Practice Engine & Educator Masterclasses
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Solve 2500+ curated Data Structure & Algorithm questions from LeetCode, Striver A2Z Sheet, GeeksforGeeks SDE Sheet, PW College Wallah, CodeChef CP & Apna College Alpha. Includes test case executor, hints & direct educator video tutorials.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 font-mono text-center shadow-xl">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block">Question Index</span>
            <span className="text-2xl font-bold text-white mt-0.5 block">2,500+ Problems</span>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Verified Optimal C++ Solutions</span>
          </div>
        </div>
      </motion.div>

      {/* Sheet Category Tabs */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Select DSA Sheet Source</span>
          </span>
          <span className="text-xs font-mono text-cyan-400">Showing {filteredSheets.length} Problems</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {(['All', 'Striver A2Z', 'LeetCode', 'GeeksforGeeks SDE', 'PW College Wallah', 'CodeChef CP', 'Apna College Alpha'] as const).map(sheet => (
            <button
              key={sheet}
              onClick={() => setSelectedSheetCategory(sheet)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedSheetCategory === sheet
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
              }`}
            >
              {sheet === 'All' ? '⚡ All Sheets' : sheet}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Difficulty & Pattern + Search */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-800/60">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5 text-cyan-400" /> Diff:
            </span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-800 mx-1 shrink-0" />

            <select
              value={selectedPattern}
              onChange={e => setSelectedPattern(e.target.value)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              {patterns.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'All Patterns' : p}</option>
              ))}
            </select>
          </div>

          <div className="relative shrink-0 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search LeetCode # or topic..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Questions Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>Matching Questions ({filteredSheets.length})</span>
            </span>
          </h3>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredSheets.map(topic => {
              const isSelected = topic.id === currentTopic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setTestResult(null);
                    setShowHints(false);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-500 bg-slate-900 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                      : 'border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="px-2 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/60 text-[9px] font-mono text-cyan-300 font-bold truncate">
                      {topic.sheetCategory}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                      topic.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      topic.difficulty === 'Medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono mt-1">{topic.topicName}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{topic.leetcodeOrProblemName}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code & Interactive Problem Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-6 shadow-2xl">
            
            {/* Topic Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-500/30">
                  {currentTopic.sheetCategory} • {currentTopic.difficulty}
                </span>
                <h2 className="text-xl font-bold text-white font-mono mt-2">{currentTopic.topicName}</h2>
                <p className="text-xs text-slate-400 mt-1">Pattern: <span className="text-cyan-300 font-mono font-semibold">{currentTopic.pattern}</span></p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {hasOfficialSolution(currentTopic) && (
                  <span className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-800 text-xs font-bold font-mono shadow-md">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Official Solution ✅</span>
                  </span>
                )}

                <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-rose-500/30">
                  <span className="text-xs text-rose-300 font-bold font-mono px-1 flex items-center gap-1">
                    <Video className="h-3.5 w-3.5 text-rose-400" />
                    <span>Watch Video Solution:</span>
                  </span>
                  <button
                    onClick={() => {
                      const vInfo = getExactEducatorVideoForQuestion(currentTopic, 'English');
                      setPlayingVideo({
                        title: currentTopic.topicName,
                        questionObject: currentTopic,
                        educatorVideo: vInfo,
                        initialLanguage: 'English'
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1"
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => {
                      const vInfo = getExactEducatorVideoForQuestion(currentTopic, 'Hindi');
                      setPlayingVideo({
                        title: currentTopic.topicName,
                        questionObject: currentTopic,
                        educatorVideo: vInfo,
                        initialLanguage: 'Hindi'
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1"
                  >
                    🇮🇳 Hindi
                  </button>
                </div>

                <button
                  onClick={handleRunTestCases}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20 font-mono cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>Run Test Cases</span>
                </button>
                <button
                  onClick={() => onOpenQuestionBank?.(currentTopic.topicName)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-cyan-500/20 font-mono cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Practice Questions</span>
                </button>
              </div>
            </div>

            {/* Practice-First Workspace Component */}
            <CodePracticeWorkspace
              problemTitle={currentTopic.topicName}
              problemDescription={currentTopic.problemStatement}
              inputExample={currentTopic.inputExample}
              outputExample={currentTopic.outputExample}
              hints={currentTopic.hints}
              testCases={currentTopic.testCases}
              solutions={{
                cpp: currentTopic.codeTemplate,
                python: currentTopic.codeTemplate,
                java: currentTopic.codeTemplate
              }}
              onVideoClick={(lang) => {
                const targetLang = lang || 'English';
                const vInfo = getExactEducatorVideoForQuestion(currentTopic, targetLang);
                setPlayingVideo({
                  title: currentTopic.topicName,
                  questionObject: currentTopic,
                  educatorVideo: vInfo,
                  initialLanguage: targetLang
                });
              }}
            />

          </div>
        </div>

      </div>

      {/* Video Modal */}
      {playingVideo && (
        <VideoPlayerModal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          videoTitle={playingVideo.title}
          questionObject={playingVideo.questionObject}
          educatorVideo={playingVideo.educatorVideo}
          initialLanguage={playingVideo.initialLanguage || 'English'}
        />
      )}

    </div>
  );
};
