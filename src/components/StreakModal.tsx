import React, { useState, useEffect } from 'react';
import { Flame, Shield, Award, Check, Sparkles, X, Calendar, Zap, RefreshCw } from 'lucide-react';
import { StreakService, StreakData } from '../utils/streakService';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({ isOpen, onClose }) => {
  const [streakData, setStreakData] = useState<StreakData>(StreakService.getStreakData());
  const [claimedToday, setClaimedToday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const data = StreakService.getStreakData();
      setStreakData(data);
      const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
      setClaimedToday(data.historyDates.includes(today));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaimStreak = () => {
    const updated = StreakService.recordActivity();
    setStreakData(updated);
    setClaimedToday(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Celebration Particle Glow Effect */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse" />
        </div>
      )}

      <div className="relative w-full max-w-md border border-amber-500/30 bg-slate-900/95 p-6 shadow-2xl shadow-amber-950/50 rounded-3xl backdrop-blur-xl text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Flame Graphic */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-amber-500/30 rounded-full blur-xl animate-pulse" />
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/40 transform hover:scale-110 transition-transform">
              <Flame className="w-10 h-10 text-slate-950 fill-slate-950 animate-bounce" />
            </div>
          </div>

          <h3 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span>{streakData.currentStreak} Day Study Streak</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h3>
          <p className="text-xs text-amber-200/80 mt-1">
            Keep studying AKTU theory or practicing vivas daily to maintain your momentum!
          </p>
        </div>

        {/* Weekly Activity Grid */}
        <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              This Week's Activity
            </span>
            <span>{streakData.weeklyActivity.filter(Boolean).length}/7 Days Done</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {dayNames.map((day, idx) => {
              const active = streakData.weeklyActivity[idx];
              return (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{day}</span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      active
                        ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                        : 'bg-slate-900 border border-slate-800 text-slate-600'
                    }`}
                  >
                    {active ? <Check className="w-5 h-5 stroke-[3]" /> : <span className="text-xs">•</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono uppercase">Longest Streak</p>
              <p className="text-lg font-bold font-mono text-white">{streakData.longestStreak} Days</p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono uppercase">Streak Shields</p>
              <p className="text-lg font-bold font-mono text-white">{streakData.streakFreezeCount} Available</p>
            </div>
          </div>
        </div>

        {/* Badges Preview */}
        <div className="mt-4">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Earned AKTU Streak Badges
          </p>
          <div className="flex flex-wrap gap-2">
            {['3-Day Spark', '5-Day Scholar', '7-Day Flame', '14-Day Titan', '30-Day AKTU Legend'].map((badge) => {
              const earned = streakData.badgesEarned.includes(badge);
              return (
                <span
                  key={badge}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                    earned
                      ? 'border-amber-500/50 bg-amber-950/40 text-amber-300 font-semibold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-600'
                  }`}
                >
                  {earned ? '🔥' : '🔒'} {badge}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleClaimStreak}
            disabled={claimedToday}
            className={`w-full py-3.5 px-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
              claimedToday
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/25 active:scale-95'
            }`}
          >
            {claimedToday ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Today's Streak Claimed!</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Claim Today's Study Streak (+1 Day)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
