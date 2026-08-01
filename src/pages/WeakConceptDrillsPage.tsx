import React, { useState } from 'react';
import { Target, Flame, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, BookOpen, Brain, RefreshCw } from 'lucide-react';
import { TtsAudioPlayer } from '../components/TtsAudioPlayer';

export const WeakConceptDrillsPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Dynamic Programming');
  const [activeDrillIndex, setActiveDrillIndex] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const WEAK_TOPICS = [
    { id: 'dp', title: 'Dynamic Programming', score: '42%', severity: 'High', count: 18, color: 'text-rose-400 border-rose-500/30' },
    { id: 'graphs', title: 'Graph Algorithms & Topological Sort', score: '55%', severity: 'Medium', count: 14, color: 'text-amber-400 border-amber-500/30' },
    { id: 'systemdesign', title: 'Consistent Hashing & Microservices', score: '61%', severity: 'Medium', count: 12, color: 'text-amber-400 border-amber-500/30' },
    { id: 'trees', title: 'Binary Tree Lowest Common Ancestor', score: '68%', severity: 'Low', count: 9, color: 'text-cyan-400 border-cyan-500/30' }
  ];

  const DRILLS: Record<string, Array<{
    question: string;
    options: string[];
    correctIndex: number;
    englishExplanation: string;
    hindiExplanation: string;
  }>> = {
    'Dynamic Programming': [
      {
        question: 'What is the optimal substructure property in Dynamic Programming?',
        options: [
          'A problem can be broken down into subproblems whose optimal solutions form the overall optimal solution.',
          'Subproblems overlap repeatedly and are recalculated multiple times.',
          'The problem must always be solved using a greedy choice at every step.',
          'Memory requirement is strictly O(1) space complexity.'
        ],
        correctIndex: 0,
        englishExplanation: 'Optimal substructure means that an optimal solution to the problem contains optimal solutions to sub-problems. This allows us to recursively define the solution in terms of smaller sub-problem solutions.',
        hindiExplanation: 'ऑप्टिमल सबस्ट्रक्चर (Optimal Substructure) का मतलब है कि मुख्य समस्या का सबसे बेहतरीन समाधान (Optimal Solution) उसके छोटे सब-प्रॉब्लम्स के ऑप्टिमल हलों से मिलकर बनता है।'
      },
      {
        question: 'When should Memoization (Top-Down) be preferred over Tabulation (Bottom-Up)?',
        options: [
          'When only a subset of all possible subproblem states needs to be evaluated.',
          'When recursion stack overflow is guaranteed.',
          'Memoization is always faster in execution time than tabulation.',
          'Tabulation does not support space optimization.'
        ],
        correctIndex: 0,
        englishExplanation: 'Top-down memoization only evaluates subproblems that are reachable from the root state, which can save computation if many states in the DP table remain unvisited.',
        hindiExplanation: 'मेमोइजेशन (Top-Down) तब बेहतर होता है जब हमें टेबल के सभी सेल्स को कैलकुलेट करने की आवश्यकता नहीं होती, बल्कि केवल वही सब-प्रॉब्लम्स हल होते हैं जो रिक्वायर्ड हैं।'
      }
    ],
    'Graph Algorithms & Topological Sort': [
      {
        question: 'Which condition is mandatory for a graph to have a valid Topological Ordering?',
        options: [
          'The graph must be a Directed Acyclic Graph (DAG).',
          'The graph must be undirected and fully connected.',
          'Every node must have identical indegree and outdegree.',
          'The graph must contain at least one Hamiltonian cycle.'
        ],
        correctIndex: 0,
        englishExplanation: 'Topological sorting is only defined for Directed Acyclic Graphs (DAGs). If a cycle exists, no valid linear order of vertices can satisfy all directed edge dependencies.',
        hindiExplanation: 'टोपोलॉजिकल सॉर्टिंग (Topological Sorting) केवल Directed Acyclic Graph (DAG) के लिए ही संभव है। यदि ग्राफ में कोई चक्र (Cycle) है, तो टोपोलॉजिकल ऑर्डर संभव नहीं है।'
      }
    ],
    'Consistent Hashing & Microservices': [
      {
        question: 'Why are Virtual Nodes used in Consistent Hashing ring architectures?',
        options: [
          'To prevent hot-spotting and distribute keys evenly across physical server nodes.',
          'To encrypt keys stored in memory using AES-256.',
          'To eliminate the need for replication across nodes.',
          'To achieve O(1) lookup speed without using hash tables.'
        ],
        correctIndex: 0,
        englishExplanation: 'Virtual nodes mapped to multiple points on the hash ring smooth out key distribution variance, preventing hot-spotting when physical nodes join or leave.',
        hindiExplanation: 'वर्चुअल नोड्स (Virtual Nodes) का उपयोग डेटा को सर्वर पर समान रूप से वितरित करने के लिए किया जाता है ताकि किसी एक नोड पर अत्यधिक लोड (Hotspotting) न पड़े।'
      }
    ],
    'Binary Tree Lowest Common Ancestor': [
      {
        question: 'What is the time complexity of finding LCA in a Binary Search Tree (BST)?',
        options: [
          'O(H) where H is the height of the BST.',
          'O(N log N) using sorting.',
          'O(N^2) worst case.',
          'O(1) constant time.'
        ],
        correctIndex: 0,
        englishExplanation: 'In a BST, we can navigate left or right based on node values, taking O(H) time where H is tree height.',
        hindiExplanation: 'BST में LCA ढूँढने की टाइम कॉम्प्लेक्सिटी O(H) होती है, जहाँ H ट्री की हाइट है।'
      }
    ]
  };

  const currentDrills = DRILLS[selectedTopic] || DRILLS['Dynamic Programming'];
  const activeDrill = currentDrills[activeDrillIndex % currentDrills.length];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 font-mono">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-rose-400" />
          <span>Weak Concept Targeted Drills</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          AI-driven diagnostics to pinpoint weak problem patterns and master fundamental interview concepts.
        </p>
      </div>

      {/* Diagnostic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {WEAK_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => {
              setSelectedTopic(topic.title);
              setActiveDrillIndex(0);
              setUserChoice(null);
              setShowExplanation(false);
            }}
            className={`p-3.5 rounded-2xl border text-left space-y-2 transition-all cursor-pointer bg-slate-950 ${
              selectedTopic === topic.title ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${topic.color}`}>
                {topic.severity} Risk
              </span>
              <span className="text-xs font-bold text-white">{topic.score}</span>
            </div>
            <h3 className="text-xs font-bold text-slate-200 line-clamp-1">{topic.title}</h3>
            <p className="text-[10px] text-slate-400">{topic.count} Recommended Drills</p>
          </button>
        ))}
      </div>

      {/* Active Drill Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            <div>
              <span className="text-xs font-bold text-white block">{selectedTopic}</span>
              <span className="text-[10px] text-slate-400 block">Drill #{activeDrillIndex + 1} of {currentDrills.length}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveDrillIndex((prev) => (prev + 1) % currentDrills.length);
              setUserChoice(null);
              setShowExplanation(false);
            }}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Next Drill</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white leading-relaxed">
            {activeDrill.question}
          </h2>

          <div className="space-y-2">
            {activeDrill.options.map((option, oIdx) => {
              const isSelected = userChoice === oIdx;
              const isCorrect = oIdx === activeDrill.correctIndex;
              let btnStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700';

              if (userChoice !== null) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500/50 bg-rose-950/40 text-rose-200 font-bold';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => {
                    setUserChoice(oIdx);
                    setShowExplanation(true);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {userChoice !== null && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation & Audio */}
        {showExplanation && (
          <div className="space-y-4 pt-4 border-t border-slate-900">
            <TtsAudioPlayer
              englishText={activeDrill.englishExplanation}
              hindiText={activeDrill.hindiExplanation}
              title="Drill Concept Voice Analysis"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 block">🇺🇸 English Explanation</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeDrill.englishExplanation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block">🇮🇳 हिन्दी स्पष्टीकरण</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeDrill.hindiExplanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
