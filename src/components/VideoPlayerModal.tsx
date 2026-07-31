import React from 'react';
import { X, Youtube, ExternalLink, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { getVerifiedVideoForQuestion } from '../utils/videoUtils';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  youtubeId?: string;
  videoQuery?: string;
  educator?: string;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  videoTitle,
  youtubeId,
  videoQuery = '',
  educator = 'Top Tech Educator'
}) => {
  if (!isOpen) return null;

  // Resolve verified video ID & clean search query
  const fallbackInfo = getVerifiedVideoForQuestion(videoTitle, '', educator);
  const activeYoutubeId = youtubeId || fallbackInfo.youtubeId;
  const activeQuery = videoQuery || fallbackInfo.videoQuery || `${videoTitle} solution tutorial`;

  // Standard YouTube embed URL (most compatible)
  const embedUrl = `https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&rel=0&modestbranding=1`;

  // Direct YouTube watch link
  const youtubeDirectUrl = `https://www.youtube.com/watch?v=${activeYoutubeId}`;

  // YouTube Search link for alternative educator solutions
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(activeQuery)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-cyan-500/30 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 sm:px-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 shrink-0">
              <Youtube className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  {educator} Masterclass
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold font-mono bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                  <CheckCircle2 className="h-3 w-3" /> Verified Solution
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white font-mono mt-0.5 truncate max-w-lg sm:max-w-xl">
                {videoTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer shrink-0 ml-2"
            title="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center overflow-hidden">
          <iframe
            src={embedUrl}
            title={videoTitle}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Fail-Safe Notice & Direct Watch Launcher */}
        <div className="p-3.5 sm:p-4 sm:px-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
            <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>If video frame is unavailable or blocked by YouTube in iframe, watch directly!</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono transition-all border border-slate-700"
            >
              <Search className="h-3.5 w-3.5 text-cyan-400" />
              <span>Search All Educator Solutions ↗</span>
            </a>

            <a
              href={youtubeDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:brightness-110 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-rose-600/20"
            >
              <Youtube className="h-4 w-4" />
              <span>Watch Live on YouTube ↗</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

