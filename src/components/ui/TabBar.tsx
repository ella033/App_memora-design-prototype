import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/', label: '홈', icon: '🏠' },
  { to: '/learn', label: '학습', icon: '📖' },
  { to: '/review', label: '대화', icon: '💬' },
  { to: '/profile', label: '프로필', icon: '👤' },
];

export default function TabBar() {
  return (
    <nav className="tab-bar sticky bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-cream/50 z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className="flex flex-col items-center gap-0.5 py-1 px-4 no-underline"
          >
            {({ isActive }) => (
              <>
                <motion.span
                  className="text-xl"
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {tab.icon}
                </motion.span>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-coral' : 'text-grey-blue'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-coral rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
