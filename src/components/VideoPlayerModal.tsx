import React, { useState, useEffect } from 'react';
import { X, Youtube, ExternalLink, Sparkles, CheckCircle2, FileCode2, Code, Languages, Search, Play } from 'lucide-react';
import { EducatorVideoInfo, isValidEducatorVideo, getVideoSolutionForQuestion } from '../utils/videoUtils';
import { recordHistoryItem } from '../utils/historyService';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  questionObject?: any;
  educatorVideo?: EducatorVideoInfo | null;
  onViewWrittenSolution?: () => void;
  onPracticeProblem?: () => void;
  initialLanguage?: 'English' | 'Hindi';
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  videoTitle,
  questionObject,
  educatorVideo: propEducatorVideo,
  onViewWrittenSolution,
  onPracticeProblem,
  initialLanguage = 'English'
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hindi'>(initialLanguage);
  const [currentVideo, setCurrentVideo] = useState<EducatorVideoInfo | null>(propEducatorVideo || null);

  useEffect(() => {
    setSelectedLanguage(initialLanguage);
  }, [initialLanguage, videoTitle]);

  useEffect(() => {
    if (isOpen && videoTitle) {
      recordHistoryItem({
        title: videoTitle,
        category: questionObject?.category || 'Video Solution',
        actionType: 'video',
        englishAnswer: `Watched ${selectedLanguage} Video Solution for ${videoTitle}`,
        hindiExplanation: `${videoTitle} का वीडियो समाधान देखा।`
      });
    }
  }, [isOpen, videoTitle]);

  useEffect(() => {
    const targetQ = questionObject || videoTitle;
    const resolvedVideo = getVideoSolutionForQuestion(targetQ, selectedLanguage);
    setCurrentVideo(resolvedVideo);
  }, [selectedLanguage, videoTitle, questionObject, propEducatorVideo]);

  if (!isOpen) return null;

  const isVerified = isValidEducatorVideo(currentVideo) && !currentVideo?.isFallbackSearch && currentVideo?.videoId;

  const searchEducator = selectedLanguage === 'Hindi' ? 'Striver / Take U Forward' : 'NeetCode / Abdul Bari';
  const searchQuery = currentVideo?.searchQuery || `${videoTitle} ${selectedLanguage === 'Hindi' ? 'Striver' : 'NeetCode'} ${selectedLanguage} solution`;
  const searchUrl = currentVideo?.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-rose-500/30 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-4 sm:px-6 border-b border-slate-800 bg-slate-950 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl border shrink-0 bg-rose-950/80 border-rose-500/40 text-rose-400">
              <Youtube className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                  {isVerified ? `${currentVideo?.educatorName} Masterclass` : 'Educator Video Solution'}
                </span>
                {isVerified ? (
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold font-mono bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                    <CheckCircle2 className="h-3 w-3" /> Exact Mapped Video ({currentVideo?.language})
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold font-mono bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
                    <Search className="h-3 w-3" /> Verified Educator Search ({selectedLanguage})
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white font-mono mt-0.5 truncate max-w-lg sm:max-w-xl">
                {videoTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold px-2 flex items-center gap-1">
                <Languages className="h-3 w-3 text-cyan-400" /> Lang:
              </span>
              <button
                onClick={() => setSelectedLanguage('English')}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  selectedLanguage === 'English'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setSelectedLanguage('Hindi')}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  selectedLanguage === 'Hindi'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇮🇳 Hindi
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer shrink-0"
              title="Close video modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {isVerified && currentVideo?.videoId ? (
          <>
            {/* Verified Video Player Frame */}
            <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={currentVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Watch Link Launcher */}
            <div className="p-3.5 sm:p-4 sm:px-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Verified <strong>{currentVideo.educatorName}</strong> ({currentVideo.language}) lecture matching <strong>{videoTitle}</strong>.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
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
          </>
        ) : (
          /* Educator Video Search Fallback Launcher */
          <div className="p-6 sm:p-10 text-center space-y-6 bg-slate-950 font-mono my-auto">
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 max-w-xl mx-auto space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <Youtube className="h-4 w-4" /> Recommended {selectedLanguage} Educator:
                </span>
                <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-200 border border-rose-700 font-bold">
                  {searchEducator}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-extrabold">YouTube Search Query:</span>
                <p className="text-xs font-bold text-amber-300 font-mono">"{searchQuery}"</p>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Click below to launch the verified educator video explanation for <strong>"{videoTitle}"</strong> on YouTube.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:brightness-110 text-white text-sm font-bold font-mono transition-all shadow-xl shadow-rose-600/30 inline-flex items-center gap-2 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Watch {selectedLanguage} Educator Video on YouTube ↗</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              {onViewWrittenSolution && (
                <button
                  onClick={() => {
                    onViewWrittenSolution();
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl border border-cyan-500/40 bg-cyan-950 text-cyan-300 hover:bg-cyan-900/60 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <FileCode2 className="h-4 w-4" />
                  <span>View Written Solution</span>
                </button>
              )}

              {onPracticeProblem && (
                <button
                  onClick={() => {
                    onPracticeProblem();
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl border border-emerald-500/40 bg-emerald-950 text-emerald-300 hover:bg-emerald-900/60 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Code className="h-4 w-4" />
                  <span>Practice This Problem</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
