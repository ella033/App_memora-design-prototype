import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  size?: 'small' | 'medium';
}

export default function ProgressBar({
  progress,
  label,
  size = 'medium',
}: ProgressBarProps) {
  const height = size === 'small' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-grey-blue">{label}</span>
          <span className="text-xs font-medium text-navy">{progress}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-cream rounded-full overflow-hidden`}>
        <motion.div
          className={`${height} bg-coral rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
