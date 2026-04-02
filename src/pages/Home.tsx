import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CatCharacter from '../components/cat/CatCharacter';
import CatDialogue from '../components/cat/CatDialogue';
import { useCatStore } from '../stores/catStore';
import { useStreakStore } from '../stores/streakStore';
import { useProgressStore } from '../stores/progressStore';
import { useTimeOfDay } from '../hooks/useTimeOfDay';
import { chapters } from '../data/hiragana';

export default function Home() {
  const navigate = useNavigate();
  const timeTheme = useTimeOfDay();
  const { updateVisit, getGreeting, emotion, setEmotion, setDialogue, dialogue } =
    useCatStore();
  const { recordVisit, currentStreak, visitDates } = useStreakStore();
  const { completedChapters } = useProgressStore();
  const [showDialogue, setShowDialogue] = useState(true);
  const isDark = timeTheme.period === 'evening' || timeTheme.period === 'night';

  useEffect(() => {
    const greeting = getGreeting();
    setEmotion(greeting.emotion);
    setDialogue(greeting.dialogue);
    updateVisit();
    recordVisit();
  }, []);

  const totalDays = visitDates.length;
  const totalChapters = chapters.length;
  const completedCount = completedChapters.length;

  const handleCatClick = () => {
    setShowDialogue(!showDialogue);
    if (!showDialogue) {
      const randomDialogues = [
        '같이 공부할까?',
        '오늘 뭐 배울까~',
        '난 여기 있을게!',
        '힘내! 할 수 있어!',
        timeTheme.catMood,
      ];
      setDialogue(
        randomDialogues[Math.floor(Math.random() * randomDialogues.length)]
      );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${timeTheme.bgGradient} pb-20 transition-colors duration-1000`}
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xs ${isDark ? 'text-white/60' : 'text-grey-blue'}`}
        >
          {timeTheme.label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-navy'}`}
        >
          Memora
        </motion.h1>
      </div>

      {/* Stars for night mode */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Cat Area */}
      <div className="flex flex-col items-center px-6 mt-4">
        {/* Dialogue */}
        <CatDialogue message={dialogue} visible={showDialogue} />

        {/* Cat */}
        <div className="mt-4">
          <CatCharacter
            emotion={emotion}
            size="large"
            onClick={handleCatClick}
          />
        </div>

        {/* Cat mood */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-xs mt-2 ${isDark ? 'text-white/50' : 'text-grey-blue/70'}`}
        >
          {timeTheme.catMood}
        </motion.p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-center gap-6 mt-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isDark ? 'bg-white/10' : 'bg-white/70'
          } backdrop-blur-sm`}
        >
          <span className="text-sm">📅</span>
          <span className={`text-xs font-medium ${isDark ? 'text-white/80' : 'text-navy'}`}>
            D+{totalDays}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isDark ? 'bg-white/10' : 'bg-white/70'
          } backdrop-blur-sm`}
        >
          <span className="text-sm">🔥</span>
          <span className={`text-xs font-medium ${isDark ? 'text-white/80' : 'text-navy'}`}>
            {currentStreak}일 연속
          </span>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mt-8 space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/learn')}
          className="w-full py-4 bg-coral text-white rounded-2xl font-medium shadow-sm flex items-center justify-center gap-2"
        >
          <span>📖</span>
          <span>오늘의 학습 시작하기</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/review')}
          className={`w-full py-4 ${
            isDark ? 'bg-white/10 text-white/90' : 'bg-white text-navy'
          } rounded-2xl font-medium shadow-sm flex items-center justify-center gap-2`}
        >
          <span>💬</span>
          <span>복습하기</span>
        </motion.button>
      </div>

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={`mx-6 mt-6 p-5 rounded-2xl ${
          isDark ? 'bg-white/10' : 'bg-white/70'
        } backdrop-blur-sm`}
      >
        <p className={`text-xs mb-3 ${isDark ? 'text-white/60' : 'text-grey-blue'}`}>
          학습 진행률
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-cream/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-coral rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0}%`,
              }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
          <span className={`text-xs font-medium ${isDark ? 'text-white/80' : 'text-navy'}`}>
            {completedCount}/{totalChapters}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
