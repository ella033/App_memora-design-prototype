import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CatEmotion =
  | 'happy'
  | 'excited'
  | 'sleepy'
  | 'curious'
  | 'proud'
  | 'sad'
  | 'welcome'
  | 'neutral';

export type CatDialogueType =
  | 'greeting'
  | 'correct'
  | 'wrong'
  | 'streak'
  | 'comeback'
  | 'encourage'
  | 'complete';

interface CatState {
  name: string;
  emotion: CatEmotion;
  dialogue: string;
  lastVisit: string | null;
  daysSinceLastVisit: number;
  setName: (name: string) => void;
  setEmotion: (emotion: CatEmotion) => void;
  setDialogue: (dialogue: string) => void;
  updateVisit: () => void;
  getGreeting: () => { emotion: CatEmotion; dialogue: string };
}

const greetings = {
  firstTime: {
    emotion: 'welcome' as CatEmotion,
    dialogue: '안녕! 나는 네 일본어 친구야. 같이 공부하자!',
  },
  sameDay: {
    emotion: 'happy' as CatEmotion,
    dialogue: '또 왔구나! 오늘도 같이 하자~',
  },
  nextDay: {
    emotion: 'happy' as CatEmotion,
    dialogue: '어서와, 오늘도 같이 하자!',
  },
  twoDays: {
    emotion: 'curious' as CatEmotion,
    dialogue: '어제 안 왔네... 오늘은 같이 하자!',
  },
  longAbsence: {
    emotion: 'excited' as CatEmotion,
    dialogue: '왔구나!! 기다렸어!',
  },
};

export const catDialogues: Record<CatDialogueType, string[]> = {
  greeting: ['같이 공부하자!', '오늘도 파이팅!', '준비됐어?'],
  correct: [
    '맞았어! 대단해!',
    '딩동댕! 정답~',
    '역시 잘하네!',
    '오~ 기억하고 있었구나!',
  ],
  wrong: [
    '괜찮아, 다시 해보자!',
    '아깝다~ 한번 더!',
    '틀려도 괜찮아, 그래야 기억에 남아!',
    '음... 같이 다시 볼까?',
  ],
  streak: [
    '연속 정답! 대단해!',
    '와~ 못 말리는데?',
    '이 기세로 쭉 가자!',
  ],
  comeback: [
    '왔구나! 기다렸어~',
    '보고 싶었어!',
    '다시 와줘서 고마워!',
  ],
  encourage: [
    '조금씩이면 돼!',
    '네 속도로 가면 돼~',
    '이미 잘하고 있어!',
    '포기하지 마~ 내가 있잖아!',
  ],
  complete: [
    '챕터 클리어! 축하해!',
    '대단해!! 다 외웠어!',
    '우와~ 진짜 잘했어!',
  ],
};

export const useCatStore = create<CatState>()(
  persist(
    (set, get) => ({
      name: '',
      emotion: 'neutral' as CatEmotion,
      dialogue: '',
      lastVisit: null,
      daysSinceLastVisit: 0,

      setName: (name) => set({ name }),
      setEmotion: (emotion) => set({ emotion }),
      setDialogue: (dialogue) => set({ dialogue }),

      updateVisit: () => {
        const now = new Date();
        const state = get();
        const lastVisit = state.lastVisit
          ? new Date(state.lastVisit)
          : null;

        let daysSince = 0;
        if (lastVisit) {
          daysSince = Math.floor(
            (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
          );
        }

        set({
          lastVisit: now.toISOString(),
          daysSinceLastVisit: daysSince,
        });
      },

      getGreeting: () => {
        const state = get();
        if (!state.lastVisit) return greetings.firstTime;
        if (state.daysSinceLastVisit === 0) return greetings.sameDay;
        if (state.daysSinceLastVisit === 1) return greetings.nextDay;
        if (state.daysSinceLastVisit === 2) return greetings.twoDays;
        return greetings.longAbsence;
      },
    }),
    {
      name: 'memora-cat',
    }
  )
);
