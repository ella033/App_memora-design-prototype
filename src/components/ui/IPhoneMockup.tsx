import type { ReactNode } from 'react';

interface IPhoneMockupProps {
  children: ReactNode;
}

export default function IPhoneMockup({ children }: IPhoneMockupProps) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6">
      {/* iPhone 16 Pro Frame */}
      <div className="relative">
        {/* Outer shell */}
        <div
          className="relative rounded-[55px] bg-[#1c1c1e] p-[12px] shadow-2xl"
          style={{
            width: 393 + 24,
            height: 852 + 24,
          }}
        >
          {/* Titanium-like border */}
          <div
            className="absolute inset-0 rounded-[55px] border-[2px] border-[#3a3a3c] pointer-events-none z-10"
          />

          {/* Side buttons - Volume */}
          <div className="absolute -left-[3px] top-[160px] w-[3px] h-[32px] bg-[#2c2c2e] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[200px] w-[3px] h-[32px] bg-[#2c2c2e] rounded-l-sm" />

          {/* Side button - Power */}
          <div className="absolute -right-[3px] top-[190px] w-[3px] h-[48px] bg-[#2c2c2e] rounded-r-sm" />

          {/* Screen area */}
          <div
            className="relative rounded-[43px] overflow-hidden bg-black"
            style={{
              width: 393,
              height: 852,
            }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-[59px] z-40 flex items-end justify-between px-8 pb-1">
              <span className="text-white text-[14px] font-semibold">9:41</span>
              <div className="flex items-center gap-1">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
                  <rect x="0" y="3" width="3" height="9" rx="0.5" opacity="0.3" />
                  <rect x="4" y="3" width="3" height="9" rx="0.5" opacity="0.3" />
                  <rect x="8" y="1" width="3" height="11" rx="0.5" opacity="0.6" />
                  <rect x="12" y="0" width="3" height="12" rx="0.5" fill="white" />
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                  <path d="M8 3C10.7 3 13.1 4.2 14.7 6.1L16 4.8C14 2.5 11.2 1 8 1S2 2.5 0 4.8L1.3 6.1C2.9 4.2 5.3 3 8 3Z" opacity="0.3"/>
                  <path d="M8 6C9.8 6 11.4 6.8 12.5 8L13.8 6.7C12.3 5.2 10.3 4.3 8 4.3S3.7 5.2 2.2 6.7L3.5 8C4.6 6.8 6.2 6 8 6Z" opacity="0.6"/>
                  <path d="M8 9C9 9 9.9 9.4 10.5 10.1L8 12.5L5.5 10.1C6.1 9.4 7 9 8 9Z" fill="white"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-[2px]">
                  <div className="w-[24px] h-[11px] border border-white/40 rounded-[3px] p-[1px] relative">
                    <div className="h-full w-[75%] bg-white rounded-[1.5px]" />
                  </div>
                  <div className="w-[1.5px] h-[5px] bg-white/40 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-50" />

            {/* App content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute inset-0 rounded-[55px] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
