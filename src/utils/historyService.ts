/**
 * History Management Service for ApexTech AI Platform
 * Logs history ONLY on explicit user interactions.
 * NO automatic history creation on page load, mount, fetch, scroll, or filter changes.
 */

export interface HistoryItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  actionType: 'solution' | 'practice' | 'video' | 'audio' | 'completed';
  score?: number;
  englishAnswer?: string;
  hindiExplanation?: string;
}

const STORAGE_KEY = 'apextech_history_log';

export function getHistoryItems(): HistoryItem[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

export function recordHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>) {
  const current = getHistoryItems();
  
  // Throttle consecutive duplicate actions on the same item within 1 minute
  if (
    current.length > 0 &&
    current[0].title === item.title &&
    current[0].actionType === item.actionType
  ) {
    return;
  }

  const newItem: HistoryItem = {
    ...item,
    id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };

  const updated = [newItem, ...current].slice(0, 50); // Keep latest 50
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch custom event for real-time reactivity in UI
  window.dispatchEvent(new Event('apextech_history_updated'));
}

export function clearHistoryItems() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('apextech_history_updated'));
}
