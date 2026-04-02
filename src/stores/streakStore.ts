import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  startDate: string | null; // First ever visit
  visitDates: string[]; // Array of date strings (YYYY-MM-DD)
  todayCompleted: boolean;
  recordVisit: () => void;
  getTotalDays: () => number;
  isDateVisited: (date: string) => boolean;
}

function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      startDate: null,
      visitDates: [],
      todayCompleted: false,

      recordVisit: () => {
        const state = get();
        const today = getDateString();

        if (state.visitDates.includes(today)) {
          set({ todayCompleted: true });
          return;
        }

        const yesterday = getDateString(
          new Date(Date.now() - 24 * 60 * 60 * 1000)
        );
        const wasYesterday = state.visitDates.includes(yesterday);
        const newStreak = wasYesterday ? state.currentStreak + 1 : 1;
        const newLongest = Math.max(state.longestStreak, newStreak);

        set({
          currentStreak: newStreak,
          longestStreak: newLongest,
          startDate: state.startDate || today,
          visitDates: [...state.visitDates, today],
          todayCompleted: true,
        });
      },

      getTotalDays: () => {
        return get().visitDates.length;
      },

      isDateVisited: (date) => {
        return get().visitDates.includes(date);
      },
    }),
    {
      name: 'memora-streak',
    }
  )
);
