import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../data/hiragana';
import StoryCard from '../components/learn/StoryCard';
import QuizCard from '../components/learn/QuizCard';
import CatCharacter from '../components/cat/CatCharacter';
import CatDialogue from '../components/cat/CatDialogue';
import { useProgressStore } from '../stores/progressStore';
import { useCatStore, catDialogues } from '../stores/catStore';
import type { CatEmotion } from '../stores/catStore';

type Phase = 'story' | 'quiz' | 'complete';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Chapter() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { markLearned, recordAnswer, completeChapter } = useProgressStore();
  const { setEmotion } = useCatStore();

  const chapter = chapters.find((c) => c.id === chapterId);
  const [phase, setPhase] = useState<Phase>('story');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [catEmotion, setCatEmotion] = useState<CatEmotion>('happy');
  const [catMessage, setCatMessage] = useState('같이 배워보자!');

  if (!chapter) {
    return (
      <div className="min-h-screen bg-bg-warm flex items-center justify-center">
        <p className="text-grey-blue">챕터를 찾을 수 없어요</p>
      </div>
    );
  }

  const characters = chapter.characters;
  const currentChar = characters[currentIndex];

  // Generate quiz options
  const quizOptions = useMemo(() => {
    if (phase !== 'quiz' || !currentChar) return [];
    const others = characters.filter((c) => c.char !== currentChar.char);
    const wrongOptions = shuffleArray(others).slice(0, 3);
    return shuffleArray([currentChar, ...wrongOptions]);
  }, [phase, currentIndex, currentChar]);

  const quizType = useMemo(
    () => (Math.random() > 0.5 ? 'char-to-sound' : 'sound-to-char') as 'char-to-sound' | 'sound-to-char',
    [currentIndex, phase]
  );

  const handleStoryNext = () => {
    markLearned(currentChar.char);
    if (currentIndex < characters.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // All stories done, move to quiz phase
      setPhase('quiz');
      setCurrentIndex(0);
      setCatMessage('이제 퀴즈 시간! 준비됐어?');
      setCatEmotion('excited');
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    recordAnswer(currentChar.char, correct);
    setTotalQuestions((t) => t + 1);

    if (correct) {
      setCorrectCount((c) => c + 1);
      setCatEmotion('proud');
      setCatMessage(pickRandom(catDialogues.correct));
    } else {
      setCatEmotion('curious');
      setCatMessage(pickRandom(catDialogues.wrong));
    }

    setTimeout(() => {
      if (currentIndex < characters.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        // Quiz complete
        completeChapter(chapter.id);
        setPhase('complete');
        setCatEmotion('excited');
        setCatMessage(pickRandom(catDialogues.complete));
        setEmotion('excited');
      }
    }, 1200);
  };

  const progress =
    phase === 'story'
      ? ((currentIndex + 1) / characters.length) * 50
      : phase === 'quiz'
        ? 50 + ((currentIndex + 1) / characters.length) * 50
        : 100;

  return (
    <div className="min-h-screen bg-bg-warm pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/learn')}
            className="text-grey-blue text-sm"
          >
            ← 돌아가기
          </button>
          <span className="text-xs text-grey-blue">
            {phase === 'story' ? '배우기' : phase === 'quiz' ? '퀴즈' : '완료'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-cream rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <h2 className="text-lg font-semibold text-navy mt-4">
          {chapter.title}
        </h2>
      </div>

      {/* Cat mini */}
      <div className="flex items-center gap-3 px-6 mb-4">
        <CatCharacter emotion={catEmotion} size="small" />
        <CatDialogue message={catMessage} />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {phase === 'story' && currentChar && (
          <StoryCard
            key={`story-${currentChar.char}`}
            character={currentChar}
            onNext={handleStoryNext}
          />
        )}

        {phase === 'quiz' && currentChar && quizOptions.length > 0 && (
          <QuizCard
            key={`quiz-${currentChar.char}-${currentIndex}`}
            question={currentChar}
            options={quizOptions}
            quizType={quizType}
            onAnswer={handleQuizAnswer}
          />
        )}

        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-4 bg-white rounded-3xl p-8 shadow-sm text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h3 className="text-xl font-bold text-navy mb-2">챕터 완료!</h3>
            <p className="text-sm text-grey-blue mb-6">
              {correctCount}/{totalQuestions} 문제를 맞혔어요
            </p>

            <div className="flex gap-2 mb-4">
              {characters.map((c) => (
                <div
                  key={c.char}
                  className="flex-1 bg-cream-light rounded-xl py-3 text-center"
                >
                  <div className="text-2xl">{c.char}</div>
                  <div className="text-[10px] text-grey-blue mt-1">
                    {c.sound}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-6">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/learn')}
                className="w-full py-3.5 bg-coral text-white rounded-2xl font-medium text-sm"
              >
                다음 챕터로
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setPhase('quiz');
                  setCurrentIndex(0);
                  setCorrectCount(0);
                  setTotalQuestions(0);
                }}
                className="w-full py-3.5 bg-cream-light text-navy rounded-2xl font-medium text-sm"
              >
                다시 풀어보기
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
