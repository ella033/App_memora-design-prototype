import { motion } from 'framer-motion';
import type { CatEmotion } from '../../stores/catStore';

interface CatCharacterProps {
  emotion?: CatEmotion;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const emotionConfig: Record<
  CatEmotion,
  { eyes: string; mouth: string; tail: boolean; blush: boolean }
> = {
  happy: { eyes: '◠ ◠', mouth: 'ω', tail: true, blush: true },
  excited: { eyes: '★ ★', mouth: '▽', tail: true, blush: true },
  sleepy: { eyes: '− −', mouth: 'ω', tail: false, blush: false },
  curious: { eyes: '◉ ◉', mouth: '?', tail: true, blush: false },
  proud: { eyes: '◠ ◠', mouth: '▿', tail: true, blush: true },
  sad: { eyes: '╥ ╥', mouth: '﹏', tail: false, blush: false },
  welcome: { eyes: '◠ ◠', mouth: '∀', tail: true, blush: true },
  neutral: { eyes: '• •', mouth: 'ω', tail: false, blush: false },
};

const sizeMap = {
  small: { container: 'w-20 h-20', text: 'text-xs' },
  medium: { container: 'w-36 h-36', text: 'text-sm' },
  large: { container: 'w-48 h-48', text: 'text-base' },
};

export default function CatCharacter({
  emotion = 'neutral',
  size = 'large',
  onClick,
}: CatCharacterProps) {
  const config = emotionConfig[emotion];
  const sizeClass = sizeMap[size];

  return (
    <motion.div
      className={`${sizeClass.container} relative cursor-pointer select-none`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cat Body */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={
          config.tail
            ? { rotate: [0, -2, 2, -2, 0] }
            : emotion === 'sleepy'
              ? { y: [0, 2, 0] }
              : {}
        }
        transition={{
          duration: emotion === 'sleepy' ? 3 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Ears */}
          <polygon
            points="55,75 70,30 90,70"
            fill="#E8A598"
            stroke="#D4907F"
            strokeWidth="2"
          />
          <polygon
            points="110,70 130,30 145,75"
            fill="#E8A598"
            stroke="#D4907F"
            strokeWidth="2"
          />
          {/* Inner ears */}
          <polygon points="63,70 72,40 85,68" fill="#F0BEB3" />
          <polygon points="115,68 128,40 137,70" fill="#F0BEB3" />

          {/* Head */}
          <ellipse
            cx="100"
            cy="105"
            rx="55"
            ry="50"
            fill="#F5E6D3"
            stroke="#E8D5C0"
            strokeWidth="2"
          />

          {/* Blush */}
          {config.blush && (
            <>
              <ellipse cx="65" cy="115" rx="12" ry="7" fill="#F0BEB3" opacity="0.5" />
              <ellipse cx="135" cy="115" rx="12" ry="7" fill="#F0BEB3" opacity="0.5" />
            </>
          )}

          {/* Whiskers */}
          <line x1="30" y1="105" x2="60" y2="108" stroke="#D4C4B0" strokeWidth="1.5" />
          <line x1="30" y1="115" x2="60" y2="115" stroke="#D4C4B0" strokeWidth="1.5" />
          <line x1="140" y1="108" x2="170" y2="105" stroke="#D4C4B0" strokeWidth="1.5" />
          <line x1="140" y1="115" x2="170" y2="115" stroke="#D4C4B0" strokeWidth="1.5" />

          {/* Body */}
          <ellipse
            cx="100"
            cy="170"
            rx="42"
            ry="30"
            fill="#F5E6D3"
            stroke="#E8D5C0"
            strokeWidth="2"
          />

          {/* Tail */}
          <motion.path
            d="M142,170 Q170,150 165,125"
            fill="none"
            stroke="#E8A598"
            strokeWidth="6"
            strokeLinecap="round"
            animate={
              config.tail
                ? { d: ['M142,170 Q170,150 165,125', 'M142,170 Q175,145 160,120', 'M142,170 Q170,150 165,125'] }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Face expression overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: size === 'large' ? '15%' : '10%' }}>
          {/* Eyes */}
          <motion.div
            className={`${sizeClass.text} font-bold tracking-[0.4em] text-navy`}
            style={{ marginTop: size === 'large' ? '-8%' : '-5%' }}
            animate={
              emotion === 'sleepy'
                ? { opacity: [1, 0.3, 1] }
                : emotion === 'excited'
                  ? { scale: [1, 1.1, 1] }
                  : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {config.eyes}
          </motion.div>
          {/* Mouth */}
          <div className={`${sizeClass.text} text-coral mt-0.5`}>
            {config.mouth}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
