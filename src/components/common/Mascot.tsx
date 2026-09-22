import React, { useState } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { FluttershySVG } from '../mascots/FluttershySVG';
import { EggySVG } from '../mascots/EggySVG';

interface MascotProps {
  type: 'bunny' | 'bear' | 'cat' | 'dolphin' | 'pony' | 'eggy';
  name: string;
  state: 'idle' | 'reading' | 'celebrating' | 'paused';
  className?: string;
  showTag?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  type,
  name,
  state,
  className = '',
  showTag = true,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const { playMascotGiggle } = useSoundEffects();

  const handleTap = () => {
    playMascotGiggle();
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
  };

  const getMascotSVG = () => {
    switch (type) {
      case 'bunny':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Bunny Ears */}
            <ellipse
              cx="38"
              cy="25"
              rx="7"
              ry="18"
              fill="#FFFFFF"
              stroke="#F472B6"
              strokeWidth="2"
              transform={
                state === 'reading' ? 'rotate(-6 38 25)' : 'rotate(-12 38 25)'
              }
              className="transition-transform duration-300"
            />
            <ellipse
              cx="38"
              cy="26"
              rx="4"
              ry="12"
              fill="#FBCFE8"
              transform={
                state === 'reading' ? 'rotate(-6 38 26)' : 'rotate(-12 38 26)'
              }
            />
            <ellipse
              cx="62"
              cy="25"
              rx="7"
              ry="18"
              fill="#FFFFFF"
              stroke="#F472B6"
              strokeWidth="2"
              transform={
                state === 'reading' ? 'rotate(6 62 25)' : 'rotate(12 62 25)'
              }
              className="transition-transform duration-300"
            />
            <ellipse
              cx="62"
              cy="26"
              rx="4"
              ry="12"
              fill="#FBCFE8"
              transform={
                state === 'reading' ? 'rotate(6 62 26)' : 'rotate(12 62 26)'
              }
            />

            {/* Bunny Head */}
            <ellipse
              cx="50"
              cy="56"
              rx="25"
              ry="22"
              fill="#FFFFFF"
              stroke="#F472B6"
              strokeWidth="2"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="33" cy="62" rx="4" ry="2.5" fill="#FDA4AF" />
            <ellipse cx="67" cy="62" rx="4" ry="2.5" fill="#FDA4AF" />

            {/* Eyes */}
            {state === 'celebrating' ? (
              // Joyful crescent eyes
              <>
                <path
                  d="M36 54 Q41 48 46 54"
                  stroke="#831843"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M54 54 Q59 48 64 54"
                  stroke="#831843"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            ) : (
              // Wide open cute shiny eyes
              <>
                <ellipse cx="40" cy="52" rx="3" ry="4" fill="#831843" />
                <circle cx="39" cy="50" r="1.3" fill="#FFFFFF" />
                <ellipse cx="60" cy="52" rx="3" ry="4" fill="#831843" />
                <circle cx="59" cy="50" r="1.3" fill="#FFFFFF" />
              </>
            )}

            {/* Cute Glasses if reading */}
            {state === 'reading' && (
              <g>
                <circle
                  cx="40"
                  cy="52"
                  r="7.5"
                  stroke="#EC4899"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="52"
                  r="7.5"
                  stroke="#EC4899"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M47.5 52 L52.5 52" stroke="#EC4899" strokeWidth="2" />
              </g>
            )}

            {/* Nose & Mouth */}
            <polygon points="50,57 47,54 53,54" fill="#FB7185" />
            <path
              d="M47 59 Q50 62 50 59 Q50 62 53 59"
              stroke="#831843"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Little Hands */}
            <ellipse cx="36" cy="74" rx="4" ry="5" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
            <ellipse cx="64" cy="74" rx="4" ry="5" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
          </svg>
        );

      case 'bear':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Bear Ears */}
            <circle cx="32" cy="36" r="11" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <circle cx="32" cy="36" r="6" fill="#FDE68A" />
            <circle cx="68" cy="36" r="11" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <circle cx="68" cy="36" r="6" fill="#FDE68A" />

            {/* Head */}
            <ellipse cx="50" cy="56" rx="27" ry="24" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />

            {/* Snout */}
            <ellipse cx="50" cy="62" rx="13" ry="10" fill="#FEF3C7" />
            <ellipse cx="50" cy="58" rx="4" ry="3" fill="#78350F" />
            <path d="M50 61 L50 65 M47 65 Q50 68 53 65" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Cheeks */}
            <ellipse cx="30" cy="62" rx="3.5" ry="2" fill="#FCA5A5" />
            <ellipse cx="70" cy="62" rx="3.5" ry="2" fill="#FCA5A5" />

            {/* Eyes */}
            {state === 'celebrating' ? (
              <>
                <path d="M37 50 Q41 45 45 50" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M55 50 Q59 45 63 50" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <circle cx="41" cy="49" r="3" fill="#78350F" />
                <circle cx="40" cy="48" r="1" fill="#FFFFFF" />
                <circle cx="59" cy="49" r="3" fill="#78350F" />
                <circle cx="58" cy="48" r="1" fill="#FFFFFF" />
              </>
            )}

            {/* Leaf on head */}
            <path d="M50 34 Q58 28 55 22 Q48 24 50 34" fill="#10B981" stroke="#047857" strokeWidth="1.2" />
          </svg>
        );

      case 'cat':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Space Helmet Dome */}
            <circle cx="50" cy="50" r="38" fill="#6366F1" fillOpacity="0.15" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 2" />
            <ellipse cx="50" cy="20" rx="4" ry="2" fill="#FACC15" />
            <line x1="50" y1="20" x2="50" y2="12" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="11" r="3" fill="#FACC15" />

            {/* Cat Ears */}
            <polygon points="26,45 34,22 46,38" fill="#4338CA" stroke="#818CF8" strokeWidth="1.5" />
            <polygon points="30,42 35,26 43,38" fill="#F472B6" />
            <polygon points="74,45 66,22 54,38" fill="#4338CA" stroke="#818CF8" strokeWidth="1.5" />
            <polygon points="70,42 65,26 57,38" fill="#F472B6" />

            {/* Head */}
            <ellipse cx="50" cy="54" rx="25" ry="22" fill="#312E81" stroke="#818CF8" strokeWidth="2" />

            {/* Cat Cheeks & Whiskers */}
            <line x1="22" y1="55" x2="14" y2="54" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="59" x2="15" y2="61" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="78" y1="55" x2="86" y2="54" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="78" y1="59" x2="85" y2="61" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />

            {/* Starry Eyes */}
            {state === 'celebrating' ? (
              <>
                <polygon points="39,47 41,51 45,51 42,54 43,58 39,55 35,58 36,54 33,51 37,51" fill="#FDE047" />
                <polygon points="61,47 63,51 67,51 64,54 65,58 61,55 57,58 58,54 55,51 59,51" fill="#FDE047" />
              </>
            ) : (
              <>
                <ellipse cx="40" cy="52" rx="3.5" ry="4.5" fill="#38BDF8" />
                <circle cx="39" cy="50" r="1.5" fill="#FFFFFF" />
                <ellipse cx="60" cy="52" rx="3.5" ry="4.5" fill="#38BDF8" />
                <circle cx="59" cy="50" r="1.5" fill="#FFFFFF" />
              </>
            )}

            {/* Nose & Mouth */}
            <polygon points="50,58 48,56 52,56" fill="#F472B6" />
            <path d="M48 60 Q50 62 50 60 Q50 62 52 60" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'dolphin':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Dolphin Body */}
            <path
              d="M20 62 C22 40 45 32 72 40 C80 43 86 50 82 58 C76 70 48 74 28 66 Z"
              fill="#0EA5E9"
              stroke="#0369A1"
              strokeWidth="2"
            />
            {/* Dolphin Belly */}
            <path
              d="M26 63 C36 67 52 68 70 60 C66 68 46 72 26 63 Z"
              fill="#E0F2FE"
            />
            {/* Dorsal Fin */}
            <path d="M46 34 C50 20 60 25 56 35 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
            {/* Flipper */}
            <path d="M44 60 C42 68 50 70 54 62 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />

            {/* Water Spout & Droplets */}
            <circle cx="68" cy="22" r="2.5" fill="#38BDF8" />
            <circle cx="74" cy="18" r="3" fill="#38BDF8" />
            <circle cx="78" cy="24" r="2" fill="#38BDF8" />

            {/* Cheeks */}
            <ellipse cx="68" cy="52" rx="3" ry="2" fill="#FCA5A5" />

            {/* Eye */}
            {state === 'celebrating' ? (
              <path d="M68 45 Q72 40 76 45" stroke="#082F49" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="72" cy="44" r="3" fill="#082F49" />
                <circle cx="71" cy="43" r="1" fill="#FFFFFF" />
              </>
            )}

            {/* Smile */}
            <path d="M78 52 Q82 54 84 51" stroke="#082F49" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'pony':
        return <FluttershySVG state={state} />;

      case 'eggy':
        return <EggySVG state={state} />;
    }

  };

  return (
    <div
      onClick={handleTap}
      title={`${name} (轻戳我和我打招呼哦)`}
      className={`relative cursor-pointer transition-transform duration-300 active:scale-95 ${
        isWiggling ? 'animate-wiggle' : ''
      } ${state === 'reading' ? 'animate-bounce-gentle' : ''} ${className}`}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24">{getMascotSVG()}</div>
      {/* Speech bubble or status tag */}
      {showTag && (
        <div className="absolute -bottom-2 -right-1 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm border border-pink-200/50 flex items-center gap-1 pointer-events-none whitespace-nowrap">
          {state === 'reading' && (
            <span className="animate-pulse">
              {type === 'eggy'
                ? '⚡ 搞快点速读中'
                : type === 'pony'
                ? '✨ 柔柔伴读中'
                : '📖 速读中'}
            </span>
          )}
          {state === 'paused' && (
            <span>
              {type === 'eggy'
                ? '⏸️ 歇会儿再冲'
                : type === 'pony'
                ? '⏸️ 轻轻休息'
                : '⏸️ 休息啦'}
            </span>
          )}
          {state === 'celebrating' && (
            <span>
              {type === 'eggy'
                ? '👑 顺利夺冠撞走不开心！'
                : type === 'pony'
                ? '💖 善良之心闪耀！'
                : '🎉 太棒啦'}
            </span>
          )}
          {state === 'idle' && (
            <span>
              {type === 'eggy'
                ? '🍳 蛋仔冲冲冲！'
                : type === 'pony'
                ? '🦋 善良就是魔法'
                : '✨ 伴读中'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
