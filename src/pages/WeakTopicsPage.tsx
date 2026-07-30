import React, { useEffect, useState } from 'react';
import { WeakTopic } from '../types';
import { DBService } from '../db/dbService';
import { openTopicVideo } from '../utils/videoUtils';
import { Target, Mic, RotateCcw, AlertTriangle, CheckCircle, Video } from 'lucide-react';

interface WeakTopicsPageProps {
  userId: string;
  onPracticeTopic: (subjectCode: string, topic: string) => void;
}

export const WeakTopicsPage: React.FC<WeakTopicsPageProps> = ({ userId, onPracticeTopic }) => {
  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>([]);

  useEffect(() => {
    DBService.getWeakTopics(userId).then(setWeakTopics);
  }, [userId]);

  const handleResolve = (id: string) => {
    setWeakTopics(prev => prev.filter(t => t.id !== id));
  };

  const handleAddSampleWeakTopic = () => {
    const newTopic: WeakTopic = {
      id: 'wt-' + Date.now(),
      userId,
      subjectCode: 'KCS301',
      subjectName: 'Data Structures',
      unitNumber: 2,
      topicName: 'B-Trees & B+ Trees Indexing Rotations',
      errorFrequency: 3,
      averageScore: 48,
      priority: 'High',
      missingConcepts: ['Splitting node logic', 'Height-balanced property'],
      lastPracticed: new Date().toISOString()
    };
    setWeakTopics(prev => [newTopic, ...prev]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs text-amber-300 mb-1">
            <Target className="h-3.5 w-3.5 text-amber-400" />
            <span>AI Diagnostic Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white font-mono">
            Weak Concept Practice & Targeted Drills
          </h1>
        </div>

        <button
          onClick={handleAddSampleWeakTopic}
          className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-950/40 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-900/40 transition-all font-mono"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Log Target Revision Topic</span>
        </button>
      </div>

      {/* Weak Topics List */}
      {weakTopics.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-400 space-y-3">
          <CheckCircle className="mx-auto h-10 w-10 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">No Weak Topics Logged Yet!</h3>
          <p className="text-xs">As you practice AI vivas, low-accuracy topics will be automatically logged here for revision.</p>
          <button
            onClick={handleAddSampleWeakTopic}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold font-mono hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
          >
            <span>Add Sample Topic for Drill</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {weakTopics.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-950/10 p-5 backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-950 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30">
                    {item.subjectCode}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Last Score: {item.averageScore ?? (item as any).lastAccuracyScore ?? 50}%
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-1">{item.topicName || (item as any).topic}</h3>

                {item.missingConcepts.length > 0 && (
                  <p className="text-xs text-slate-400 mt-1">
                    Missing Concepts: <span className="text-amber-200">{item.missingConcepts.join(', ')}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openTopicVideo(item.subjectCode + ' ' + (item.topicName || (item as any).topic))}
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 text-xs font-bold hover:bg-rose-900/60 transition-all font-mono"
                >
                  <Video className="h-3.5 w-3.5 text-rose-400" />
                  <span>Watch Video</span>
                </button>

                <button
                  onClick={() => handleResolve(item.id)}
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900/60 transition-all"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Mastered</span>
                </button>

                <button
                  onClick={() => onPracticeTopic(item.subjectCode, item.topicName || (item as any).topic)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:brightness-110 shrink-0"
                >
                  <Mic className="h-3.5 w-3.5" />
                  <span>Practice Viva Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
