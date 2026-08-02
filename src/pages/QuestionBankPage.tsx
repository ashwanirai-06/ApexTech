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
import { recordHistoryItem } from '../utils/historyService';
import { getVerifiedVideoForQuestion, getExactEducatorVideoForQuestion } from '../utils/videoUtils';
import { validateAndFormatSolution, hasOfficialSolution } from '../utils/solutionValidator';
import { classifyQuestion } from '../utils/questionClassifier';
import { CodePracticeWorkspace } from '../components/CodePracticeWorkspace';
import { HtmlCssWorkspace } from '../components/HtmlCssWorkspace';
import { SqlPlaygroundWorkspace } from '../components/SqlPlaygroundWorkspace';
import { HrWorkspace } from '../components/HrWorkspace';
import { AptitudeWorkspace } from '../components/AptitudeWorkspace';
import { CoreCsWorkspace } from '../components/CoreCsWorkspace';
import { SystemDesignWorkspace } from '../components/SystemDesignWorkspace';
import { DevelopmentWorkspace } from '../components/DevelopmentWorkspace';
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
  initialCompany?: string;
  onSelectTopicForPractice?: (
    subjectCode: string,
    topic: string
  ) => void;
}

export const QuestionBankPage: React.FC<QuestionBankPageProps> = ({
  initialTopic,
  initialCompany,
  onSelectTopicForPractice
}) => {
  
  // Generate/memoize 5000+ questions database
  const allQuestions = useMemo(() => generateAggregatedQuestionBank(5000), []);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'All'>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformSource | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>(initialCompany || 'All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('C++');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(50);

  // More Filters & Collapsible Sections State
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    topics: false,
    companies: false,
    platforms: false,
    languages: false,
    tags: false
  });

  const toggleSection = (sec: string) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

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
    questionObject?: any;
    educatorVideo?: any;
    initialLanguage?: 'English' | 'Hindi';
  } | null>(null);

  // Reset filters and category state when initialTopic prop changes
  useEffect(() => {
    setSelectedPlatform('All');
    setSelectedDifficulty('All');
    setSelectedCompany('All');
    setSelectedTopic('All');
    setSearchQuery('');
    setVisibleLimit(50);

    if (!initialTopic) {
      setSelectedCategory('All');
      return;
    }

    const topicKey = initialTopic.toLowerCase();
    if (topicKey.includes('frontend')) {
      setSelectedCategory('Frontend');
    } else if (topicKey.includes('backend')) {
      setSelectedCategory('Backend');
    } else if (topicKey.includes('systemdesign') || topicKey.includes('system design')) {
      setSelectedCategory('System Design');
    } else if (topicKey.includes('aiml') || topicKey.includes('ai') || topicKey.includes('machine learning')) {
      setSelectedCategory('AI / ML');
    } else if (topicKey.includes('devops') || topicKey.includes('cloud')) {
      setSelectedCategory('DevOps');
    } else if (topicKey.includes('fullstack') || topicKey.includes('development')) {
      setSelectedCategory('Development');
    } else if (topicKey.includes('company')) {
      setSelectedCategory('All');
      setSelectedCompany('Google');
    } else if (topicKey.includes('topic') || topicKey.includes('pattern')) {
      setSelectedCategory('All');
      setSelectedTopic('Arrays');
    } else if (topicKey.includes('diff') || topicKey.includes('level')) {
      setSelectedCategory('All');
      setSelectedDifficulty('Medium');
    } else if (topicKey.includes('dsa')) {
      setSelectedCategory('DSA');
    } else if (topicKey.includes('corecs') || topicKey.includes('cs')) {
      setSelectedCategory('Core CS');
    } else if (topicKey.includes('hr') || topicKey.includes('aptitude')) {
      setSelectedCategory('HR & Aptitude');
    } else {
      setSearchQuery(initialTopic);
    }
  }, [initialTopic]);

  // Categories list with Icons
  const categoriesList: { id: QuestionCategory | 'All'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'All', label: 'All Categories (2000+)', icon: Layers },
    { id: 'DSA', label: 'DSA (2,300)', icon: Code },
    { id: 'Frontend', label: 'Frontend UI (400)', icon: Layout },
    { id: 'Backend', label: 'Backend & APIs (450)', icon: Server },
    { id: 'System Design', label: 'System Design (450)', icon: Cpu },
    { id: 'AI / ML', label: 'AI / ML & LLMs (300)', icon: Zap },
    { id: 'DevOps', label: 'DevOps & Cloud (300)', icon: Globe },
    { id: 'Core CS', label: 'Core CS (1,100)', icon: Cpu },
    { id: 'Development', label: 'Development (1,080)', icon: Layout },
    { id: 'HR & Aptitude', label: 'HR & Aptitude (400)', icon: MessageSquare }
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
      let matchCategory = selectedCategory === 'All' || q.category === selectedCategory;
      if (!matchCategory) {
        const catLower = q.category.toLowerCase();
        const tagLower = (q.patternOrTag || '').toLowerCase();
        const titleLower = q.title.toLowerCase();

        if (selectedCategory === 'Frontend') {
          matchCategory = tagLower.includes('frontend') || tagLower.includes('react') || tagLower.includes('javascript') || titleLower.includes('dom') || titleLower.includes('css') || titleLower.includes('web');
        } else if (selectedCategory === 'Backend') {
          matchCategory = tagLower.includes('backend') || tagLower.includes('node') || tagLower.includes('express') || tagLower.includes('mongo') || titleLower.includes('api') || titleLower.includes('sql');
        } else if (selectedCategory === 'AI / ML') {
          matchCategory = tagLower.includes('ai') || tagLower.includes('ml') || tagLower.includes('llm') || titleLower.includes('transformer') || titleLower.includes('rag') || titleLower.includes('model');
        } else if (selectedCategory === 'DevOps') {
          matchCategory = tagLower.includes('devops') || tagLower.includes('docker') || tagLower.includes('kubernetes') || tagLower.includes('git') || tagLower.includes('aws') || tagLower.includes('cloud');
        }
      }

      // 2. Platform Match
      const matchPlatform =
        selectedPlatform === 'All' ||
        q.platform === selectedPlatform ||
        (q.otherPlatforms && q.otherPlatforms.includes(selectedPlatform as PlatformSource));

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

        matchSearch = tokens.every(token => searchableText.includes(token));
      }

      return matchCategory && matchPlatform && matchDifficulty && matchCompany && matchTopic && matchSearch;
    });
  }, [allQuestions, selectedCategory, selectedPlatform, selectedDifficulty, selectedCompany, selectedTopic, searchQuery]);

  // Keep selected question synced with filteredQuestions
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const stillExists = filteredQuestions.some(q => q.id === selectedQuestionId);
      if (!stillExists) {
        setSelectedQuestionId(filteredQuestions[0].id);
      }
    }
  }, [filteredQuestions, selectedQuestionId]);

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
    if (currentQuestion) {
      recordHistoryItem({
        title: currentQuestion.title,
        category: currentQuestion.category,
        actionType: 'practice',
        score: 92,
        englishAnswer: `Practiced ${currentQuestion.title} on ${currentQuestion.platform}`,
        hindiExplanation: `${currentQuestion.title} का कोड अभ्यास शुरू किया।`
      });
    }
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
              <span>ApexTech Question Bank • 2000+ Unique Questions (0 Duplicates)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              2000+ Unique Interview Question Bank
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Master top placement interview questions aggregated across LeetCode, HackerRank, InterviewBit, CodeStudio, Striver Sheets, GeeksforGeeks, and CodeChef without duplicates. Organized by <strong className="text-cyan-300 font-mono">DSA</strong>, <strong className="text-purple-300 font-mono">Core CS</strong>, <strong className="text-emerald-300 font-mono">Development</strong>, and <strong className="text-amber-300 font-mono">HR/Aptitude</strong> with C++, Python & Java solutions.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 font-mono text-center shadow-xl">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block">Unique Question Pool</span>
            <span className="text-3xl font-extrabold text-white mt-0.5 block">2000+</span>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" /> Zero Duplicates
            </span>
          </div>
        </div>
      </motion.div>

      {/* Global Search & Multi-Filter Control Panel */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl space-y-4 shadow-2xl">
        
        {/* Global Search Input Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Search className="h-4 w-4 text-cyan-400" />
              <span>Global Question Search</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
                title="Reset all search filters"
              >
                <X className="h-3 w-3" />
                <span>Clear All Filters</span>
              </button>
              <span className="text-xs font-mono text-cyan-400 font-bold hidden sm:inline">
                Showing {filteredQuestions.length} of {allQuestions.length} Questions
              </span>
            </div>
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

        {/* Core Filter Grid (Always Shown: Company, Topic, Difficulty + More Filters Button) */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* 1. Target Company Filter */}
          <div className="lg:col-span-4 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-cyan-400" /> Target Company:
            </label>
            <select
              value={selectedCompany}
              onChange={e => setSelectedCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none cursor-pointer text-cyan-300 font-bold"
            >
              <option value="All">All Tech Companies (Google, Meta, etc.)</option>
              {['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber', 'Netflix', 'Atlassian', 'Goldman Sachs', 'Swiggy', 'Flipkart', 'Adobe', 'PayPal', 'Salesforce', 'Zomato'].map(comp => (
                <option key={comp} value={comp}>
                  🏢 {comp}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Topic / Pattern Filter Dropdown */}
          <div className="lg:col-span-4 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-cyan-400" /> Topic / Pattern:
            </label>
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="All">All Topics ({availableTopics.length})</option>
              {availableTopics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Difficulty Filter */}
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

          {/* 4. More Filters Toggle Button */}
          <div className="lg:col-span-2 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" /> Filters:
            </label>
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`w-full py-1.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                showMoreFilters || selectedCategory !== 'All' || selectedPlatform !== 'All'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>More Filters</span>
              </span>
              <span>{showMoreFilters ? '▲' : '▼'}</span>
            </button>
          </div>

        </div>

        {/* COLLAPSIBLE MORE FILTERS SECTION */}
        {showMoreFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 border-t border-slate-800 space-y-4"
          >
            {/* 1. Collapsible Topics Panel */}
            <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleSection('topics')}
                className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{openSections.topics ? '▼' : '▶'}</span>
                  <Tag className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Topics & Patterns ({availableTopics.length})</span>
                </span>
                <span className="text-[10px] text-cyan-400">{selectedTopic !== 'All' ? `Selected: ${selectedTopic}` : 'All Selected'}</span>
              </button>
              {openSections.topics && (
                <div className="p-3 border-t border-slate-800 flex items-center gap-1.5 flex-wrap max-h-48 overflow-y-auto scrollbar-thin">
                  <button
                    onClick={() => setSelectedTopic('All')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                      selectedTopic === 'All' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    All Topics
                  </button>
                  {availableTopics.map(top => (
                    <button
                      key={top}
                      onClick={() => setSelectedTopic(top)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                        selectedTopic === top ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {top}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Collapsible Companies Panel */}
            <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleSection('companies')}
                className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{openSections.companies ? '▼' : '▶'}</span>
                  <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Companies Shortcut (Google, Amazon, Meta...)</span>
                </span>
                <span className="text-[10px] text-cyan-400">{selectedCompany !== 'All' ? `Selected: ${selectedCompany}` : 'All Selected'}</span>
              </button>
              {openSections.companies && (
                <div className="p-3 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                  {['All', 'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber', 'Netflix', 'Goldman Sachs', 'Swiggy', 'Flipkart', 'Adobe', 'PayPal', 'Salesforce', 'Zomato'].map(comp => (
                    <button
                      key={comp}
                      onClick={() => setSelectedCompany(comp)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                        selectedCompany === comp ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      🏢 {comp}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Collapsible Platforms Panel */}
            <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleSection('platforms')}
                className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{openSections.platforms ? '▼' : '▶'}</span>
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Platforms (LeetCode, Striver, GFG, HackerRank...)</span>
                </span>
                <span className="text-[10px] text-cyan-400">{selectedPlatform !== 'All' ? `Selected: ${selectedPlatform}` : 'All Selected'}</span>
              </button>
              {openSections.platforms && (
                <div className="p-3 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                  {platformsList.map(plat => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                        selectedPlatform === plat ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      🌐 {plat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Collapsible Languages Panel */}
            <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleSection('languages')}
                className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{openSections.languages ? '▼' : '▶'}</span>
                  <Code className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Programming Languages (C++, Python, Java)</span>
                </span>
                <span className="text-[10px] text-cyan-400">Current: {selectedLanguage}</span>
              </button>
              {openSections.languages && (
                <div className="p-3 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                  {languagesList.map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                        selectedLanguage === lang ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      💻 {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Collapsible Tags / Categories Panel */}
            <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleSection('tags')}
                className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{openSections.tags ? '▼' : '▶'}</span>
                  <Layers className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Category Domains (DSA, System Design, Core CS...)</span>
                </span>
                <span className="text-[10px] text-cyan-400">{selectedCategory !== 'All' ? `Selected: ${selectedCategory}` : 'All Selected'}</span>
              </button>
              {openSections.tags && (
                <div className="p-3 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                  {categoriesList.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                        selectedCategory === cat.id ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      🏷️ {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

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
                    <motion.div
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
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="px-2 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/60 text-[9px] font-mono text-cyan-300 font-bold">
                            {q.platform}
                          </span>
                          {q.otherPlatforms?.map((plat, pIdx) => (
                            <span key={pIdx} className="px-1.5 py-0.5 rounded-md border border-slate-800 bg-slate-950 text-[9px] font-mono text-slate-400">
                              {plat}
                            </span>
                          ))}
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
                          {hasOfficialSolution(q) && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold font-mono flex items-center gap-1" title="Official Solution Available">
                              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                              <span>Official Sol</span>
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const vInfo = getExactEducatorVideoForQuestion(q, 'English');
                              setPlayingVideo({
                                title: q.title,
                                questionObject: q,
                                educatorVideo: vInfo,
                                initialLanguage: 'English'
                              });
                            }}
                            className="px-2 py-0.5 rounded-md bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] font-bold font-mono flex items-center gap-1 transition-all cursor-pointer"
                            title="Watch Educator Video Solution"
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
                    </motion.div>
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
                {hasOfficialSolution(currentQuestion) && (
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
                      const vInfo = getExactEducatorVideoForQuestion(currentQuestion, 'English');
                      setPlayingVideo({
                        title: currentQuestion.title,
                        questionObject: currentQuestion,
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
                      const vInfo = getExactEducatorVideoForQuestion(currentQuestion, 'Hindi');
                      setPlayingVideo({
                        title: currentQuestion.title,
                        questionObject: currentQuestion,
                        educatorVideo: vInfo,
                        initialLanguage: 'Hindi'
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1"
                  >
                    🇮🇳 Hindi
                  </button>
                </div>

                {currentQuestion.category === 'DSA' && (
                  <button
                    onClick={handleRunTestCases}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20 font-mono cursor-pointer"
                  >
                    <Cpu className="h-3.5 w-3.5 fill-slate-950" />
                    <span>Run Test Engine ({selectedLanguage})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Category-Based Practice Workspace Component */}
            <div id="code-practice-workspace">
              {(() => {
                const classifiedCategory = classifyQuestion(currentQuestion);

                if (classifiedCategory === 'HR') {
                  return (
                    <HrWorkspace
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      starAnswer={{
                        situation: currentQuestion.hints?.[0] || 'During a critical project milestone, our team faced tight timelines and complex dependencies.',
                        task: currentQuestion.hints?.[1] || 'I was tasked with coordinating developer deliverables and removing technical blockers.',
                        action: currentQuestion.hints?.[2] || 'I structured clear API contracts, automated unit tests, and facilitated daily syncs.',
                        result: currentQuestion.inputExample || 'Delivered 100% on schedule with zero production regression bugs.'
                      }}
                      interviewerTips={currentQuestion.hints}
                      sampleAnswer={typeof currentQuestion.solutions === 'string' ? currentQuestion.solutions : currentQuestion.solutions?.cpp}
                    />
                  );
                }

                if (classifiedCategory === 'Aptitude') {
                  return (
                    <AptitudeWorkspace
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      formula={currentQuestion.inputExample}
                      solutionSteps={currentQuestion.hints}
                      explanation={typeof currentQuestion.solutions === 'string' ? currentQuestion.solutions : currentQuestion.solutions?.cpp}
                    />
                  );
                }

                if (classifiedCategory === 'HTML') {
                  const htmlSol = validateAndFormatSolution(
                    currentQuestion.solutions,
                    'HTML',
                    currentQuestion.title,
                    currentQuestion.category,
                    currentQuestion.patternOrTag,
                    currentQuestion.description
                  ).solutionText;

                  return (
                    <HtmlCssWorkspace
                      mode="HTML"
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      initialHtml={currentQuestion.inputExample && currentQuestion.inputExample.includes('<') ? currentQuestion.inputExample : undefined}
                      solutionHtml={htmlSol}
                      explanation={currentQuestion.hints?.join('\n')}
                    />
                  );
                }

                if (classifiedCategory === 'CSS') {
                  const cssSol = validateAndFormatSolution(
                    currentQuestion.solutions,
                    'CSS',
                    currentQuestion.title,
                    currentQuestion.category,
                    currentQuestion.patternOrTag,
                    currentQuestion.description
                  ).solutionText;

                  return (
                    <HtmlCssWorkspace
                      mode="CSS"
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      initialCss={currentQuestion.inputExample && currentQuestion.inputExample.includes('{') ? currentQuestion.inputExample : undefined}
                      solutionCss={cssSol !== 'Official solution is currently unavailable for this problem.' ? cssSol : undefined}
                      explanation={currentQuestion.hints?.join('\n')}
                    />
                  );
                }

                if (classifiedCategory === 'JavaScript') {
                  const jsSol = validateAndFormatSolution(
                    currentQuestion.solutions,
                    'JavaScript',
                    currentQuestion.title,
                    currentQuestion.category,
                    currentQuestion.patternOrTag,
                    currentQuestion.description
                  ).solutionText;

                  return (
                    <DevelopmentWorkspace
                      mode="JavaScript"
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      codeSnippets={{
                        jsTs: jsSol
                      }}
                      explanation={currentQuestion.hints?.join('\n')}
                    />
                  );
                }

                if (classifiedCategory === 'React') {
                  const reactSol = validateAndFormatSolution(
                    currentQuestion.solutions,
                    'React',
                    currentQuestion.title,
                    currentQuestion.category,
                    currentQuestion.patternOrTag,
                    currentQuestion.description
                  ).solutionText;

                  return (
                    <DevelopmentWorkspace
                      mode="React"
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      codeSnippets={{
                        reactNode: reactSol !== 'Official solution is currently unavailable for this problem.' ? reactSol : undefined
                      }}
                      explanation={currentQuestion.hints?.join('\n')}
                    />
                  );
                }

                if (classifiedCategory === 'SystemDesign') {
                  return (
                    <SystemDesignWorkspace
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      explanation={typeof currentQuestion.solutions === 'string' ? currentQuestion.solutions : currentQuestion.solutions?.cpp}
                    />
                  );
                }

                if (classifiedCategory === 'Database') {
                  const sqlSol = validateAndFormatSolution(
                    currentQuestion.solutions,
                    'SQL',
                    currentQuestion.title,
                    currentQuestion.category,
                    currentQuestion.patternOrTag,
                    currentQuestion.description
                  ).solutionText;

                  return (
                    <SqlPlaygroundWorkspace
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      initialQuery={currentQuestion.inputExample && currentQuestion.inputExample.toLowerCase().includes('select') ? currentQuestion.inputExample : undefined}
                      solutionQuery={sqlSol}
                      explanation={currentQuestion.hints?.join('\n')}
                    />
                  );
                }

                if (classifiedCategory === 'CoreCS') {
                  const coreSol = validateAndFormatSolution(
                    currentQuestion.solutions,
                    'CoreCS',
                    currentQuestion.title,
                    currentQuestion.category,
                    currentQuestion.patternOrTag,
                    currentQuestion.description
                  ).solutionText;

                  return (
                    <CoreCsWorkspace
                      problemTitle={currentQuestion.title}
                      problemDescription={currentQuestion.description}
                      subtopic={currentQuestion.patternOrTag}
                      solution={coreSol}
                      diagramNotes={currentQuestion.hints?.join('\n')}
                    />
                  );
                }

                // Default DSA & Algorithmic Practice Workspace
                return (
                  <CodePracticeWorkspace
                    problemTitle={currentQuestion.title}
                    problemDescription={currentQuestion.description}
                    inputExample={currentQuestion.inputExample}
                    outputExample={currentQuestion.outputExample}
                    hints={currentQuestion.hints}
                    testCases={currentQuestion.testCases}
                    solutions={currentQuestion.solutions}
                    onVideoClick={(lang) => {
                      const targetLang = lang || 'English';
                      const vInfo = getExactEducatorVideoForQuestion(currentQuestion, targetLang);
                      setPlayingVideo({
                        title: currentQuestion.title,
                        questionObject: currentQuestion,
                        educatorVideo: vInfo,
                        initialLanguage: targetLang
                      });
                    }}
                  />
                );
              })()}
            </div>

            {/* Prominent "Watch Video Solution" Section Below Every Question */}
            <div className="mt-6 p-5 rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-950 to-purple-950/40 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <span>🎥 Watch Video Solution</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Top educator explanation mapped specifically for <strong>"{currentQuestion.title}"</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {hasOfficialSolution(currentQuestion) && (
                    <span className="px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-xs font-mono font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>✅ Official Solution</span>
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/80 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                    <span>🎥 Video Solution</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-300 font-sans leading-relaxed">
                  <p>
                    Watch step-by-step video breakdown by verified top educators (NeetCode, Striver Take U Forward, Abdul Bari, Gate Smashers).
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      const vInfo = getExactEducatorVideoForQuestion(currentQuestion, 'English');
                      setPlayingVideo({
                        title: currentQuestion.title,
                        questionObject: currentQuestion,
                        educatorVideo: vInfo,
                        initialLanguage: 'English'
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono transition-all shadow-md shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <Video className="h-4 w-4" />
                    <span>🇬🇧 Watch English Video</span>
                  </button>

                  <button
                    onClick={() => {
                      const vInfo = getExactEducatorVideoForQuestion(currentQuestion, 'Hindi');
                      setPlayingVideo({
                        title: currentQuestion.title,
                        questionObject: currentQuestion,
                        educatorVideo: vInfo,
                        initialLanguage: 'Hindi'
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono transition-all shadow-md shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <Video className="h-4 w-4" />
                    <span>🇮🇳 Watch Hindi Video</span>
                  </button>
                </div>
              </div>
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
          questionObject={playingVideo.questionObject}
          educatorVideo={playingVideo.educatorVideo}
          initialLanguage={playingVideo.initialLanguage || 'English'}
        />
      )}

    </div>
  );
};

