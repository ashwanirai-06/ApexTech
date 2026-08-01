import React, { useState, useEffect } from 'react';

interface InteractiveMascotProps {
  focusedField: 'username' | 'password' | null;
  showPassword: boolean;
  textLength: number;
  className?: string;
}

export type MascotType = 'husky' | 'owl' | 'robot';

export const InteractiveMascot: React.FC<InteractiveMascotProps> = ({
  focusedField,
  showPassword,
  textLength,
  className = ''
}) => {
  const [mascotType, setMascotType] = useState<MascotType>('husky');
  const [blink, setBlink] = useState(false);

  // Random blink interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3500 + Math.random() * 5000+);
    return () => clearInterval(interval);
  }, []);

  // Calculate eye pupil position when typing username
  const calculatePupilOffset = () => {
    if (focusedField === 'username') {
      const maxOffset = 8;
      const progress = Math.min(textLength / 16, 1);
      const x = -maxOffset + progress * (maxOffset * 2);
      const y = 5; // Look down at input box
      return { x, y };
    }
    if (focusedField === 'password') {
      if (showPassword) {
        return { x: 0, y: 2 }; // Look down with curiosity
      }
      return { x: 0, y: 0 }; // Covered eyes
    }
    return { x: 0, y: 0 }; // Idle
  };

  const pupilOffset = calculatePupilOffset();

  // Determine Paw / Wing / Arm position
  const isCoveringEyes = focusedField === 'password' && !showPassword;
  const isPeeking = focusedField === 'password' && showPassword;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* Top Header Pill Row: Switcher & Status Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-1 z-20">
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 rounded-full p-0.5 text-[10px] text-slate-300 shadow-md backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMascotType('husky')}
            className={`px-2 py-0.5 rounded-full transition-all font-bold ${
              mascotType === 'husky'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'hover:text-white text-slate-400'
            }`}
          >
            🐶 Husky
          </button>
          <button
            type="button"
            onClick={() => setMascotType('owl')}
            className={`px-2 py-0.5 rounded-full transition-all font-bold ${
              mascotType === 'owl'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'hover:text-white text-slate-400'
            }`}
          >
            🦉 Owl AI
          </button>
          <button
            type="button"
            onClick={() => setMascotType('robot')}
            className={`px-2 py-0.5 rounded-full transition-all font-bold ${
              mascotType === 'robot'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'hover:text-white text-slate-400'
            }`}
          >
            🤖 Cyber Bot
          </button>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-cyan-300/90 bg-slate-900/90 px-2.5 py-1 rounded-full border border-cyan-500/30 shadow-md backdrop-blur-md">
          <span>
            {focusedField === 'password'
              ? showPassword
                ? '🙈 Peeking!'
                : '🙈 Eyes Closed'
              : focusedField === 'username'
              ? '👀 Watching...'
              : '👋 Hello!'}
          </span>
        </div>
      </div>

      {/* MASCOT SVG CANVAS */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(6,182,212,0.25)] transition-all duration-300">
        
        {/* ================= HUSKY MASCOT ================= */}
        {mascotType === 'husky' && (
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="husky-fur" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="husky-white" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
              <linearGradient id="husky-eye-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            <g>
              {/* Ears */}
              <polygon points="42,75 22,20 72,48" fill="url(#husky-fur)" stroke="#0f172a" strokeWidth="3" />
              <polygon points="46,68 32,32 66,50" fill="#f43f5e" opacity="0.7" />
              <polygon points="158,75 178,20 128,48" fill="url(#husky-fur)" stroke="#0f172a" strokeWidth="3" />
              <polygon points="154,68 168,32 134,50" fill="#f43f5e" opacity="0.7" />

              {/* Head Base */}
              <ellipse cx="100" cy="100" rx="60" ry="52" fill="url(#husky-fur)" stroke="#0f172a" strokeWidth="3" />

              {/* White Face Mask */}
              <path d="M 60,78 Q 100,68 140,78 Q 155,108 140,132 Q 100,150 60,132 Q 45,108 60,78 Z" fill="url(#husky-white)" />
              <path d="M 100,68 L 100,98" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

              {/* Eyes */}
              <g transform="translate(74, 82)">
                {(isCoveringEyes || blink) ? (
                  <g>
                    <ellipse cx="0" cy="0" rx="13" ry="14" fill="#e2e8f0" opacity="0.7" />
                    <path d="M -11 -2 Q 0 7 11 -2" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 8 -1 L 12 -5" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                ) : (
                  <>
                    <ellipse cx="0" cy="0" rx="14" ry="16" fill="#0f172a" />
                    <ellipse cx="0" cy="0" rx="12" ry="14" fill="#ffffff" />
                    <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                      <circle cx="0" cy="0" r="9" fill="url(#husky-eye-grad)" />
                      <circle cx="0" cy="0" r="4.5" fill="#020617" />
                      <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
                      <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
                    </g>
                  </>
                )}
              </g>

              <g transform="translate(126, 82)">
                {(isCoveringEyes || blink) ? (
                  <g>
                    <ellipse cx="0" cy="0" rx="13" ry="14" fill="#e2e8f0" opacity="0.7" />
                    <path d="M -11 -2 Q 0 7 11 -2" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M -8 -1 L -12 -5" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                ) : (
                  <>
                    <ellipse cx="0" cy="0" rx="14" ry="16" fill="#0f172a" />
                    <ellipse cx="0" cy="0" rx="12" ry="14" fill="#ffffff" />
                    <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                      <circle cx="0" cy="0" r="9" fill="url(#husky-eye-grad)" />
                      <circle cx="0" cy="0" r="4.5" fill="#020617" />
                      <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
                      <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
                    </g>
                  </>
                )}
              </g>

              {/* Mouth & Snout */}
              <ellipse cx="100" cy="112" rx="18" ry="12" fill="#020617" />
              <path d="M 94,118 Q 100,126 106,118" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

              {/* Cute Tongue */}
              {focusedField === 'username' && textLength > 0 && (
                <path d="M 96,121 Q 100,132 104,121 Z" fill="#f43f5e" />
              )}

              {/* Paws */}
              <g
                className="transition-transform duration-300 ease-out origin-bottom-left"
                style={{
                  transform: isCoveringEyes
                    ? 'translate(6px, -78px) rotate(15deg) scale(1.15)'
                    : isPeeking
                    ? 'translate(12px, -45px) rotate(20deg)'
                    : 'translate(0px, 0px)'
                }}
              >
                <ellipse cx="58" cy="160" rx="22" ry="18" fill="url(#husky-fur)" stroke="#0f172a" strokeWidth="3" />
                <circle cx="58" cy="162" r="10" fill="#f1f5f9" />
              </g>

              <g
                className="transition-transform duration-300 ease-out origin-bottom-right"
                style={{
                  transform: isCoveringEyes
                    ? 'translate(-6px, -78px) rotate(-15deg) scale(1.15)'
                    : isPeeking
                    ? 'translate(-12px, -45px) rotate(-20deg)'
                    : 'translate(0px, 0px)'
                }}
              >
                <ellipse cx="142" cy="160" rx="22" ry="18" fill="url(#husky-fur)" stroke="#0f172a" strokeWidth="3" />
                <circle cx="142" cy="162" r="10" fill="#f1f5f9" />
              </g>
            </g>
          </svg>
        )}

        {/* ================= OWL MASCOT ================= */}
        {mascotType === 'owl' && (
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="owl-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
            </defs>

            <g>
              {/* Ear Tufts */}
              <polygon points="52,65 35,22 75,52" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
              <polygon points="148,65 165,22 125,52" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />

              {/* Body */}
              <ellipse cx="100" cy="105" rx="56" ry="50" fill="url(#owl-body-grad)" stroke="#a855f7" strokeWidth="2" />

              {/* Chest Patch */}
              <ellipse cx="100" cy="120" rx="32" ry="26" fill="#f8fafc" opacity="0.9" />

              {/* Glasses */}
              <circle cx="75" cy="92" r="20" stroke="#06b6d4" strokeWidth="3" fill="none" />
              <circle cx="125" cy="92" r="20" stroke="#06b6d4" strokeWidth="3" fill="none" />
              <line x1="95" y1="92" x2="105" y2="92" stroke="#06b6d4" strokeWidth="3" />

              {/* Left Eye */}
              <g transform="translate(75, 92)">
                {(isCoveringEyes || blink) ? (
                  <g>
                    <circle cx="0" cy="0" r="15" fill="#e2e8f0" opacity="0.8" />
                    <path d="M -11 -2 Q 0 7 11 -2" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                ) : (
                  <>
                    <circle cx="0" cy="0" r="16" fill="#ffffff" />
                    <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                      <circle cx="0" cy="0" r="9" fill="#0284c7" />
                      <circle cx="0" cy="0" r="4.5" fill="#020617" />
                      <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
                    </g>
                  </>
                )}
              </g>

              {/* Right Eye */}
              <g transform="translate(125, 92)">
                {(isCoveringEyes || blink) ? (
                  <g>
                    <circle cx="0" cy="0" r="15" fill="#e2e8f0" opacity="0.8" />
                    <path d="M -11 -2 Q 0 7 11 -2" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                ) : (
                  <>
                    <circle cx="0" cy="0" r="16" fill="#ffffff" />
                    <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                      <circle cx="0" cy="0" r="9" fill="#0284c7" />
                      <circle cx="0" cy="0" r="4.5" fill="#020617" />
                      <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
                    </g>
                  </>
                )}
              </g>

              {/* Beak */}
              <polygon points="100,102 106,112 94,112" fill="#f59e0b" />

              {/* Wings */}
              <g
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: isCoveringEyes
                    ? 'translate(22px, -28px) rotate(25deg)'
                    : isPeeking
                    ? 'translate(15px, -12px) rotate(15deg)'
                    : 'translate(0px, 0px)'
                }}
              >
                <path d="M 44 105 C 30 115, 30 145, 52 145 C 65 145, 68 120, 52 105 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
              </g>

              <g
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: isCoveringEyes
                    ? 'translate(-22px, -28px) rotate(-25deg)'
                    : isPeeking
                    ? 'translate(-15px, -12px) rotate(-15deg)'
                    : 'translate(0px, 0px)'
                }}
              >
                <path d="M 156 105 C 170 115, 170 145, 148 145 C 135 145, 132 120, 148 105 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
              </g>
            </g>
          </svg>
        )}

        {/* ================= ROBOT MASCOT ================= */}
        {mascotType === 'robot' && (
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="bot-head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            <g>
              {/* Antenna */}
              <line x1="100" y1="50" x2="100" y2="28" stroke="#06b6d4" strokeWidth="4" />
              <circle cx="100" cy="24" r="8" fill="#06b6d4" className="animate-pulse" />

              {/* Head Shell */}
              <rect x="45" y="50" width="110" height="90" rx="24" fill="url(#bot-head-grad)" stroke="#06b6d4" strokeWidth="3" />

              {/* Visor Screen */}
              <rect x="58" y="66" width="84" height="42" rx="12" fill="#020617" stroke="#334155" strokeWidth="2" />

              {/* Left Eye LED */}
              <g transform="translate(78, 87)">
                {(isCoveringEyes || blink) ? (
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                ) : (
                  <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                    <circle cx="0" cy="0" r="11" fill="#06b6d4" />
                    <circle cx="0" cy="0" r="5" fill="#ffffff" />
                  </g>
                )}
              </g>

              {/* Right Eye LED */}
              <g transform="translate(122, 87)">
                {(isCoveringEyes || blink) ? (
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                ) : (
                  <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                    <circle cx="0" cy="0" r="11" fill="#06b6d4" />
                    <circle cx="0" cy="0" r="5" fill="#ffffff" />
                  </g>
                )}
              </g>

              {/* Digital Speaker Mouth */}
              <rect x="80" y="118" width="40" height="8" rx="4" fill="#334155" />
              <line x1="86" y1="122" x2="114" y2="122" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />

              {/* Robotic Claws / Shields */}
              <g
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: isCoveringEyes
                    ? 'translate(18px, -35px) rotate(15deg)'
                    : isPeeking
                    ? 'translate(10px, -15px) rotate(10deg)'
                    : 'translate(0px, 0px)'
                }}
              >
                <rect x="30" y="125" width="28" height="36" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              </g>

              <g
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: isCoveringEyes
                    ? 'translate(-18px, -35px) rotate(-15deg)'
                    : isPeeking
                    ? 'translate(-10px, -15px) rotate(-10deg)'
                    : 'translate(0px, 0px)'
                }}
              >
                <rect x="142" y="125" width="28" height="36" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              </g>
            </g>
          </svg>
        )}

      </div>

    </div>
  );
};
