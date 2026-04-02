import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStreakStore } from '../stores/streakStore';
import { useProgressStore } from '../stores/progressStore';
import { useCatStore } from '../stores/catStore';
import { allHiragana, chapters } from '../data/hiragana';
import CatCharacter from '../components/cat/CatCharacter';

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function Profile() {
  const { currentStreak, longestStreak, visitDates, isDateVisited } =
    useStreakStore();
  const { charProgress, completedChapters } = useProgressStore();
  const { name, setName } = useCatStore();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const calendarDays = getCalendarDays(calYear, calMonth);
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ];

  const learnedChars = allHiragana.filter(
    (h) => charProgress[h.char]?.learned
  );
  const totalChars = allHiragana.length;

  const handleSaveName = () => {
    setName(nameInput.trim() || '');
    setEditingName(false);
  };

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  return (
    <div className="min-h-screen bg-bg-warm pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-navy"
        >
          나의 기록
        </motion.h1>
      </div>

      {/* Cat Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 p-6 bg-white rounded-3xl shadow-sm text-center mb-6"
      >
        <CatCharacter emotion="happy" size="medium" />
        <div className="mt-3">
          {editingName ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="고양이 이름"
                className="text-center text-lg font-semibold text-navy bg-cream-light rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-coral/30 w-40"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <button
                onClick={handleSaveName}
                className="text-sm text-coral font-medium"
              >
                저장
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setNameInput(name);
                setEditingName(true);
              }}
              className="text-lg font-semibold text-navy"
            >
              {name || '이름을 지어주세요'}{' '}
              <span className="text-xs text-grey-blue">✏️</span>
            </button>
          )}
        </div>
        <p className="text-xs text-grey-blue mt-2">
          함께한 지 {visitDates.length}일째
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 px-6 mb-6">
        {[
          { label: '연속 출석', value: `${currentStreak}일`, icon: '🔥' },
          { label: '최장 연속', value: `${longestStreak}일`, icon: '🏆' },
          { label: '배운 글자', value: `${learnedChars.length}/${totalChars}`, icon: '📝' },
          { label: '완료 챕터', value: `${completedChapters.length}/${chapters.length}`, icon: '📚' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-xl font-bold text-navy mt-2">{stat.value}</p>
            <p className="text-xs text-grey-blue mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-6 bg-white rounded-3xl p-5 shadow-sm mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="text-grey-blue px-2 py-1">
            ←
          </button>
          <span className="text-sm font-semibold text-navy">
            {calYear}년 {monthNames[calMonth]}
          </span>
          <button onClick={nextMonth} className="text-grey-blue px-2 py-1">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <div key={d} className="text-[10px] text-grey-blue py-1">
              {d}
            </div>
          ))}
          {calendarDays.map((day, i) => {
            if (day === null)
              return <div key={`empty-${i}`} />;
            const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const visited = isDateVisited(dateStr);
            const isToday =
              day === now.getDate() &&
              calMonth === now.getMonth() &&
              calYear === now.getFullYear();

            return (
              <div
                key={dateStr}
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs ${
                  visited
                    ? 'bg-coral text-white'
                    : isToday
                      ? 'border-2 border-coral text-navy'
                      : 'text-grey-blue/60'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Mastered Characters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-6 bg-white rounded-3xl p-5 shadow-sm"
      >
        <h3 className="text-sm font-semibold text-navy mb-3">
          마스터한 글자
        </h3>
        {learnedChars.length === 0 ? (
          <p className="text-xs text-grey-blue text-center py-4">
            아직 배운 글자가 없어요. 학습을 시작해보세요!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {learnedChars.map((h) => (
              <motion.div
                key={h.char}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 bg-cream-light rounded-xl flex flex-col items-center justify-center"
              >
                <span className="text-lg text-navy">{h.char}</span>
                <span className="text-[8px] text-grey-blue">{h.sound}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
