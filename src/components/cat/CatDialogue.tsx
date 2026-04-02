import { motion, AnimatePresence } from 'framer-motion';

interface CatDialogueProps {
  message: string;
  visible?: boolean;
}

export default function CatDialogue({
  message,
  visible = true,
}: CatDialogueProps) {
  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-sm max-w-[260px] mx-auto"
        >
          {/* Tail pointing down */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45 rounded-sm" />
          <p className="text-sm text-navy leading-relaxed text-center relative z-10">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
