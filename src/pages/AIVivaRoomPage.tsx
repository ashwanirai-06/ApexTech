import React, { useState, useEffect } from 'react';
import { User, VivaQuestion, AnswerEvaluation, StudentAnswerLog, VivaSession } from '../types';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../utils/speech';
import { DBService } from '../db/dbService';
import { AKTU_SUBJECTS } from '../data/aktuData';
import { HuskyExaminerAvatar } from '../components/HuskyExaminerAvatar';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Brain,
  Globe,
  BookOpen
} from 'lucide-react';

interface AIVivaRoomPageProps {
  user: User;
  initialSubjectCode?: string;
  initialTopic?: string;
}

export const AIVivaRoomPage: React.FC<AIVivaRoomPageProps> = ({
  user,
  initialSubjectCode = 'KCS301',
  initialTopic = 'Asymptotic Notations'
}) => {
  // Config state
  const [selectedDomain, setSelectedDomain] = useState<'Full Stack Engineering' | 'Data Structures & Algorithms' | 'System Design & Databases' | 'AI / Machine Learning' | 'DevOps & Cloud' | 'Custom Topic'>('Data Structures & Algorithms');
  const [subjectCode, setSubjectCode] = useState(initialSubjectCode);
  const [topic, setTopic] = useState(initialTopic);
  const [isCustomTopicInput, setIsCustomTopicInput] = useState(false);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert'>('Medium');

  const DOMAIN_PRESET_TOPICS: Record<string, string[]> = {
    'Data Structures & Algorithms': [
      'Arrays, Two Pointers & Sliding Window',
      'Binary Search & Search Space Optimization',
      'Singly, Doubly & Circular Linked Lists',
      'Stacks, Queues & Monotonic Stacks',
      'Binary Trees, BST & AVL Tree Rotations',
      'Graphs, BFS, DFS & Dijkstra Shortest Path',
      'Dynamic Programming, DP on Trees & Knapsack',
      'Heaps, Priority Queues & Segment Trees'
    ],
    'Full Stack Engineering': [
      'React Components, Props & Hooks State',
      'React Virtual DOM & Reconciliation Engine',
      'Express.js API Routes, Middleware & JWT Auth',
      'RESTful API Design & Status Codes',
      'Node.js Event Loop & Non-Blocking Async I/O',
      'Frontend State Management (Zustand / Redux)',
      'CSS Flexbox, Grid & Tailwind Utility Layouts'
    ],
    'System Design & Databases': [
      'Relational SQL vs NoSQL Database Architectures',
      'Database Indexing, B-Trees & B+ Trees',
      'Database Normalization (1NF to BCNF)',
      'Database Transactions & ACID Properties',
      'System Design: Caching with Redis & CDN',
      'System Design: Load Balancers & Rate Limiting',
      'Message Queues (Kafka / RabbitMQ) & PubSub'
    ],
    'AI / Machine Learning': [
      'Supervised vs Unsupervised Learning Algorithms',
      'Neural Networks & Backpropagation Math',
      'Transformer Architecture & Self-Attention',
      'Large Language Models (LLMs) & Prompting',
      'Convolutional Neural Networks (CNN) for Vision',
      'PyTorch & TensorFlow Model Training Loops'
    ],
    'DevOps & Cloud': [
      'Docker Containers & Multi-stage Dockerfiles',
      'Kubernetes Pods, Services & Deployments',
      'CI/CD Pipelines with GitHub Actions',
      'Cloud Architecture: AWS S3, EC2 & CloudRun',
      'Linux Terminal Commands & Bash Scripting'
    ]
  };
  const [vivaMode, setVivaMode] = useState<'Practice Mode' | 'Exam Mode' | 'Strict Professor Mode'>('Practice Mode');
  
  // Room Status State
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [questions, setQuestions] = useState<VivaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  
  // Voice & Audio
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizer, setRecognizer] = useState<any>(null);

  // Timer for Exam Mode
  const [timeLeft, setTimeLeft] = useState(60);

  // Logs
  const [logs, setLogs] = useState<StudentAnswerLog[]>([]);
  const [currentEvaluation, setCurrentEvaluation] = useState<AnswerEvaluation | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const rec = createSpeechRecognizer(
      (transcript) => setStudentAnswer(transcript),
      (err) => console.log('Speech rec error:', err)
    );
    setRecognizer(rec);
  }, []);

  // Timer countdown in Exam Mode
  useEffect(() => {
    if (!sessionStarted || sessionCompleted || vivaMode !== 'Exam Mode' || evaluating) return;
    if (timeLeft <= 0) {
      handleAnswerSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [sessionStarted, sessionCompleted, vivaMode, timeLeft, evaluating]);

  const handleStartViva = async () => {
    setLoading(true);
    setSessionStarted(true);
    setSessionCompleted(false);
    setCurrentIndex(0);
    setLogs([]);
    setCurrentEvaluation(null);

    const fullTopicName = selectedDomain === 'Custom Topic' 
      ? topic 
      : `${selectedDomain}: ${topic}`;

    try {
      const res = await fetch('/api/viva/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode,
          subjectName: selectedDomain,
          topic: fullTopicName,
          difficulty,
          vivaMode,
          count: vivaMode === 'Exam Mode' ? 5 : 3
        })
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setTimeLeft(vivaMode === 'Exam Mode' ? 60 : 120);

        // Auto read out the first question
        speakQuestionText(data.questions[0].question);
      }
    } catch (err) {
      console.error('Failed to start viva session:', err);
    } finally {
      setLoading(false);
    }
  };

  const speakQuestionText = (text: string) => {
    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  };

  const toggleListen = () => {
    if (!recognizer) {
      alert('Speech recognition is not supported in this browser. You can type your answer.');
      return;
    }

    if (isListening) {
      recognizer.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognizer.start();
    }
  };

  const handleAnswerSubmit = async () => {
    if (!studentAnswer.trim() && vivaMode !== 'Exam Mode') return;
    stopSpeaking();
    setEvaluating(true);

    const currentQ = questions[currentIndex];

    try {
      const res = await fetch('/api/viva/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQ.question,
          studentResponse: studentAnswer || 'No answer provided before time limit expired.',
          expectedAnswer: currentQ.expectedAnswer,
          keywords: currentQ.keywords,
          topic,
          vivaMode
        })
      });

      const data = await res.json();
      if (data.evaluation) {
        const evalRes: AnswerEvaluation = data.evaluation;
        setCurrentEvaluation(evalRes);

        const newLog: StudentAnswerLog = {
          questionId: currentQ.id || 'q-' + currentIndex,
          questionText: currentQ.question,
          studentResponse: studentAnswer || 'Time expired',
          timeSpentSeconds: vivaMode === 'Exam Mode' ? (60 - timeLeft) : 30,
          evaluation: evalRes,
          timestamp: new Date().toISOString()
        };

        const updatedLogs = [...logs, newLog];
        setLogs(updatedLogs);

        // Record weak topic if low score
        if (evalRes.score < 70) {
          DBService.recordWeakTopic(
            user.id,
            subjectCode,
            selectedDomain,
            1,
            topic,
            evalRes.score,
            evalRes.missingConcepts
          );
        }
      }
    } catch (err) {
      console.error('Answer evaluation failed:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentEvaluation(null);
    setStudentAnswer('');
    setTimeLeft(vivaMode === 'Exam Mode' ? 60 : 120);

    if (currentIndex + 1 < questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      speakQuestionText(questions[nextIdx].question);
    } else {
      // Viva completed
      setSessionCompleted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      // Save complete session log
      const avgScore = Math.round(
        logs.reduce((acc, l) => acc + l.evaluation.score, 0) / (logs.length || 1)
      );

      const sessionObj: VivaSession = {
        id: 'sess-' + Date.now(),
        userId: user.id,
        subjectCode,
        subjectName: selectedDomain,
        unitNumber: 1,
        topic,
        vivaMode,
        difficulty,
        totalQuestions: questions.length,
        completedQuestions: logs.length,
        averageScore: avgScore,
        status: 'Completed',
        logs,
        startedAt: new Date().toISOString()
      };

      DBService.saveVivaSession(sessionObj);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-purple-300 font-mono mb-1">
            <Brain className="h-3.5 w-3.5 text-purple-400" />
            <span>Interactive EduCore AI Viva Room</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Adaptive EduCore AI Viva Mentor
          </h1>
        </div>

        {sessionStarted && !sessionCompleted && (
          <button
            onClick={() => { setSessionStarted(false); stopSpeaking(); }}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-950/30 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900/40 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Exit Viva Session</span>
          </button>
        )}
      </div>

      {/* Setup View */}
      {!sessionStarted && (
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0c14] to-[#050508] p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Animated Husky Eyes Visual Mascot Avatar */}
          <div className="flex justify-center my-2">
            <HuskyExaminerAvatar
              isSpeaking={false}
              isListening={false}
              isEvaluating={false}
              examinerName="Prof. Husky AI"
            />
          </div>

          <div className="text-center">
            <h2 className="text-base font-bold text-cyan-300 uppercase tracking-wider font-mono">Configure Viva Examination Session</h2>
            <p className="text-xs text-slate-400 mt-1">Choose target tech domain, subject, topic, and examiner persona.</p>
          </div>

          <div className="space-y-4">
            
            {/* Domain Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Engineering Domain / Tech Area</label>
              <select
                value={selectedDomain}
                onChange={e => {
                  const dom = e.target.value as any;
                  setSelectedDomain(dom);
                  if (dom === 'Data Structures & Algorithms') setTopic('Arrays & Two Pointers');
                  else if (dom === 'Full Stack Engineering') setTopic('React Components, Hooks & Express APIs');
                  else if (dom === 'System Design & Databases') setTopic('Database Indexing & Normalization');
                  else if (dom === 'AI / Machine Learning') setTopic('Transformers & Neural Network Foundations');
                  else if (dom === 'DevOps & Cloud') setTopic('Docker Containers & Kubernetes Pods');
                  else setTopic('');
                }}
                className="w-full rounded-xl border border-white/10 bg-[#0c0c14] p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Data Structures & Algorithms">Data Structures & Algorithms (DSA)</option>
                <option value="Full Stack Engineering">Full Stack Engineering (React, Node, DB)</option>
                <option value="System Design & Databases">System Design & Databases (SQL, NoSQL, Scaling)</option>
                <option value="AI / Machine Learning">AI & Machine Learning (PyTorch, Gemini, LLMs)</option>
                <option value="DevOps & Cloud">DevOps & Cloud Systems (Docker, K8s, CI/CD)</option>
                <option value="Custom Topic">Custom Subject / Topic</option>
              </select>
            </div>

            {/* Subject Code / Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Curriculum Code</label>
              <select
                value={subjectCode}
                onChange={e => {
                  const selectedCode = e.target.value;
                  setSubjectCode(selectedCode);
                  const matchedSubject = AKTU_SUBJECTS.find(s => s.code === selectedCode);
                  if (matchedSubject && matchedSubject.units.length > 0) {
                    setTopic(matchedSubject.units[0].unitName + ' - ' + (matchedSubject.units[0].topics[0] || ''));
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-[#0c0c14] p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                {AKTU_SUBJECTS.map(s => (
                  <option key={s.id} value={s.code}>
                    [{s.code}] {s.name} (Sem {s.semester})
                  </option>
                ))}
              </select>
            </div>

            {/* Specific Topic Dropdown Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Specific Viva Topic</label>
              
              {selectedDomain !== 'Custom Topic' && DOMAIN_PRESET_TOPICS[selectedDomain] ? (
                <div className="space-y-2">
                  <select
                    value={isCustomTopicInput ? 'CUSTOM_OPTION' : topic}
                    onChange={e => {
                      if (e.target.value === 'CUSTOM_OPTION') {
                        setIsCustomTopicInput(true);
                        setTopic('');
                      } else {
                        setIsCustomTopicInput(false);
                        setTopic(e.target.value);
                      }
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0c14] p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-sans"
                  >
                    {DOMAIN_PRESET_TOPICS[selectedDomain].map(top => (
                      <option key={top} value={top}>{top}</option>
                    ))}
                    <option value="CUSTOM_OPTION">✍️ Type Custom Topic...</option>
                  </select>

                  {isCustomTopicInput && (
                    <input
                      type="text"
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      placeholder="Type your custom viva topic (e.g. Red-Black Tree, GraphQL APIs, Vector DBs)..."
                      className="w-full rounded-xl border border-cyan-500/50 bg-white/5 p-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Type any topic (e.g. Binary Trees, React Hooks, BCNF Normalization)..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as any)}
                  className="w-full rounded-xl border border-white/10 bg-[#050508] p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Easy">Easy (Fundamental)</option>
                  <option value="Medium">Medium (Industry / Exam Standard)</option>
                  <option value="Hard">Hard (Deep Architectural Concept)</option>
                  <option value="Expert">Expert (Complex Proofs & Edge Cases)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Examiner Persona & Mode</label>
                <select
                  value={vivaMode}
                  onChange={e => setVivaMode(e.target.value as any)}
                  className="w-full rounded-xl border border-white/10 bg-[#050508] p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Practice Mode">Practice Mode (Friendly Hints & Instant Feedback)</option>
                  <option value="Exam Mode">Exam Mode (Strict Timer & Final Scorecard)</option>
                  <option value="Strict Professor Mode">Strict Professor Mode (Formal University Viva)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleStartViva}
              disabled={loading || !topic.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-purple-500/20 hover:brightness-110 transition-all mt-4 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  <span>Start AI Viva Practice Session</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Active Viva Session View */}
      {sessionStarted && !sessionCompleted && questions.length > 0 && (
        <div className="space-y-6 max-w-3xl mx-auto">
          
          {/* Animated Examiner Avatar Display */}
          <div className="flex justify-center">
            <HuskyExaminerAvatar
              isSpeaking={isSpeaking}
              isListening={isListening}
              isEvaluating={evaluating}
              examinerName="EduCore AI Academic Mentor"
            />
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold">Question {currentIndex + 1} of {questions.length}</span>
              <span className="text-white/20">•</span>
              <span className="text-purple-300 font-semibold">{selectedDomain}</span>
            </div>

            {vivaMode === 'Exam Mode' && (
              <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
                <Clock className="h-4 w-4 animate-pulse" />
                <span>00:{timeLeft < 10 ? '0' + timeLeft : timeLeft}</span>
              </div>
            )}
          </div>

          {/* Examiner Question Card */}
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-br from-[#0c0c14] to-purple-950/20 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                  <Brain className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-purple-300 font-mono">EduCore AI Mentor Question</span>
              </div>

              <button
                onClick={() => speakQuestionText(questions[currentIndex].question)}
                className={`p-2 rounded-xl border ${isSpeaking ? 'border-cyan-500 text-cyan-400 bg-cyan-950/40' : 'border-white/10 text-slate-400 hover:text-white'}`}
                title="Narrate question out loud"
              >
                {isSpeaking ? <Volume2 className="h-4 w-4 animate-bounce" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed font-sans">
              "{questions[currentIndex].question}"
            </h3>

            {/* Hint in Practice Mode */}
            {vivaMode === 'Practice Mode' && questions[currentIndex].hints && (
              <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/30 p-3 text-xs text-cyan-300 flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Examiner Hint: </span>
                  {questions[currentIndex].hints![0]}
                </div>
              </div>
            )}
          </div>

          {/* Student Response Area */}
          {!currentEvaluation ? (
            <div className="space-y-4 rounded-3xl border border-white/5 bg-white/[0.02] p-6">
              
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">Your Answer / Oral Explanation</label>
                
                <button
                  onClick={toggleListen}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isListening
                      ? 'border-rose-500 bg-rose-950 text-rose-300 animate-pulse'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-500'
                  }`}
                >
                  {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5 text-cyan-400" />}
                  <span>{isListening ? 'Listening Voice...' : 'Voice Input'}</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={studentAnswer}
                onChange={e => setStudentAnswer(e.target.value)}
                placeholder="Type your response here or click 'Voice Input' to speak into microphone..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />

              <button
                onClick={handleAnswerSubmit}
                disabled={evaluating || !studentAnswer.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 disabled:opacity-50"
              >
                {evaluating ? (
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Submit Answer to AI Mentor</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </div>
          ) : (
            
            /* Post-Answer Evaluation Report Card */
            <div className="rounded-3xl border border-white/10 bg-[#050508] p-6 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Evaluation Score</span>
                  <div className="text-3xl font-serif text-cyan-400">{currentEvaluation.score} <span className="text-sm font-sans text-slate-400">/ 100</span></div>
                </div>

                <div className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${
                  currentEvaluation.score >= 80 ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' :
                  currentEvaluation.score >= 60 ? 'border-amber-500/40 bg-amber-950/40 text-amber-300' :
                  'border-rose-500/40 bg-rose-950/40 text-rose-300'
                }`}>
                  {currentEvaluation.performanceLevel}
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 font-mono mb-3">Assessment Criteria Breakdown</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px]">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                    <div className="text-slate-400">Concept (40)</div>
                    <div className="text-xs font-bold text-cyan-300 mt-1">{currentEvaluation.criteria.conceptualCorrectness}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                    <div className="text-slate-400">Complete (25)</div>
                    <div className="text-xs font-bold text-cyan-300 mt-1">{currentEvaluation.criteria.completeness}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                    <div className="text-slate-400">Terms (15)</div>
                    <div className="text-xs font-bold text-cyan-300 mt-1">{currentEvaluation.criteria.technicalTerminology}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                    <div className="text-slate-400">Clarity (10)</div>
                    <div className="text-xs font-bold text-cyan-300 mt-1">{currentEvaluation.criteria.clarity}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                    <div className="text-slate-400">Example (10)</div>
                    <div className="text-xs font-bold text-cyan-300 mt-1">{currentEvaluation.criteria.exampleApplication}</div>
                  </div>
                </div>
              </div>

              {/* Feedback & Expected Answer */}
              <div className="space-y-3 text-xs">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5">
                  <span className="font-bold text-slate-300 block mb-1">Detailed Feedback:</span>
                  <p className="text-slate-400 leading-relaxed">{currentEvaluation.detailedFeedback}</p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5">
                  <span className="font-bold text-cyan-300 block mb-1">Expected Model Answer:</span>
                  <p className="text-slate-300 leading-relaxed">{currentEvaluation.expectedAnswer}</p>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all"
              >
                <span>Proceed to Next Question</span>
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          )}

        </div>
      )}

      {/* Completion View */}
      {sessionCompleted && (
        <div className="mx-auto max-w-md text-center rounded-3xl border border-emerald-500/30 bg-[#050508] p-8 space-y-6 shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Award className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Viva Session Completed!</h2>
            <p className="text-xs text-slate-400 mt-1">Your viva results have been evaluated and saved.</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">Overall Average Score</div>
            <div className="text-3xl font-serif text-cyan-300 mt-1">
              {Math.round(logs.reduce((a, l) => a + l.evaluation.score, 0) / (logs.length || 1))}%
            </div>
          </div>

          <button
            onClick={() => setSessionStarted(false)}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-xs font-bold uppercase tracking-widest text-white hover:brightness-110 transition-all"
          >
            Start Another Viva Practice
          </button>
        </div>
      )}

    </div>
  );
};

