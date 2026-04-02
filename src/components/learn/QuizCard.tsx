import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HiraganaChar } from '../../data/hiragana';

type QuizType = 'char-to-sound' | 'sound-to-char';

interface QuizCardProps {
  question: HiraganaChar;
  options: HiraganaChar[];
  quizType: QuizType;
  onAnswer: (correct: boolean) => void;
}

export default function QuizCard({
  question,
  options,
  quizType,
  onAnswer,
}: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (option: HiraganaChar) => {
    if (selected) return; // prevent double tap
    const correct = option.char === question.char;
    setSelected(option.char);
    setIsCorrect(correct);

    setTimeout(() => {
      onAnswer(correct);
      setSelected(null);
      setIsCorrect(null);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl p-8 shadow-sm mx-4"
    >
      {/* Question */}
      <div className="text-center mb-8">
        <p className="text-xs text-grey-blue mb-3">
          {quizType === 'char-to-sound'
            ? '이 글자의 소리는?'
            : '이 소리의 글자는?'}
        </p>
        <motion.div
          className="text-7xl font-light text-navy"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {quizType === 'char-to-sound' ? question.char : question.sound}
        </motion.div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isThis = selected === option.char;
          const correctAnswer = option.char === question.char;
          let bgColor = 'bg-cream-light';
          if (selected) {
            if (correctAnswer) bgColor = 'bg-green-100';
            else if (isThis && !isCorrect) bgColor = 'bg-red-100';
          }

          return (
            <motion.button
              key={option.char}
              whileHover={!selected ? { scale: 1.03 } : {}}
              whileTap={!selected ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(option)}
              className={`${bgColor} rounded-2xl py-5 px-4 text-center transition-colors border-2 ${
                isThis && isCorrect
                  ? 'border-green-300'
                  : isThis && !isCorrect
                    ? 'border-red-300'
                    : 'border-transparent'
              }`}
            >
              <span className="text-2xl text-navy font-medium">
                {quizType === 'char-to-sound' ? option.sound : option.char}
              </span>
              {selected && correctAnswer && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="block text-xs text-green-600 mt-1"
                >
                  {option.romaji}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 text-center text-sm font-medium ${
              isCorrect ? 'text-green-600' : 'text-coral'
            }`}
          >
            {isCorrect ? '정답! 🎉' : `아깝다~ 정답은 ${question.sound} (${question.romaji})`}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
