import React, { useState, useEffect } from 'react';

interface HuskyExaminerAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  isEvaluating: boolean;
  isClosedEyes?: boolean;
  examinerName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HuskyExaminerAvatar: React.FC<HuskyExaminerAvatarProps> = ({
  isSpeaking,
  isListening,
  isEvaluating,
  isClosedEyes = false,
  examinerName = 'EduCore AI Academic Mentor',
  className = '',
  size = 'lg'
}) => {
  const [blink, setBlink] = useState(false);
  const [pupilX, setPupilX] = useState(0);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
    xl: 'w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64'
  }[size];

  // Random blink interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 2800 + Math.random() * 2000+);
    return () => clearInterval(interval);
  }, []);

  // Pupil motion when listening or evaluating
  useEffect(() => {
    if (isListening) {
      const moveInterval = setInterval(() => {
        setPupilX(prev => (prev === 4 ? -4 : 4));
      }, 600);
      return () => clearInterval(moveInterval);
    } else if (isEvaluating) {
      const scanInterval = setInterval(() => {
        setPupilX(prev => (prev >= 6 ? -6 : prev + 3));
      }, 200);
      return () => clearInterval(scanInterval);
    } else {
      setPupilX(0);
    }
  }, [isListening, isEvaluating]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Outer Glowing Holographic Ring */}
      <div className={`relative ${sizeClasses} rounded-full flex items-center justify-center p-2 transition-all duration-500 ${
        isSpeaking
          ? 'bg-purple-950/60 border-2 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)] ring-4 ring-purple-500/20'
          : isListening
          ? 'bg-rose-950/60 border-2 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.5)] ring-4 ring-rose-500/20 animate-pulse'
          : isEvaluating
          ? 'bg-cyan-950/60 border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] ring-4 ring-cyan-500/30'
          : 'bg-slate-900/80 border border-slate-700/80 shadow-[0_0_20px_rgba(15,23,42,0.8)]'
      }`}>

        {/* Dynamic Examiner Status Badge */}
        <div className="absolute -top-3 px-3 py-0.5 rounded-full border border-cyan-500/40 bg-slate-950/90 text-[10px] font-mono font-bold text-cyan-300 shadow-xl backdrop-blur-md z-30 flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${
            isSpeaking ? 'bg-purple-400 animate-ping' :
            isListening ? 'bg-rose-400 animate-ping' :
            isEvaluating ? 'bg-cyan-400 animate-spin' : 'bg-emerald-400'
          }`} />
          <span>
            {isClosedEyes ? '🙈 Password Privacy Mode (Eyes Closed)' :
             isSpeaking ? '🗣️ Speaking Question...' :
             isListening ? '🎙️ Listening to You...' :
             isEvaluating ? '⚡ Evaluating Answer...' : '🎓 AI Smart Mentor Active'}
          </span>
        </div>

        {/* SVG AVATAR */}
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="husky-fur-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="husky-white-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            <linearGradient id="husky-eye-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="husky-eye-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          <g>
            {/* Ears */}
            <polygon points="42,75 22,20 72,48" fill="url(#husky-fur-grad)" stroke="#020617" strokeWidth="3" />
            <polygon points="46,68 32,32 66,50" fill="#f43f5e" opacity="0.8" />
            <polygon points="158,75 178,20 128,48" fill="url(#husky-fur-grad)" stroke="#020617" strokeWidth="3" />
            <polygon points="154,68 168,32 134,50" fill="#f43f5e" opacity="0.8" />

            {/* Head Contour */}
            <ellipse cx="100" cy="100" rx="62" ry="54" fill="url(#husky-fur-grad)" stroke="#020617" strokeWidth="3" />

            {/* White Mask */}
            <path d="M 60,78 Q 100,68 140,78 Q 155,108 140,132 Q 100,150 60,132 Q 45,108 60,78 Z" fill="url(#husky-white-grad)" />
            <path d="M 100,68 L 100,98" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            {/* Cybernetic Eyes (LEFT) */}
            <g transform="translate(74, 82)">
              {(blink || isClosedEyes) ? (
                <path d="M -12 0 Q 0 8 12 0" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
              ) : (
                <>
                  <ellipse cx="0" cy="0" rx="14" ry="16" fill="#020617" />
                  <ellipse cx="0" cy="0" rx="12" ry="14" fill="#ffffff" />
                  <g transform={`translate(${pupilX}, ${isListening ? 2 : 0})`}>
                    <circle cx="0" cy="0" r="9" fill={isListening ? "url(#husky-eye-rose)" : "url(#husky-eye-cyan)"} />
                    <circle cx="0" cy="0" r="4.5" fill="#020617" />
                    <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
                    <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
                  </g>
                </>
              )}
            </g>

            {/* Cybernetic Eyes (RIGHT) */}
            <g transform="translate(126, 82)">
              {(blink || isClosedEyes) ? (
                <path d="M -12 0 Q 0 8 12 0" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
              ) : (
                <>
                  <ellipse cx="0" cy="0" rx="14" ry="16" fill="#020617" />
                  <ellipse cx="0" cy="0" rx="12" ry="14" fill="#ffffff" />
                  <g transform={`translate(${pupilX}, ${isListening ? 2 : 0})`}>
                    <circle cx="0" cy="0" r="9" fill={isListening ? "url(#husky-eye-rose)" : "url(#husky-eye-cyan)"} />
                    <circle cx="0" cy="0" r="4.5" fill="#020617" />
                    <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
                    <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
                  </g>
                </>
              )}
            </g>

            {/* Paws covering eyes if password privacy active */}
            {isClosedEyes && (
              <g className="animate-in fade-in duration-300">
                <ellipse cx="70" cy="80" rx="16" ry="12" fill="#334155" stroke="#020617" strokeWidth="2" />
                <ellipse cx="130" cy="80" rx="16" ry="12" fill="#334155" stroke="#020617" strokeWidth="2" />
              </g>
            )}

            {/* Snout & Nose */}
            <ellipse cx="100" cy="112" rx="18" ry="12" fill="#020617" />
            <path d="M 94,118 Q 100,126 106,118" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />

            {/* Animated Mouth Speaking / Happy Tongue */}
            {isSpeaking ? (
              <ellipse cx="100" cy="125" rx="8" ry="10" fill="#f43f5e" className="animate-pulse" />
            ) : isListening ? (
              <path d="M 96,120 Q 100,128 104,120 Z" fill="#f43f5e" />
            ) : null}
          </g>
        </svg>

        {/* Audio Wave Visualizer Spectrum Bar */}
        {(isSpeaking || isListening) && (
          <div className="absolute -bottom-2 flex items-center gap-1 z-30">
            <span className="h-4 w-1 bg-cyan-400 rounded-full animate-[bounce_0.6s_infinite_100ms]" />
            <span className="h-6 w-1 bg-purple-400 rounded-full animate-[bounce_0.6s_infinite_200ms]" />
            <span className="h-8 w-1 bg-rose-400 rounded-full animate-[bounce_0.6s_infinite_300ms]" />
            <span className="h-5 w-1 bg-cyan-400 rounded-full animate-[bounce_0.6s_infinite_400ms]" />
            <span className="h-7 w-1 bg-indigo-400 rounded-full animate-[bounce_0.6s_infinite_500ms]" />
          </div>
        )}

      </div>

      <div className="mt-2 text-center">
        <h4 className="text-xs font-bold text-white font-mono tracking-tight">{examinerName}</h4>
        <p className="text-[10px] text-slate-400 font-mono">Senior Technical Examiner & Viva Lead</p>
      </div>

    </div>
  );
};
