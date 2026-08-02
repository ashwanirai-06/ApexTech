import React, { useState, useEffect } from 'react';
import { History, Search, Trash2, Calendar, Volume2, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { TtsAudioPlayer } from '../components/TtsAudioPlayer';
import { getHistoryItems, clearHistoryItems, HistoryItem } from '../utils/historyService';

export const HistoryPage: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const reloadHistory = () => {
    setHistoryItems(getHistoryItems());
  };

  useEffect(() => {
    reloadHistory();
    window.addEventListener('apextech_history_updated', reloadHistory);
    return () => window.removeEventListener('apextech_history_updated', reloadHistory);
  }, []);

  const handleClearHistory = () => {
    if (confirm('Clear all local interview history logs?')) {
      clearHistoryItems();
      setHistoryItems([]);
      setSelectedItem(null);
      setSearchQuery('');
    }
  };

  const filteredItems = historyItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 font-mono">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="h-5 w-5 text-cyan-400" />
            <span>Practice & AI Response History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Revisit previously solved questions, listen to audio summaries, and track your interview evolution.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-950/30 text-xs font-bold text-rose-300 hover:bg-rose-900/40 cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search history by question title or category..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* History Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`p-4 rounded-2xl border text-left space-y-3 transition-all cursor-pointer bg-slate-950 ${
              selectedItem?.id === item.id ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                {item.category}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {item.timestamp}
              </span>
            </div>

            <h3 className="text-xs font-bold text-white line-clamp-2">{item.title}</h3>

            {item.score && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                <span className="text-slate-400">AI Score</span>
                <span className="font-bold text-emerald-400">{item.score}/100</span>
              </div>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full p-8 rounded-2xl border border-slate-800 bg-slate-950 text-center space-y-2">
            <History className="h-8 w-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No practice history matching your filter.</p>
          </div>
        )}
      </div>

      {/* Detail Viewer Modal / Card */}
      {selectedItem && (
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-950 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div>
              <span className="text-[10px] text-cyan-400 font-bold block">{selectedItem.category}</span>
              <h2 className="text-sm font-bold text-white">{selectedItem.title}</h2>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Close Viewer
            </button>
          </div>

          <TtsAudioPlayer
            englishText={selectedItem.englishAnswer}
            hindiText={selectedItem.hindiExplanation}
            title="Recorded Response Audio"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 block">🇺🇸 English Record</span>
              <div className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-line">
                {selectedItem.englishAnswer}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 block">🇮🇳 हिन्दी रिकॉर्ड</span>
              <div className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-line">
                {selectedItem.hindiExplanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
