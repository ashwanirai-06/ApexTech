import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, RotateCcw, Sparkles, CheckCircle2, Globe, AlertCircle } from 'lucide-react';
import { recordHistoryItem } from '../utils/historyService';

export interface TtsAudioPlayerProps {
  englishText: string;
  hindiText: string;
  title?: string;
  autoPlayDefault?: boolean;
}

export type VoiceLanguage = 'en' | 'hi';

export const TtsAudioPlayer: React.FC<TtsAudioPlayerProps> = ({
  englishText,
  hindiText,
  title = 'Bilingual AI Voice Engine',
  autoPlayDefault = false
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<VoiceLanguage>('en');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanTextForSpeech = (rawText: string): string => {
    if (!rawText) return 'Answer text unavailable for audio readout.';
    return rawText
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/```[\s\S]*?```/g, 'Code snippet omitted for speech synthesis.')
      .replace(/`/g, '')
      .replace(/#/g, '')
      .replace(/- /g, '')
      .trim();
  };

  const handlePlayVoice = (langToPlay: VoiceLanguage = selectedLanguage) => {
    setVoiceError(null);

    if (!isSupported) {
      setVoiceError('Voice unavailable. Please try again.');
      return;
    }

    try {
      // If paused on same language, resume
      if (isPaused && utteranceRef.current && selectedLanguage === langToPlay) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setIsPaused(false);
        return;
      }

      // If currently playing same language, pause
      if (isPlaying && selectedLanguage === langToPlay) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
        setIsPaused(true);
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // STRICT SYNCHRONIZATION:
      // English selected -> English text + en-US voice
      // Hindi selected -> Hindi text + hi-IN voice
      const targetText = langToPlay === 'en' ? englishText : hindiText;
      const cleanSpeech = cleanTextForSpeech(targetText);

      if (!cleanSpeech) {
        setVoiceError('Voice unavailable. Please try again.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.rate = speechRate;
      utterance.lang = langToPlay === 'hi' ? 'hi-IN' : 'en-US';

      // Pick browser voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find(v => 
          langToPlay === 'hi' ? v.lang.startsWith('hi') : v.lang.startsWith('en')
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setVoiceError('Voice unavailable. Please try again.');
      };

      utteranceRef.current = utterance;
      setSelectedLanguage(langToPlay);
      
      // Record user listening to audio history item
      recordHistoryItem({
        title: title || 'Audio Solution Response',
        category: 'Audio Readout',
        actionType: 'audio',
        englishAnswer: englishText,
        hindiExplanation: hindiText
      });

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    } catch (err) {
      setIsPlaying(false);
      setIsPaused(false);
      setVoiceError('Voice unavailable. Please try again.');
    }
  };

  const handlePauseVoice = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleReplayVoice = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setTimeout(() => {
      handlePlayVoice(selectedLanguage);
    }, 100);
  };

  const handleStopVoice = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const activeText = selectedLanguage === 'en' 
    ? (englishText || 'English response text detailing optimal approach and complexity.')
    : (hindiText || 'हिन्दी भाषा में उत्तर एवं विश्लेषण।');

  return (
    <div className="p-4 rounded-2xl border border-cyan-500/30 bg-slate-950 shadow-2xl space-y-4 font-mono">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Volume2 className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white block">{title}</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Audio & Text Synced
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Synchronized AI Text & Voice Readout
            </span>
          </div>
        </div>

        {/* Voice Control Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-[11px]">
            <button
              onClick={() => {
                setSelectedLanguage('en');
                if (isPlaying || isPaused) {
                  handleStopVoice();
                  setTimeout(() => handlePlayVoice('en'), 50);
                }
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                selectedLanguage === 'en'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇬🇧 English Voice
            </button>
            <button
              onClick={() => {
                setSelectedLanguage('hi');
                if (isPlaying || isPaused) {
                  handleStopVoice();
                  setTimeout(() => handlePlayVoice('hi'), 50);
                }
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                selectedLanguage === 'hi'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇮🇳 Hindi Voice
            </button>
          </div>

          {/* Speed Control */}
          <select
            value={speechRate}
            onChange={(e) => {
              const newRate = parseFloat(e.target.value);
              setSpeechRate(newRate);
              if (isPlaying) {
                handleStopVoice();
              }
            }}
            className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-[11px] text-slate-300 font-mono focus:outline-none cursor-pointer"
            title="Speech Speed"
          >
            <option value="0.8">0.8x Slow</option>
            <option value="1.0">1.0x Normal</option>
            <option value="1.2">1.2x Fast</option>
            <option value="1.5">1.5x Rapid</option>
          </select>

          {/* Play / Pause / Replay Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePlayVoice(selectedLanguage)}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                isPlaying
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
              title={isPlaying ? 'Pause Audio' : 'Play Voice'}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={handleReplayVoice}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
              title="Replay Audio"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Synchronized Text Card */}
      <div className={`p-4 rounded-xl border transition-all ${
        isPlaying
          ? selectedLanguage === 'en'
            ? 'border-cyan-400 bg-cyan-950/20 shadow-lg ring-1 ring-cyan-500/40'
            : 'border-amber-400 bg-amber-950/20 shadow-lg ring-1 ring-amber-500/40'
          : 'border-slate-800 bg-slate-900/60'
      }`}>
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2.5">
          <div className="flex items-center gap-2">
            <span>{selectedLanguage === 'en' ? '🇬🇧' : '🇮🇳'}</span>
            <span className="text-xs font-bold text-white">
              {selectedLanguage === 'en' ? 'English Synchronized Text & Audio' : 'हिन्दी भाषा में अनुवादित विवरण (Hindi Synced)'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Speaker: {selectedLanguage === 'en' ? 'en-US Voice' : 'hi-IN Voice'}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 max-h-52 overflow-y-auto">
          <p className="text-xs font-sans text-slate-200 leading-relaxed whitespace-pre-line">
            {activeText}
          </p>
        </div>
      </div>

      {/* Error / Fallback State */}
      {voiceError && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{voiceError}</span>
        </div>
      )}
    </div>
  );
};
