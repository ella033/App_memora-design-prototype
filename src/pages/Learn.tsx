import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapters } from '../data/hiragana';
import { useProgressStore } from '../stores/progressStore';
import ProgressBar from '../components/learn/ProgressBar';

export default function Learn() {
  const navigate = useNavigate();
  const { completedChapters, getChapterProgress, isChapterUnlocked } =
    useProgressStore();

  return (
    <div className="min-h-screen bg-bg-warm pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-navy"
        >
          학습하기
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-grey-blue mt-1"
        >
          히라가나를 차근차근 배워봐요
        </motion.p>
      </div>

      {/* Chapter List */}
      <div className="px-6 space-y-4">
        {chapters.map((chapter, index) => {
          const unlocked = isChapterUnlocked(chapter.id, chapter.order);
          const completed = completedChapters.includes(chapter.id);
          const progress = getChapterProgress(
            chapter.id,
            chapter.characters.map((c) => c.char)
          );

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={unlocked ? { scale: 1.02 } : {}}
              whileTap={unlocked ? { scale: 0.98 } : {}}
              onClick={() => unlocked && navigate(`/learn/${chapter.id}`)}
              className={`relative p-5 rounded-2xl cursor-pointer transition-all ${
                unlocked
                  ? completed
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-white shadow-sm border-2 border-transparent hover:border-coral/30'
                  : 'bg-grey-blue/10 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Lock icon for locked chapters */}
              {!unlocked && (
                <div className="absolute top-4 right-4 text-lg">🔒</div>
              )}
              {completed && (
                <div className="absolute top-4 right-4 text-lg">✅</div>
              )}

              <div className="flex items-start gap-4">
                {/* Chapter number */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    completed
                      ? 'bg-green-200 text-green-700'
                      : unlocked
                        ? 'bg-coral/20 text-coral'
                        : 'bg-grey-blue/20 text-grey-blue'
                  }`}
                >
                  {chapter.order}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-navy">
                    {chapter.title}
                  </h3>
                  <p className="text-lg text-grey-blue mt-0.5 tracking-wider">
                    {chapter.titleJa}
                  </p>
                  <p className="text-xs text-grey-blue/70 mt-1">
                    {chapter.description}
                  </p>

                  {/* Progress bar for unlocked chapters */}
                  {unlocked && (
                    <div className="mt-3">
                      <ProgressBar progress={progress} size="small" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Coming soon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mx-6 mt-6 p-5 rounded-2xl bg-navy/5 text-center"
      >
        <p className="text-sm text-grey-blue">
          더 많은 챕터가 준비 중이에요... 🐱
        </p>
        <p className="text-xs text-grey-blue/60 mt-1">
          な행, は행, ま행, や행, ら행, わ행
        </p>
      </motion.div>
    </div>
  );
}
