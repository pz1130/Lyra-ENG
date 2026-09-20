import React, { useState } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface MascotProps {
  type: 'bunny' | 'bear' | 'cat' | 'dolphin' | 'pony' | 'eggy';
  name: string;
  state: 'idle' | 'reading' | 'celebrating' | 'paused';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  type,
  name,
  state,
  className = '',
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
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Twilight Sparkle Cutie Mark Magic Aura & Sparkles */}
            <g className="animate-pulse">
              {/* Six-pointed Cutie Mark Star at top right */}
              <path
                d="M82 12 L84 19 L91 21 L84 23 L82 30 L80 23 L73 21 L80 19 Z"
                fill="#EC4899"
              />
              <circle cx="82" cy="21" r="1.5" fill="#FFFFFF" />
              {/* Surrounding white spark stars */}
              <path d="M72 12 L73 14 L75 14.5 L73 15 L72 17 L71 15 L69 14.5 L71 14 Z" fill="#FFFFFF" />
              <path d="M92 28 L93 30 L95 30.5 L93 31 L92 33 L91 31 L89 30.5 L91 30 Z" fill="#FFFFFF" />
              <circle cx="76" cy="28" r="1" fill="#FFFFFF" />
            </g>

            {/* Back Mane: Dark Indigo (#1E1B4B) with Magenta (#EC4899) and Violet (#8B5CF6) highlights */}
            <path
              d="M32 30 C18 42 16 75 30 84 C23 70 24 48 35 38 Z"
              fill="#1E1B4B"
            />
            {/* Purple & Magenta stripes in back mane */}
            <path d="M26 44 C20 54 20 72 30 80 C24 68 24 52 28 46 Z" fill="#8B5CF6" />
            <path d="M22 52 C18 60 19 72 26 77 C22 68 21 58 24 54 Z" fill="#EC4899" />

            {/* Pony Ears: Twilight's lavender ear with pink inner */}
            <path
              d="M40 22 C36 10 47 6 52 17 Z"
              fill="#D8B4FE"
              stroke="#7E22CE"
              strokeWidth="1.8"
            />
            <path d="M43 18 C40 13 46 10 49 16 Z" fill="#F472B6" />

            {/* Twilight Sparkle's Unicorn Horn (Pointed, lavender with magical spiral grooves) */}
            <polygon
              points="58,6 52,22 64,20"
              fill="#D8B4FE"
              stroke="#7E22CE"
              strokeWidth="1.6"
            />
            <line x1="53.5" y1="18" x2="61" y2="17" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="55" y1="13" x2="60" y2="12" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="56.5" y1="9" x2="59" y2="8" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
            {/* Glowing magic aura at tip of horn */}
            <circle cx="58" cy="6" r="3" fill="#EC4899" fillOpacity="0.5" className="animate-ping" />
            <circle cx="58" cy="6" r="2" fill="#F472B6" />

            {/* Twilight Head & Neck: Lavender Coat (#D8B4FE) */}
            <path
              d="M36 34 C36 22 50 18 64 22 C73 25 78 32 84 41 C88 47 86 55 80 57 C74 58 69 53 66 52 C61 58 54 64 43 64 C33 64 34 50 36 34 Z"
              fill="#D8B4FE"
              stroke="#7E22CE"
              strokeWidth="2"
            />

            {/* Twilight's Iconic Straight-Cut Bangs (齐刘海) - Dark Indigo with Magenta & Violet Stripes */}
            {/* Base indigo fringe */}
            <path
              d="M46 16 C55 17 68 28 54 36 C50 31 52 22 46 16 Z"
              fill="#1E1B4B"
              stroke="#1E1B4B"
              strokeWidth="0.5"
            />
            {/* Signature Magenta Stripe (玫粉色条纹) */}
            <path
              d="M49 18 C56 20 63 29 55 35 C52 30 52 23 49 18 Z"
              fill="#EC4899"
            />
            {/* Signature Violet Stripe (紫罗兰条纹) */}
            <path
              d="M52 21 C58 23 62 30 57 34 C54 30 54 24 52 21 Z"
              fill="#8B5CF6"
            />

            {/* Twilight's Cutie Mark on Neck/Flank (Iconic 6-pointed magenta star) */}
            <g transform="translate(68, 54) scale(0.65)">
              <path
                d="M0 -7 L1.8 -2.2 L6.5 -3.5 L3.2 0 L6.5 3.5 L1.8 2.2 L0 7 L-1.8 2.2 L-6.5 3.5 L-3.2 0 L-6.5 -3.5 L-1.8 -2.2 Z"
                fill="#DB2777"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
              <circle cx="-5" cy="-6" r="0.8" fill="#FFFFFF" />
              <circle cx="6" cy="-5" r="0.8" fill="#FFFFFF" />
              <circle cx="-6" cy="5" r="0.8" fill="#FFFFFF" />
              <circle cx="5" cy="6" r="0.8" fill="#FFFFFF" />
            </g>

            {/* Rosy blush */}
            <ellipse cx="66" cy="53" rx="3.5" ry="2" fill="#F472B6" fillOpacity="0.5" />

            {/* Twilight's Big Violet Eyes & Long Curled Eyelashes */}
            {state === 'celebrating' ? (
              // Joyful crescent eyes
              <path
                d="M56 38 Q62 31 68 38"
                stroke="#581C87"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <g>
                {/* White sclera */}
                <ellipse cx="62" cy="38" rx="5.5" ry="7.5" fill="#FFFFFF" stroke="#581C87" strokeWidth="1" />
                {/* Deep violet iris */}
                <ellipse cx="62.5" cy="38" rx="4.2" ry="6" fill="#581C87" />
                {/* Lighter violet highlight */}
                <ellipse cx="63" cy="39" rx="3" ry="4.2" fill="#9333EA" />
                {/* Black pupil */}
                <ellipse cx="62.5" cy="38" rx="2.2" ry="3.5" fill="#1E1B4B" />
                {/* Catchlight reflections */}
                <circle cx="60.5" cy="35" r="2" fill="#FFFFFF" />
                <circle cx="64" cy="41" r="1.2" fill="#FFFFFF" />
                {/* Characteristic curved eyelashes */}
                <path d="M66 32 L70 29 M67 35 L71 34 M67 38 L71 39" stroke="#3B0764" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            )}

            {/* Smart Scholar / Reading Glasses (Twilight loves reading!) */}
            {state === 'reading' && (
              <g>
                <ellipse cx="62" cy="38" rx="7.5" ry="9" stroke="#9333EA" strokeWidth="2" fill="none" />
                <path d="M54.5 38 L51 38" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {/* Cute Muzzle & Gentle Smile */}
            <circle cx="81" cy="50" r="1.2" fill="#9333EA" />
            <path
              d="M76 54 Q79 56 82 53"
              stroke="#581C87"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );

      case 'eggy':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Party Crown for Champion Eggy (when celebrating) */}
            {state === 'celebrating' && (
              <g className="animate-bounce-gentle">
                <polygon
                  points="40,22 43,12 47,19 50,10 53,19 57,12 60,22"
                  fill="#FACC15"
                  stroke="#CA8A04"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="10" r="2.5" fill="#EF4444" />
                <circle cx="43" cy="12" r="1.8" fill="#3B82F6" />
                <circle cx="57" cy="12" r="1.8" fill="#10B981" />
              </g>
            )}

            {/* Round Smooth Eggy Body (Golden Egg Yolk #FFD000) - No Propeller! */}
            <ellipse
              cx="50"
              cy="54"
              rx="33"
              ry="35"
              fill="#FFD000"
              stroke="#D97706"
              strokeWidth="2.5"
            />

            {/* Egg Top Soft Ambient Light Highlight */}
            <path
              d="M32 28 C38 22 54 21 66 26 C56 23 42 24 32 28 Z"
              fill="#FEF08A"
              opacity="0.85"
            />

            {/* Light Pale Belly Patch */}
            <ellipse cx="50" cy="63" rx="22" ry="19" fill="#FEF08A" opacity="0.6" />

            {/* Cute Rosy Blushing Cheeks (粉嫩椭圆腮红) */}
            <ellipse cx="27" cy="56" rx="5" ry="3.2" fill="#FB7185" fillOpacity="0.85" />
            <ellipse cx="73" cy="56" rx="5" ry="3.2" fill="#FB7185" fillOpacity="0.85" />

            {/* Eggy Party Eyes: Dark Obsidian with double round catchlights */}
            {state === 'celebrating' ? (
              // Starry Joyful Eyes (派对星星眼)
              <g>
                <polygon
                  points="38,45 40,49 44,49 41,52 42,56 38,53 34,56 35,52 32,49 36,49"
                  fill="#0F172A"
                />
                <polygon
                  points="62,45 64,49 68,49 65,52 66,56 62,53 58,56 59,52 56,49 60,49"
                  fill="#0F172A"
                />
              </g>
            ) : (
              <g>
                {/* Left Eye */}
                <ellipse cx="37" cy="48" rx="5.5" ry="7.5" fill="#0F172A" />
                <circle cx="35.5" cy="45" r="2.4" fill="#FFFFFF" />
                <circle cx="39" cy="51" r="1.2" fill="#FFFFFF" />
                {/* Right Eye */}
                <ellipse cx="63" cy="48" rx="5.5" ry="7.5" fill="#0F172A" />
                <circle cx="61.5" cy="45" r="2.4" fill="#FFFFFF" />
                <circle cx="65" cy="51" r="1.2" fill="#FFFFFF" />
              </g>
            )}

            {/* Round Reader Glasses if reading */}
            {state === 'reading' && (
              <g>
                <circle cx="37" cy="48" r="8.5" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                <circle cx="63" cy="48" r="8.5" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                <line x1="45.5" y1="48" x2="54.5" y2="48" stroke="#2563EB" strokeWidth="2.5" />
              </g>
            )}

            {/* Signature Cheerful Open Eggy Smile */}
            <path
              d="M42 59 Q50 70 58 59"
              fill="#E11D48"
              stroke="#0F172A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Cute pink tongue */}
            <path d="M45 63 Q50 67 55 63" fill="#FDA4AF" />

            {/* Left Round Stubby Hand */}
            <circle cx="15" cy="58" r="6" fill="#FFD000" stroke="#D97706" strokeWidth="2" />

            {/* Right Hand Holding the Iconic Salty Fish (蛋仔标志性咸鱼武器 🐟) */}
            <g transform="translate(80, 52) rotate(-25)">
              {/* Salty Fish Body (Cyan/Teal) */}
              <path
                d="M-2 0 C6 -5 18 -4 24 2 C18 8 6 9 -2 4 Z"
                fill="#22D3EE"
                stroke="#0891B2"
                strokeWidth="1.5"
              />
              {/* Fish Tail */}
              <polygon points="23,2 29,-3 27,2 29,7" fill="#06B6D4" stroke="#0891B2" strokeWidth="1" />
              {/* Fish X Eye */}
              <path d="M2 -1 L6 3 M6 -1 L2 3" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            <circle cx="82" cy="58" r="6" fill="#FFD000" stroke="#D97706" strokeWidth="2" />

            {/* Cute Feet: White Socks (经典白袜子) & Sneakers */}
            {/* Left Foot */}
            <ellipse cx="37" cy="87" rx="7.5" ry="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="37" cy="90" rx="8" ry="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
            {/* Right Foot */}
            <ellipse cx="63" cy="87" rx="7.5" ry="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="63" cy="90" rx="8" ry="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          </svg>
        );
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
      <div className="w-16 h-16 sm:w-20 sm:h-20">{getMascotSVG()}</div>
      {/* Speech bubble or status tag */}
      <div className="absolute -bottom-2 -right-1 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm border border-pink-200/50 flex items-center gap-1">
        {state === 'reading' && (
          <span className="animate-pulse">
            {type === 'eggy'
              ? '⚡ 搞快点速读中'
              : type === 'pony'
              ? '✨ 魔法伴读中'
              : '📖 速读中'}
          </span>
        )}
        {state === 'paused' && (
          <span>
            {type === 'eggy'
              ? '⏸️ 歇会儿再冲'
              : type === 'pony'
              ? '⏸️ 稍作休息'
              : '⏸️ 休息啦'}
          </span>
        )}
        {state === 'celebrating' && (
          <span>
            {type === 'eggy'
              ? '👑 顺利夺冠！'
              : type === 'pony'
              ? '🌟 友谊之星闪耀！'
              : '🎉 太棒啦'}
          </span>
        )}
        {state === 'idle' && (
          <span>
            {type === 'eggy'
              ? '🍳 撞走不开心'
              : type === 'pony'
              ? '💜 友谊就是魔法'
              : '✨ 伴读中'}
          </span>
        )}
      </div>
    </div>
  );
};
