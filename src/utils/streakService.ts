export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalDaysStudied: number;
  streakFreezeCount: number;
  weeklyActivity: boolean[]; // 7 elements [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  historyDates: string[]; // List of YYYY-MM-DD
  level: number;
  badgesEarned: string[];
}

const STORAGE_KEY = 'apexaktu_streak_data_v3';

const getTodayString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getYesterdayString = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Calculate 7-day boolean array for current week [Mon..Sun]
const calculateWeeklyActivity = (historyDates: string[]): boolean[] => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sun, 1 is Mon...
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const weekly: boolean[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    weekly.push(historyDates.includes(dateStr));
  }
  return weekly;
};

export const StreakService = {
  getStreakData(): StreakData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StreakData = JSON.parse(raw);
        const today = getTodayString();
        const yesterday = getYesterdayString();

        // Check if streak broke (>1 day inactive)
        if (parsed.lastActiveDate && parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
          // If user had streak freeze, consume one to save streak
          if (parsed.streakFreezeCount > 0) {
            parsed.streakFreezeCount -= 1;
            parsed.lastActiveDate = yesterday; // Protect yesterday
          } else {
            parsed.currentStreak = 0; // Streak reset
          }
        }

        parsed.weeklyActivity = calculateWeeklyActivity(parsed.historyDates || []);
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load streak data:', e);
    }

    // Default initial streak data for new users (1 Day active start)
    const today = getTodayString();
    const initialDates: string[] = [today];

    const defaultData: StreakData = {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
      totalDaysStudied: 1,
      streakFreezeCount: 0,
      weeklyActivity: [false, false, false, false, false, false, false],
      historyDates: initialDates,
      level: 1,
      badgesEarned: ['Day 1 Starter']
    };

    defaultData.weeklyActivity = calculateWeeklyActivity(defaultData.historyDates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  },

  recordActivity(): StreakData {
    const data = this.getStreakData();
    const today = getTodayString();
    const yesterday = getYesterdayString();

    if (!data.historyDates.includes(today)) {
      data.historyDates.push(today);
      data.totalDaysStudied += 1;

      if (data.lastActiveDate === yesterday) {
        data.currentStreak += 1;
      } else if (data.lastActiveDate === today) {
        // Already active today
      } else {
        // Streak was broken or fresh start
        data.currentStreak = 1;
      }

      data.lastActiveDate = today;
      if (data.currentStreak > data.longestStreak) {
        data.longestStreak = data.currentStreak;
      }

      // Unlock badges
      if (data.currentStreak >= 3 && !data.badgesEarned.includes('3-Day Spark')) {
        data.badgesEarned.push('3-Day Spark');
      }
      if (data.currentStreak >= 7 && !data.badgesEarned.includes('7-Day Flame')) {
        data.badgesEarned.push('7-Day Flame');
      }
      if (data.currentStreak >= 14 && !data.badgesEarned.includes('14-Day Titan')) {
        data.badgesEarned.push('14-Day Titan');
      }
      if (data.currentStreak >= 30 && !data.badgesEarned.includes('30-Day AKTU Legend')) {
        data.badgesEarned.push('30-Day AKTU Legend');
      }

      data.weeklyActivity = calculateWeeklyActivity(data.historyDates);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // Trigger custom window event so Navbar & Dashboard refresh live!
      window.dispatchEvent(new Event('apexaktu_streak_updated'));
    }

    return data;
  },

  buyStreakFreeze(): boolean {
    const data = this.getStreakData();
    data.streakFreezeCount += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('apexaktu_streak_updated'));
    return true;
  }
};
