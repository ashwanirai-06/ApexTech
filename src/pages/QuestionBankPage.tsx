import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  generateAggregatedQuestionBank,
  QuestionItem,
  QuestionCategory,
  PlatformSource,
  Difficulty,
  CodeLanguage
} from '../data/questionBankData';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { getVerifiedVideoForQuestion } from '../utils/videoUtils';
import { CodePracticeWorkspace } from '../components/CodePracticeWorkspace';
import {
  Code,
  Terminal,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Search,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileCode2,
  Filter,
  Video,
  ExternalLink,
  Flame,
  Globe,
  Layers,
  Server,
  Layout,
  MessageSquare,
  Building2,
  Zap,
  TrendingUp,
  X,
  Tag,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface QuestionBankPageProps {
  initialTopic?: string;
  onSelectTopicForPractice?: (
    subjectCode: string,
    topic: string
  ) => void;
}

export const QuestionBankPage: React.FC<QuestionBankPageProps> = ({
  initialTopic,
  onSelectTopicForPractice
}) => {
  
  // Generate/memoize 5000+ questions database
  const allQuestions = useMemo(() => generateAggregatedQuestionBank(5000), []);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'All'>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformSource | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('C++');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(50);

  // Reset visible limit whenever filters change
  useEffect(() => {
    setVisibleLimit(50);
  }, [selectedCategory, selectedPlatform, selectedDifficulty, selectedCompany, selectedTopic, searchQuery]);

  // Selected Question State
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(allQuestions[0].id);

  // Workspace Tabs
  const [activeTab, setActiveTab] = useState<'problem' | 'code' | 'testcases'>('problem');
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  // Test Execution State
  const [testResult, setTestResult] = useState<{
    executed: boolean;
    passed: boolean;
    message: string;
    details: any[];
  } | null>(null);

  // Video Modal State
  const [playingVideo, setPlayingVideo] = useState<{
    title: string;
    youtubeId?: string;
    query: string;
    educator: string;
  } | null>(null);

  // Categories list with Icons
  const categoriesList: { id: QuestionCategory | 'All'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'All', label: 'All Categories (3200+)', icon: Layers },
    { id: 'DSA', label: 'DSA & Algorithms', icon: Code },
    { id: 'System Design', label: 'System Design', icon: Server },
    { id: 'Frontend', label: 'Frontend Engineering', icon: Layout },
    { id: 'Backend', label: 'Backend & Cloud', icon: Globe },
    { id: 'Behavioral', label: 'Behavioral (STAR)', icon: MessageSquare }
  ];

  const platformsList: (PlatformSource | 'All')[] = ['All', 'LeetCode', 'Striver', 'GFG', 'CodeChef', 'HackerRank', 'InterviewBit', 'CodeStudio'];
  const difficultiesList: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard'];
  const languagesList: CodeLanguage[] = ['C++', 'Python', 'Java'];

  // Dynamically extract unique topic/pattern tags from all questions
  const availableTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    allQuestions.forEach(q => {
      if (q.patternOrTag) {
        topicsSet.add(q.patternOrTag);
      }
    });
    return Array.from(topicsSet).sort();
  }, [allQuestions]);

  // Simultaneous Filter Logic: Keyword, Topic, Difficulty, Category, Platform & Company
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      // 1. Category Match
      const matchCategory = selectedCategory === 'All' || q.category === selectedCategory;

      // 2. Platform Match
      const matchPlatform = selectedPlatform === 'All' || q.platform === selectedPlatform;

      // 3. Difficulty Match
      const matchDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

      // 4. Target Company Match
      const matchCompany =
        selectedCompany === 'All' ||
        (q.companyTags && q.companyTags.some(tag => tag.toLowerCase() === selectedCompany.toLowerCase()));

      // 5. Topic/Pattern Match
      const matchTopic =
        selectedTopic === 'All' ||
        q.patternOrTag.toLowerCase().includes(selectedTopic.toLowerCase()) ||
        q.category.toLowerCase().includes(selectedTopic.toLowerCase());

      // 6. Global Keyword Search Match
      let matchSearch = true;
      if (searchQuery.trim()) {
        const tokens = searchQuery.trim().toLowerCase().split(/\s+/);
        const searchableText = [
          q.title,
          q.patternOrTag,
          q.category,
          q.difficulty,
          q.platform,
          q.description,
          ...(q.companyTags || []),
          ...(q.hints || [])
        ]
          .join(' ')
          .toLowerCase();

        // Every token in the search query must exist in the searchable text
        matchSearch = tokens.every(token => searchableText.includes(token));
      }

      return matchCategory && matchPlatform && matchDifficulty && matchCompany && matchTopic && matchSearch;
    });
  }, [allQuestions, selectedCategory, selectedPlatform, selectedDifficulty, selectedCompany, selectedTopic, searchQuery]);

  // Current Active Question
  const currentQuestion: QuestionItem = useMemo(() => {
    return allQuestions.find(q => q.id === selectedQuestionId) || filteredQuestions[0] || allQuestions[0];
  }, [allQuestions, selectedQuestionId, filteredQuestions]);

  // Get Code by Selected Language
  const currentCodeSolution = useMemo(() => {
    if (!currentQuestion || !currentQuestion.solutions) return '';
    if (selectedLanguage === 'C++') return currentQuestion.solutions.cpp;
    if (selectedLanguage === 'Python') return currentQuestion.solutions.python;
    if (selectedLanguage === 'Java') return currentQuestion.solutions.java;
    return currentQuestion.solutions.cpp;
  }, [currentQuestion, selectedLanguage]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCodeSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTestCases = () => {
    const workspaceEl = document.getElementById('code-practice-workspace');
    if (workspaceEl) {
      workspaceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All');
    setSelectedDifficulty('All');
    setSelectedCategory('All');
    setSelectedPlatform('All');
    setSelectedCompany('All');
    setVisibleLimit(50);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedTopic !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedCategory !== 'All' ||
    selectedPlatform !== 'All' ||
    selectedCompany !== 'All';

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-indigo-950/50 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Universal Question Bank • 5000+ Curated Interview Questions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              5,000+ Technical Interview Question Bank
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Master top interview questions aggregated from LeetCode, HackerRank, InterviewBit, CodeStudio, Striver Sheets, GeeksforGeeks, and CodeChef without duplicates.
              Filter by domain (DSA, System Design, Frontend, Backend, Behavioral), difficulty, topic, and view multi-language solutions in <strong className="text-cyan-300 font-mono">C++, Python & Java</strong>.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 font-mono text-center shadow-xl">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block">Indexed Question Bank</span>
            <span className="text-3xl font-extrabold text-white mt-0.5 block">5,000+</span>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" /> C++, Python & Java
            </span>
          </div>
        </div>
      </motion.div>

      {/* Global Search & Multi-Filter Control Panel */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl space-y-4 shadow-2xl">
        
        {/* Global Search Input Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Search className="h-4 w-4 text-cyan-400" />
              <span>Global Question Search</span>
            </label>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Showing {filteredQuestions.length} of {allQuestions.length} Questions
            </span>
          </div>

          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, topic (e.g. DP, Two Pointers), company tag, or description..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none font-mono shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
                title="Clear search query"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Simultaneous Filter Control Grid */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* 1. Category Domain Filter */}
          <div className="lg:col-span-3 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" /> Domain Category:
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {categoriesList.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Target Company Filter */}
          <div className="lg:col-span-3 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-cyan-400" /> Target Company:
            </label>
            <select
              value={selectedCompany}
              onChange={e => setSelectedCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none cursor-pointer text-cyan-300 font-bold"
            >
              <option value="All">All Tech Companies (Google, Meta, etc.)</option>
              {['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber', 'Netflix', 'Atlassian', 'Goldman Sachs', 'Swiggy', 'Flipkart', 'Adobe', 'PayPal', 'Salesforce', 'Zomato'].map(comp => (
                <option key={comp} value={comp}>
                  🏢 {comp}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Topic / Pattern Filter Dropdown */}
          <div className="lg:col-span-2 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-cyan-400" /> Topic / Pattern:
            </label>
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="All">All Topics ({availableTopics.length})</option>
              {availableTopics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Difficulty Filter */}
          <div className="lg:col-span-2 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-cyan-400" /> Difficulty:
            </label>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              {difficultiesList.map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
                    selectedDifficulty === diff
                      ? diff === 'Easy'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : diff === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : diff === 'Hard'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Language Selector */}
          <div className="lg:col-span-2 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-cyan-400" /> Code Lang:
            </label>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              {languagesList.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`flex-1 py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
                    selectedLanguage === lang
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Filter Target Company Pills */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold shrink-0 flex items-center gap-1">
            <Building2 className="h-3 w-3 text-cyan-400" /> Top Companies:
          </span>
          {[
            'Google',
            'Amazon',
            'Meta',
            'Microsoft',
            'Apple',
            'Uber',
            'Netflix',
            'Goldman Sachs',
            'Swiggy',
            'Flipkart'
          ].map(comp => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(selectedCompany === comp ? 'All' : comp)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                selectedCompany === comp
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-sm ring-1 ring-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>🏢</span> {comp}
            </button>
          ))}
        </div>

        {/* Quick Filter Topic Chips */}
        <div className="pt-1 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold shrink-0 flex items-center gap-1">
            <Zap className="h-3 w-3 text-amber-400" /> Quick Topics:
          </span>
          {[
            'Two Pointers / Sorting',
            'Dynamic Programming',
            'Trees & Binary Trees',
            'Graph Algorithms',
            'System Design',
            'Frontend',
            'Backend',
            'Behavioral'
          ].map(top => (
            <button
              key={top}
              onClick={() => setSelectedTopic(selectedTopic === top ? 'All' : top)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTopic === top
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-sm ring-1 ring-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              {top}
            </button>
          ))}
        </div>

        {/* Active Filter Badges Bar */}
        {hasActiveFilters && (
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" /> Active Filters:
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950 text-cyan-300 font-bold">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedCompany !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950 text-cyan-300 font-bold">
                  Company: 🏢 {selectedCompany}
                  <button onClick={() => setSelectedCompany('All')} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedTopic !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950 text-cyan-300 font-bold">
                  Topic: {selectedTopic}
                  <button onClick={() => setSelectedTopic('All')} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedDifficulty !== 'All' && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border font-bold ${
                  selectedDifficulty === 'Easy' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                  selectedDifficulty === 'Medium' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                  'bg-rose-950 text-rose-300 border-rose-800'
                }`}>
                  Difficulty: {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty('All')} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-indigo-500/40 bg-indigo-950 text-indigo-300 font-bold">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedPlatform !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-200 font-bold">
                  Platform: {selectedPlatform}
                  <button onClick={() => setSelectedPlatform('All')} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-500/30 bg-rose-950/40 text-rose-300 font-mono text-[11px] font-bold hover:bg-rose-900/60 transition-all cursor-pointer shrink-0 ml-auto"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Main Content Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Questions Master List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>Matching Questions ({filteredQuestions.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Language: <strong className="text-cyan-400">{selectedLanguage}</strong></span>
          </div>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-3 font-mono">
                <Search className="h-8 w-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  No matching questions found for current search criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950 text-cyan-300 text-xs font-bold hover:bg-cyan-900/60 transition-all cursor-pointer"
                >
                  Clear Search & Reset Filters
                </button>
              </div>
            ) : (
              <>
                {filteredQuestions.slice(0, visibleLimit).map(q => {
                  const isSelected = q.id === currentQuestion?.id;
                  return (
                    <motion.button
                      key={q.id}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedQuestionId(q.id);
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
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/60 text-[9px] font-mono text-cyan-300 font-bold">
                            {q.platform}
                          </span>
                          <span className="px-2 py-0.5 rounded-md border border-slate-700 bg-slate-800 text-[9px] font-mono text-slate-300 font-semibold">
                            {q.category}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          q.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          q.difficulty === 'Medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white font-mono mt-1.5">{q.title}</h4>
                      
                      {/* Company Tags Badges */}
                      {q.companyTags && q.companyTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {q.companyTags.slice(0, 3).map((comp, idx) => (
                            <span
                              key={idx}
                              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-all ${
                                selectedCompany.toLowerCase() === comp.toLowerCase()
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                                  : 'bg-slate-950 text-slate-400 border border-slate-800'
                              }`}
                            >
                              🏢 {comp}
                            </span>
                          ))}
                          {q.companyTags.length > 3 && (
                            <span className="text-[9px] font-mono text-slate-500">+{q.companyTags.length - 3}</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 font-mono gap-1">
                        <span className="text-slate-400 truncate max-w-[140px]">🏷️ {q.patternOrTag}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const vInfo = getVerifiedVideoForQuestion(q.title, q.category, q.platform);
                              setPlayingVideo({
                                title: q.title,
                                youtubeId: q.youtubeId || vInfo.youtubeId,
                                query: q.videoQuery || vInfo.videoQuery,
                                educator: q.platform
                              });
                            }}
                            className="px-2 py-0.5 rounded-md bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] font-bold font-mono flex items-center gap-1 transition-all cursor-pointer"
                            title="Watch Educator Solution Video"
                          >
                            <Video className="h-3 w-3 text-rose-400" />
                            <span>Video</span>
                          </button>
                          {q.frequencyScore && (
                            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                              <Zap className="h-3 w-3 text-amber-400" /> {q.frequencyScore}%
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                {filteredQuestions.length > visibleLimit && (
                  <button
                    onClick={() => setVisibleLimit(prev => prev + 50)}
                    className="w-full py-3 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer text-center shadow-lg hover:border-cyan-500/60"
                  >
                    Load More Questions (Showing {visibleLimit} of {filteredQuestions.length}) ⚡
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column: Problem Workspace & Multi-Language Solution Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-6 shadow-2xl">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    {currentQuestion.platform} • {currentQuestion.category}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                    currentQuestion.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  {currentQuestion.companyTags && currentQuestion.companyTags.map((comp, idx) => (
                    <span
                      key={idx}
                      onClick={() => setSelectedCompany(comp)}
                      className="text-[10px] font-mono font-bold bg-slate-950 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 px-2.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer transition-all"
                      title={`Filter by ${comp}`}
                    >
                      🏢 {comp}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-xl font-bold text-white font-mono mt-2">{currentQuestion.title}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Pattern / Topic: <span className="text-cyan-300 font-mono font-semibold">{currentQuestion.patternOrTag}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    const vInfo = getVerifiedVideoForQuestion(currentQuestion.title, currentQuestion.category, currentQuestion.platform);
                    setPlayingVideo({
                      title: currentQuestion.title,
                      youtubeId: currentQuestion.youtubeId || vInfo.youtubeId,
                      query: currentQuestion.videoQuery || vInfo.videoQuery,
                      educator: currentQuestion.platform
                    });
                  }}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-rose-600/20 font-mono cursor-pointer"
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Watch Educator Video</span>
                </button>

                <button
                  onClick={handleRunTestCases}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20 font-mono cursor-pointer"
                >
                  <Cpu className="h-3.5 w-3.5 fill-slate-950" />
                  <span>Run Test Engine ({selectedLanguage})</span>
                </button>
              </div>
            </div>

            {/* Practice-First Workspace Component */}
            <div id="code-practice-workspace">
              <CodePracticeWorkspace
                problemTitle={currentQuestion.title}
                problemDescription={currentQuestion.description}
                inputExample={currentQuestion.inputExample}
                outputExample={currentQuestion.outputExample}
                hints={currentQuestion.hints}
                testCases={currentQuestion.testCases}
                solutions={currentQuestion.solutions}
                onVideoClick={() => {
                  const vInfo = getVerifiedVideoForQuestion(currentQuestion.title, currentQuestion.category, currentQuestion.platform);
                  setPlayingVideo({
                    title: currentQuestion.title,
                    youtubeId: currentQuestion.youtubeId || vInfo.youtubeId,
                    query: currentQuestion.videoQuery || vInfo.videoQuery,
                    educator: currentQuestion.platform
                  });
                }}
              />
            </div>

          </div>
        </div>

      </div>

      {/* Video Modal */}
      {playingVideo && (
        <VideoPlayerModal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          videoTitle={playingVideo.title}
          youtubeId={playingVideo.youtubeId}
          videoQuery={playingVideo.query}
          educator={playingVideo.educator}
        />
      )}

    </div>
  );
};

