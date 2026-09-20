import React, { useState } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

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
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
            {/* Twilight Horn Magic Glow Aura */}
            <g className={state === 'celebrating' ? 'animate-pulse' : ''}>
              <circle cx="89" cy="7" r="5" fill="#F472B6" fillOpacity="0.35" />
              <circle cx="89" cy="7" r="2.2" fill="#FFFFFF" />
              <path d="M89 1 L89 13 M83 7 L95 7" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M85 3 L93 11 M85 11 L93 3" stroke="#F472B6" strokeWidth="1.2" strokeLinecap="round" />
              {state === 'celebrating' && (
                <>
                  <circle cx="78" cy="4" r="1.5" fill="#EC4899" />
                  <circle cx="98" cy="14" r="1.5" fill="#A855F7" />
                  <path d="M74 14 L76 16 M74 16 L76 14" stroke="#EC4899" strokeWidth="1" />
                </>
              )}
            </g>

            {/* 1. TAIL (Behind Rump) - Sweeping tail with blunt cut and magenta & violet twin stripes */}
            <g>
              {/* Base Dark Indigo Tail */}
              <path
                d="M34 56 C18 46 7 60 7 76 C7 92 11 102 17 108 L29 102 C22 94 18 84 19 74 C20 63 26 57 34 56 Z"
                fill="#1E1B4B"
              />
              {/* Magenta Stripe */}
              <path
                d="M31 56 C19 50 11 61 11 76 C11 90 14 98 19 105 L24 103 C19 96 16 85 17 74 C18 64 24 59 31 56 Z"
                fill="#EC4899"
              />
              {/* Violet Stripe */}
              <path
                d="M28 56 C19 53 14 63 14 76 C14 88 16 95 20 103 L23 102 C19 94 17 84 18 74 C19 66 24 60 28 56 Z"
                fill="#8B5CF6"
              />
            </g>

            {/* 2. FAR LIMBS (Back hind & front legs, shaded lavender #C084FC) */}
            {/* Far Hind Leg */}
            <path
              d="M47 66 C44 76 43 86 42 96 L41 106 L51 106 L52 96 C53 86 55 76 56 68 Z"
              fill="#C084FC"
              stroke="#7E22CE"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Far Front Leg */}
            <path
              d="M68 66 L64 84 L63 94 L62 106 L72 106 L74 94 L75 82 L78 68 Z"
              fill="#C084FC"
              stroke="#7E22CE"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* 3. BACK MANE (Hugging back of neck down to withers, straight blunt cut) */}
            <g>
              <path d="M72 26 C66 34 60 48 54 64 L66 64 C70 52 74 38 78 30 Z" fill="#1E1B4B" />
              <path d="M70 30 C64 38 59 50 56 62 L60 62 C63 51 67 40 74 34 Z" fill="#EC4899" />
              <path d="M68 34 C63 42 59 52 57 62 L59 62 C61 52 65 42 71 37 Z" fill="#8B5CF6" />
            </g>

            {/* 4. FAR EAR */}
            <path d="M73 22 C70 12 76 9 79 18 Z" fill="#C084FC" stroke="#7E22CE" strokeWidth="1.8" />
            <path d="M74 19 C72 14 76 12 78 17 Z" fill="#F472B6" />

            {/* 5. SEAMLESS BODY (Torso, Chest, Front Leg, Belly, Flank & Hind Leg) */}
            <path
              d="M78 58 C82 62 84 72 84 86 L85 106 L73 106 L73 94 C73 84 70 80 64 80 C56 80 50 82 46 86 L44 94 L42 106 L30 106 L30 94 C29 84 27 76 32 66 C36 58 44 56 54 56 C64 56 72 54 78 58 Z"
              fill="#D8B4FE"
              stroke="#7E22CE"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* 6. PRINCESS WINGS (Folded Alicorn Wing) */}
            <g transform="translate(52, 54)">
              <path
                d="M2 4 C6 -2 16 -1 18 5 C18 10 13 15 9 17 C5 18 2 15 2 12 C0 10 0 5 2 4 Z"
                fill="#E9D5FF"
                stroke="#7E22CE"
                strokeWidth="1.8"
              />
              <path d="M6 7 C10 5 14 6 15 9 C13 13 9 15 7 14" stroke="#9333EA" strokeWidth="1.2" fill="none" />
            </g>

            {/* 7. CUTIE MARK ON FLANK (6-pointed Magenta Star + 5 White Sparkle Stars) */}
            <g transform="translate(38, 68)">
              {/* Main 6-pointed Star */}
              <path
                d="M0 -7 L1.8 -2.2 L6.5 -3.2 L3.2 0.8 L6.2 4.8 L1.5 3.2 L0 7.5 L-1.5 3.2 L-6.2 4.8 L-3.2 0.8 L-6.5 -3.2 L-1.8 -2.2 Z"
                fill="#DB2777"
              />
              <circle cx="0" cy="0.5" r="1.3" fill="#FFFFFF" />
              {/* 5 Sparkle Stars */}
              <circle cx="5" cy="-5" r="1" fill="#FFFFFF" />
              <circle cx="-5" cy="-5" r="1" fill="#FFFFFF" />
              <circle cx="-5" cy="5" r="1" fill="#FFFFFF" />
              <circle cx="5" cy="5" r="1" fill="#FFFFFF" />
              <circle cx="0" cy="-8.5" r="1" fill="#FFFFFF" />
            </g>

            {/* 8. HEAD & SNOUT (Big Hasbro Chibi Head) */}
            <path
              d="M70 48 C70 36 74 26 82 22 C92 18 104 22 110 30 C115 36 116 44 112 49 C108 54 100 55 95 54 C90 54 85 58 80 62 C74 58 72 54 70 48 Z"
              fill="#D8B4FE"
              stroke="#7E22CE"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* 9. NEAR EAR */}
            <path d="M80 22 C78 11 86 8 89 18 Z" fill="#D8B4FE" stroke="#7E22CE" strokeWidth="2" />
            <path d="M81 19 C80 13 85 11 87 17 Z" fill="#F472B6" />

            {/* 10. UNICORN HORN */}
            <polygon points="89,7 83,23 91,20" fill="#D8B4FE" stroke="#7E22CE" strokeWidth="1.8" strokeLinejoin="round" />
            <line x1="84.5" y1="19" x2="90" y2="17.5" stroke="#9333EA" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="86" y1="14" x2="90.5" y2="13" stroke="#9333EA" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="87.5" y1="10" x2="90.5" y2="9.5" stroke="#9333EA" strokeWidth="1.4" strokeLinecap="round" />

            {/* 11. STRAIGHT-CUT BANGS (齐刘海) WITH TWIN STRIPES */}
            {/* Base Indigo Bangs */}
            <path d="M76 18 C84 15 96 17 102 22 C105 26 104 36 96 38 L94 42 L84 42 C83 36 82 28 76 18 Z" fill="#1E1B4B" />
            {/* Magenta Stripe */}
            <path d="M80 18 C86 17 95 19 100 23 C102 27 100 35 95 37 L93 41 L89 41 C87 36 84 27 80 18 Z" fill="#EC4899" />
            {/* Violet Stripe */}
            <path d="M83 19 C88 18 94 20 98 24 C100 28 98 34 94 36 L92 40 L90 40 C89 36 86 27 83 19 Z" fill="#8B5CF6" />

            {/* Cheek Blush */}
            <ellipse cx="100" cy="46" rx="4.5" ry="2.8" fill="#F472B6" fillOpacity="0.55" />

            {/* 12. HASBRO BIG EXPRESSIVE VIOLET EYE */}
            {state === 'celebrating' ? (
              // Joyful smiling eyes with lashes
              <g>
                <path d="M89 36 Q95 30 101 36" stroke="#581C87" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M98 29 L102 27 M99 32 L103 31" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                {/* Sclera */}
                <ellipse cx="94" cy="35" rx="6.5" ry="8.5" fill="#FFFFFF" stroke="#581C87" strokeWidth="1.2" />
                {/* Violet Iris */}
                <ellipse cx="95" cy="35" rx="5" ry="7" fill="#581C87" />
                <ellipse cx="96" cy="36" rx="3.8" ry="5.2" fill="#9333EA" />
                {/* Pupil */}
                <ellipse cx="95.5" cy="35" rx="2.5" ry="4" fill="#1E1B4B" />
                {/* Double Catchlights */}
                <circle cx="93" cy="32" r="2.2" fill="#FFFFFF" />
                <circle cx="97" cy="38" r="1.3" fill="#FFFFFF" />
                {/* 3 Iconic Curved Hasbro Eyelashes */}
                <path d="M98 28 L103 25" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
                <path d="M100 31 L105 30" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
                <path d="M100 35 L104 36" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {/* Smart Scholar Glasses when reading */}
            {state === 'reading' && (
              <g>
                <ellipse cx="94" cy="35" rx="8" ry="9.5" stroke="#9333EA" strokeWidth="2" fill="none" />
                <path d="M86 35 L82 35" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {/* Muzzle & Sweet Smile */}
            <circle cx="108" cy="43" r="1.2" fill="#9333EA" />
            <path d="M102 48 Q106 51 109 46" stroke="#581C87" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'eggy':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
            {/* Party Crown for Champion Eggy (when celebrating) */}
            {state === 'celebrating' && (
              <g className="animate-bounce-gentle">
                <polygon
                  points="46,26 50,14 55,22 60,11 65,22 70,14 74,26"
                  fill="#FACC15"
                  stroke="#CA8A04"
                  strokeWidth="1.6"
                />
                <circle cx="60" cy="11" r="2.8" fill="#EF4444" />
                <circle cx="50" cy="14" r="2.2" fill="#3B82F6" />
                <circle cx="70" cy="14" r="2.2" fill="#10B981" />
              </g>
            )}

            {/* 1. SIGNATURE HEAD TUFT (头顶小揪揪 / 呆毛) */}
            <g>
              {/* Hair tie band */}
              <ellipse cx="60" cy="22" rx="4" ry="2" fill="#EA580C" />
              {/* Cute sprout / tuft */}
              <path
                d="M60 21 C58 11 50 6 46 8 C44 9 45 12 49 13 C54 14 57 18 59 22 Z"
                fill="#F59E0B"
                stroke="#D97706"
                strokeWidth="1.3"
              />
              <path
                d="M60 21 C62 10 70 5 74 7 C76 8 75 11 71 12 C66 13 63 18 61 22 Z"
                fill="#FFB703"
                stroke="#D97706"
                strokeWidth="1.3"
              />
              <circle cx="60" cy="18" r="3" fill="#FBBF24" />
            </g>

            {/* 2. ROUND EGG BODY (Egg Yolk Yellow #FFD000) */}
            <ellipse cx="60" cy="65" rx="36" ry="38" fill="#FFD000" stroke="#D97706" strokeWidth="2.6" />

            {/* Ambient highlight on top of egg */}
            <path d="M40 36 C48 30 72 30 80 36 C72 32 48 32 40 36 Z" fill="#FEF08A" opacity="0.9" />
            {/* Pale yellow belly patch */}
            <ellipse cx="60" cy="74" rx="24" ry="20" fill="#FEF08A" opacity="0.65" />

            {/* 3. ROSY BLUSH CHEEKS */}
            <ellipse cx="35" cy="67" rx="5.5" ry="3.5" fill="#FB7185" fillOpacity="0.85" />
            <ellipse cx="85" cy="67" rx="5.5" ry="3.5" fill="#FB7185" fillOpacity="0.85" />

            {/* 4. SIGNATURE OBSIDIAN EYES */}
            {state === 'celebrating' ? (
              // Starry Party Eyes
              <g>
                <polygon points="46,51 48,55 52,55 49,58 50,62 46,59 42,62 43,58 40,55 44,55" fill="#0F172A" />
                <polygon points="74,51 76,55 80,55 77,58 78,62 74,59 70,62 71,58 68,55 72,55" fill="#0F172A" />
              </g>
            ) : (
              <g>
                {/* Left Eye */}
                <ellipse cx="46" cy="58" rx="6" ry="8.5" fill="#0F172A" />
                <circle cx="44.2" cy="54.5" r="2.6" fill="#FFFFFF" />
                <circle cx="48" cy="61.5" r="1.3" fill="#FFFFFF" />
                {/* Right Eye */}
                <ellipse cx="74" cy="58" rx="6" ry="8.5" fill="#0F172A" />
                <circle cx="72.2" cy="54.5" r="2.6" fill="#FFFFFF" />
                <circle cx="76" cy="61.5" r="1.3" fill="#FFFFFF" />
              </g>
            )}

            {/* Round Reader Glasses if reading */}
            {state === 'reading' && (
              <g>
                <circle cx="46" cy="58" r="9" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                <circle cx="74" cy="58" r="9" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                <line x1="55" y1="58" x2="65" y2="58" stroke="#2563EB" strokeWidth="2.5" />
              </g>
            )}

            {/* 5. CHEERFUL OPEN SMILE */}
            <path d="M51 68 Q60 80 69 68 Z" fill="#E11D48" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
            <path d="M54 72 Q60 77 66 72" fill="#FDA4AF" />

            {/* 6. LEFT HAND */}
            <circle cx="21" cy="70" r="7" fill="#FFD000" stroke="#D97706" strokeWidth="2.2" />

            {/* 7. RIGHT HAND & SALTY FISH (咸鱼 🐟) */}
            <g transform="translate(90, 68)">
              {/* Fish tilted diagonally up */}
              <g transform="rotate(-30)">
                {/* Fish Body */}
                <path d="M-8 0 C0 -9 20 -8 28 1 C20 10 0 9 -8 0 Z" fill="#22D3EE" stroke="#0891B2" strokeWidth="1.8" />
                {/* Tail fin */}
                <polygon points="27,1 36,-6 33,1 36,8" fill="#06B6D4" stroke="#0891B2" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Dorsal fin */}
                <path d="M8 -7 Q13 -12 18 -5" fill="#06B6D4" stroke="#0891B2" strokeWidth="1.2" />
                {/* Deadpan X Eye */}
                <line x1="-2" y1="-2" x2="4" y2="3" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="4" y1="-2" x2="-2" y2="3" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
              </g>
              {/* Hand grabbing fish */}
              <circle cx="0" cy="0" r="7" fill="#FFD000" stroke="#D97706" strokeWidth="2.2" />
            </g>

            {/* 8. OFFICIAL WHITE SOCKS (白袜子) & SNEAKERS */}
            {/* Left Foot */}
            <ellipse cx="46" cy="103" rx="8" ry="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
            <ellipse cx="46" cy="106" rx="8.5" ry="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.6" />
            {/* Right Foot */}
            <ellipse cx="74" cy="103" rx="8" ry="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
            <ellipse cx="74" cy="106" rx="8.5" ry="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.6" />
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
      <div className="w-20 h-20 sm:w-24 sm:h-24">{getMascotSVG()}</div>
      {/* Speech bubble or status tag */}
      {showTag && (
        <div className="absolute -bottom-2 -right-1 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm border border-pink-200/50 flex items-center gap-1 pointer-events-none">
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
      )}
    </div>
  );
};
