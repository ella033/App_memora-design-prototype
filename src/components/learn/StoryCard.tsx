import { motion } from 'framer-motion';
import type { HiraganaChar } from '../../data/hiragana';

interface StoryCardProps {
  character: HiraganaChar;
  onNext?: () => void;
  showStory?: boolean;
}

export default function StoryCard({
  character,
  onNext,
  showStory = true,
}: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl p-8 shadow-sm mx-4"
    >
      {/* Main character display */}
      <div className="text-center mb-6">
        <motion.div
          className="text-8xl font-light text-navy mb-2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {character.char}
        </motion.div>
        <div className="flex items-center justify-center gap-3 text-grey-blue">
          <span className="text-lg font-medium">{character.romaji}</span>
          <span className="w-1 h-1 bg-grey-blue rounded-full" />
          <span className="text-lg">{character.sound}</span>
        </div>
      </div>

      {/* Story / Mnemonic */}
      {showStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-cream-light rounded-2xl p-5 mb-6"
        >
          <p className="text-sm text-navy/80 leading-relaxed">
            💭 {character.story}
          </p>
        </motion.div>
      )}

      {/* Stroke order */}
      <div className="text-center mb-6">
        <p className="text-xs text-grey-blue">
          ✏️ {character.strokeOrder}
        </p>
      </div>

      {/* Next button */}
      {onNext && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-3.5 bg-coral text-white rounded-2xl font-medium text-sm shadow-sm hover:bg-coral-light transition-colors"
        >
          다음으로
        </motion.button>
      )}
    </motion.div>
  );
}
