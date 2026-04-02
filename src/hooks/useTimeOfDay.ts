import { useState, useEffect } from 'react';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

interface TimeTheme {
  period: TimeOfDay;
  bgGradient: string;
  label: string;
  catMood: string;
}

const themes: Record<TimeOfDay, TimeTheme> = {
  morning: {
    period: 'morning',
    bgGradient: 'from-[#FFF5EB] via-[#F5E6D3] to-[#E8D5C0]',
    label: '좋은 아침',
    catMood: '기지개를 켜고 있어요',
  },
  afternoon: {
    period: 'afternoon',
    bgGradient: 'from-[#FAF7F2] via-[#F5E6D3] to-[#D4C4B0]',
    label: '좋은 오후',
    catMood: '신나게 놀고 있어요',
  },
  evening: {
    period: 'evening',
    bgGradient: 'from-[#4A5568] via-[#2D3748] to-[#1A202C]',
    label: '좋은 저녁',
    catMood: '살짝 졸려하고 있어요',
  },
  night: {
    period: 'night',
    bgGradient: 'from-[#1A1A2E] via-[#16213E] to-[#0F3460]',
    label: '조용한 밤',
    catMood: '조용히 공부 중이에요',
  },
};

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

export function useTimeOfDay(): TimeTheme {
  const [time, setTime] = useState<TimeOfDay>(getTimeOfDay);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeOfDay());
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  return themes[time];
}
