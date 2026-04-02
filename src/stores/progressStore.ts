import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CharProgress {
  char: string;
  learned: boolean;
  correctCount: number;
  wrongCount: number;
  lastReviewed: string | null;
  nextReview: string | null;
}

interface ProgressState {
  charProgress: Record<string, CharProgress>;
  completedChapters: string[];
  currentChapter: string;
  markLearned: (char: string) => void;
  recordAnswer: (char: string, correct: boolean) => void;
  completeChapter: (chapterId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  getChapterProgress: (chapterId: string, chars: string[]) => number;
  isChapterUnlocked: (chapterId: string, order: number) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      charProgress: {},
      completedChapters: [],
      currentChapter: 'a-row',

      markLearned: (char) =>
        set((state) => ({
          charProgress: {
            ...state.charProgress,
            [char]: {
              ...state.charProgress[char],
              char,
              learned: true,
              correctCount: state.charProgress[char]?.correctCount ?? 0,
              wrongCount: state.charProgress[char]?.wrongCount ?? 0,
              lastReviewed: new Date().toISOString(),
              nextReview: null,
            },
          },
        })),

      recordAnswer: (char, correct) =>
        set((state) => {
          const prev = state.charProgress[char] || {
            char,
            learned: false,
            correctCount: 0,
            wrongCount: 0,
            lastReviewed: null,
            nextReview: null,
          };
          const now = new Date();
          // Simple spaced repetition: next review in increasing intervals
          const interval = correct
            ? Math.min((prev.correctCount + 1) * 24, 168) // max 7 days
            : 1; // review again in 1 hour if wrong
          const nextReview = new Date(
            now.getTime() + interval * 60 * 60 * 1000
          ).toISOString();

          return {
            charProgress: {
              ...state.charProgress,
              [char]: {
                ...prev,
                correctCount: correct
                  ? prev.correctCount + 1
                  : prev.correctCount,
                wrongCount: correct ? prev.wrongCount : prev.wrongCount + 1,
                lastReviewed: now.toISOString(),
                nextReview,
              },
            },
          };
        }),

      completeChapter: (chapterId) =>
        set((state) => ({
          completedChapters: state.completedChapters.includes(chapterId)
            ? state.completedChapters
            : [...state.completedChapters, chapterId],
        })),

      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),

      getChapterProgress: (_chapterId, chars) => {
        const state = get();
        if (chars.length === 0) return 0;
        const learned = chars.filter(
          (c) => state.charProgress[c]?.learned
        ).length;
        return Math.round((learned / chars.length) * 100);
      },

      isChapterUnlocked: (_, order) => {
        const state = get();
        if (order === 1) return true;
        // Unlock if previous chapter is completed
        // Chapters are ordered, so check if any chapter with order-1 is completed
        return state.completedChapters.length >= order - 1;
      },
    }),
    {
      name: 'memora-progress',
    }
  )
);
