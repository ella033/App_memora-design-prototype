import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CatCharacter from '../components/cat/CatCharacter';
import { useProgressStore } from '../stores/progressStore';
import { catDialogues } from '../stores/catStore';
import { allHiragana } from '../data/hiragana';
import type { CatEmotion } from '../stores/catStore';

interface ChatMessage {
  id: number;
  sender: 'cat' | 'user';
  text: string;
  options?: { label: string; value: string }[];
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Review() {
  const { charProgress, recordAnswer } = useProgressStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [catEmotion, setCatEmotion] = useState<CatEmotion>('happy');
  const [, setWaitingForAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);

  const learnedChars = allHiragana.filter(
    (h) => charProgress[h.char]?.learned
  );

  const addMessage = (msg: Omit<ChatMessage, 'id'>) => {
    const id = ++msgIdRef.current;
    setMessages((prev) => [...prev, { ...msg, id }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (learnedChars.length === 0) {
      setTimeout(() => {
        addMessage({
          sender: 'cat',
          text: '아직 배운 글자가 없어요! 먼저 학습을 시작해볼까요? 📖',
        });
      }, 500);
    } else {
      setTimeout(() => {
        addMessage({
          sender: 'cat',
          text: `${learnedChars.length}개의 글자를 배웠네! 복습해볼까?`,
          options: [
            { label: '좋아! 시작하자', value: 'start' },
            { label: '잠깐만~', value: 'wait' },
          ],
        });
      }, 500);
    }
  }, []);

  const askQuestion = () => {
    if (learnedChars.length === 0) return;

    const target = pickRandom(learnedChars);
    setCurrentQuestion(target.char);
    setWaitingForAnswer(true);

    const questionTypes = [
      {
        text: `이 글자 기억나? → ${target.char}`,
        options: [
          { label: target.sound, value: 'correct' },
          ...allHiragana
            .filter((h) => h.char !== target.char)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2)
            .map((h) => ({ label: h.sound, value: 'wrong' })),
        ].sort(() => Math.random() - 0.5),
      },
      {
        text: `"${target.sound}" 는 어떤 글자였지?`,
        options: [
          { label: target.char, value: 'correct' },
          ...allHiragana
            .filter((h) => h.char !== target.char)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2)
            .map((h) => ({ label: h.char, value: 'wrong' })),
        ].sort(() => Math.random() - 0.5),
      },
    ];

    const q = pickRandom(questionTypes);
    setTimeout(() => {
      addMessage({ sender: 'cat', text: q.text, options: q.options });
    }, 800);
  };

  const handleOption = (value: string) => {
    if (value === 'start') {
      addMessage({ sender: 'user', text: '좋아! 시작하자' });
      askQuestion();
      return;
    }
    if (value === 'wait') {
      addMessage({ sender: 'user', text: '잠깐만~' });
      setTimeout(() => {
        addMessage({
          sender: 'cat',
          text: '알겠어! 준비되면 말해줘~',
          options: [{ label: '준비됐어!', value: 'start' }],
        });
        setCatEmotion('neutral');
      }, 500);
      return;
    }
    if (value === 'continue') {
      askQuestion();
      return;
    }

    // Answer handling
    const isCorrect = value === 'correct';
    if (currentQuestion) {
      recordAnswer(currentQuestion, isCorrect);
    }

    if (isCorrect) {
      addMessage({ sender: 'user', text: '✓' });
      setCatEmotion('proud');
      setTimeout(() => {
        addMessage({
          sender: 'cat',
          text: pickRandom(catDialogues.correct),
          options: [
            { label: '다음 문제!', value: 'continue' },
            { label: '여기까지 할래', value: 'done' },
          ],
        });
      }, 500);
    } else {
      addMessage({ sender: 'user', text: '✗' });
      setCatEmotion('curious');
      const target = allHiragana.find((h) => h.char === currentQuestion);
      setTimeout(() => {
        addMessage({
          sender: 'cat',
          text: `${pickRandom(catDialogues.wrong)}\n\n정답은 ${target?.char} = ${target?.sound} (${target?.romaji}) 이야!`,
          options: [
            { label: '다음 문제!', value: 'continue' },
            { label: '여기까지 할래', value: 'done' },
          ],
        });
      }, 500);
    }

    setWaitingForAnswer(false);
    setCurrentQuestion(null);
  };

  const handleDone = () => {
    addMessage({ sender: 'user', text: '여기까지 할래' });
    setCatEmotion('happy');
    setTimeout(() => {
      addMessage({
        sender: 'cat',
        text: pickRandom(catDialogues.encourage) + ' 다음에 또 하자!',
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-bg-warm flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-bg-warm">
        <h1 className="text-2xl font-semibold text-navy">복습 대화</h1>
        <p className="text-sm text-grey-blue mt-1">
          고양이와 대화하면서 복습해요
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'cat' && (
                <div className="mr-2 mt-auto">
                  <CatCharacter emotion={catEmotion} size="small" />
                </div>
              )}
              <div className="max-w-[70%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'cat'
                      ? 'bg-white text-navy rounded-bl-md'
                      : 'bg-coral text-white rounded-br-md'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Options */}
                {msg.options && msg.id === messages[messages.length - 1]?.id && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.options.map((opt) => (
                      <motion.button
                        key={opt.label}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          opt.value === 'done'
                            ? handleDone()
                            : handleOption(opt.value)
                        }
                        className="px-4 py-2 bg-cream-light text-navy text-sm rounded-full border border-cream hover:bg-cream transition-colors"
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
