import React, { useEffect, useState } from 'react';
import { VivaSession } from '../types';
import { DBService } from '../db/dbService';
import { History, Trash2, Calendar, Mic } from 'lucide-react';

export const VivaHistoryPage: React.FC<{ userId: string }> = ({ userId }) => {
  const [history, setHistory] = useState<VivaSession[]>([]);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    DBService.getVivaHistory(userId).then(setHistory);
  }, [userId]);

  const handleClearHistory = async () => {
    setClearing(true);
    await DBService.clearVivaHistory(userId);
    setHistory([]);
    setClearing(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 text-xs text-purple-300 mb-1 font-mono">
            <History className="h-3.5 w-3.5 text-purple-400" />
            <span>SQLite Local Audit Log</span>
          </div>
          <h1 className="text-xl font-bold text-white font-mono">
            Viva Examination History & Transcripts
          </h1>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            disabled={clearing}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2 text-xs font-mono font-bold text-rose-300 hover:bg-rose-900/60 hover:border-rose-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-rose-950/50"
          >
            <Trash2 className="h-4 w-4 text-rose-400" />
            <span>{clearing ? 'Clearing...' : 'Clear All History'}</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-400 space-y-2">
          <Mic className="mx-auto h-10 w-10 text-slate-600" />
          <h3 className="text-sm font-bold text-white font-mono">No Past Viva Sessions Found</h3>
          <p className="text-xs">Complete an AI Viva Room practice session to save your detailed transcript here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(session => (
            <div key={session.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="rounded-md bg-purple-950 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30">
                    {session.subjectCode}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1 font-mono">{session.topic}</h3>
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold font-mono text-cyan-300">{session.averageScore}%</div>
                  <div className="text-[10px] text-slate-400 font-mono">{session.vivaMode} • {session.difficulty}</div>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>{new Date(session.startedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{session.completedQuestions} Questions Evaluated</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
