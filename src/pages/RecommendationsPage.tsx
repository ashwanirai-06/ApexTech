import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Mic, Target } from 'lucide-react';

interface RecommendationsPageProps {
  onStartViva: (subjectCode: string, topic: string) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ onStartViva }) => {
  const recommendations = [
    {
      subjectCode: 'KCS301',
      topic: 'Graph Traversal Algorithms (BFS & DFS)',
      reason: 'Low accuracy in recent viva evaluation. Recommended for 20m practice.',
      type: 'Viva Revision'
    },
    {
      subjectCode: 'KCS301',
      topic: 'AVL Tree LL and RR Rotations',
      reason: 'High-yield AKTU 10-mark question. 85% probability in semester exam.',
      type: 'Exam High Yield'
    },
    {
      subjectCode: 'KCS501',
      topic: 'DBMS B-Trees & B+ Trees Indexing',
      reason: 'Unit 3 core concept for upcoming lab evaluation.',
      type: 'Lab Prep'
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 text-xs text-purple-300 mb-1">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Adaptive Recommendation Engine</span>
        </div>
        <h1 className="text-xl font-bold text-white font-mono">
          Smart AI Academic Recommendations
        </h1>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-500/40 transition-all"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-purple-950 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30">
                  {rec.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">{rec.subjectCode}</span>
              </div>

              <h3 className="text-sm font-bold text-white mt-1">{rec.topic}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{rec.reason}</p>
            </div>

            <button
              onClick={() => onStartViva(rec.subjectCode, rec.topic)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:brightness-110 shrink-0"
            >
              <Mic className="h-3.5 w-3.5" />
              <span>Practice Now</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
