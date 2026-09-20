import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, BookOpen, Trophy } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useTheme } from '../../context/ThemeContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { Mascot } from '../common/Mascot';

interface CompletionCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onOpenLibrary: () => void;
}

export const CompletionCelebration: React.FC<CompletionCelebrationProps> = ({
  isOpen,
  onClose,
  onRestart,
  onOpenLibrary,
}) => {
  const { theme } = useTheme();
  const { activeLibrary, readerSettings } = useLibrary();
  const { playFanfare, playPop } = useSoundEffects();

  useEffect(() => {
    if (isOpen) {
      playFanfare();

      // Trigger multi-stage confetti
      const end = Date.now() + 1.8 * 1000;
      const colors = ['#FF69B4', '#FFD700', '#00FFFF', '#FF4500', '#7B68EE'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen, playFanfare]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-pop-in">
      <div
        className="w-full max-w-md bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-4 border-amber-200 p-6 sm:p-8 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background stars */}
        <div className="absolute top-2 left-4 text-amber-300 animate-spin text-xl">
          ✨
        </div>
        <div className="absolute top-3 right-5 text-pink-300 animate-bounce text-xl">
          🌟
        </div>

        {/* Mascot Celebrating */}
        <div className="flex justify-center mb-3">
          <Mascot
            type={theme.mascotType}
            name={theme.mascotName}
            state="celebrating"
            className="scale-125"
          />
        </div>

        {/* Stars */}
        <div className="flex justify-center items-center gap-2 mb-3">
          <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-bounce delay-75" />
          <Star className="w-10 h-10 fill-amber-400 text-amber-500 animate-bounce" />
          <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-bounce delay-150" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-gray-800 flex items-center justify-center gap-1.5">
          <Trophy className="w-6 h-6 text-amber-500" />
          恭喜你，全部读完啦！
        </h2>
        <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1">
          你完成了《{activeLibrary.title}》的速读挑战！
        </p>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 my-5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div>
            <div className="text-xs font-bold text-amber-800">总共阅读</div>
            <div className="text-xl font-black text-amber-900 mt-0.5">
              {activeLibrary.words.length} <span className="text-xs font-bold">词</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800">速读速度</div>
            <div className="text-xl font-black text-amber-900 mt-0.5">
              {readerSettings.wpm} <span className="text-xs font-bold">WPM</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              playPop();
              onRestart();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-black text-base shadow-lg shadow-pink-200 hover:opacity-95 active:scale-98 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            再读一遍，巩固记忆！
          </button>

          <button
            onClick={() => {
              playPop();
              onClose();
              onOpenLibrary();
            }}
            className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-sm active:scale-98 flex items-center justify-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            挑选下一本词书
          </button>
        </div>
      </div>
    </div>
  );
};
