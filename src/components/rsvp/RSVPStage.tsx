import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useTheme } from '../../context/ThemeContext';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { ORPResult, WordItem } from '../../types';
import { Mascot } from '../common/Mascot';

interface RSVPStageProps {
  currentResult: ORPResult | null;
  currentItem: WordItem | null;
  currentIndex: number;
  totalWords: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenLibraryDrawer?: () => void;
}

export const RSVPStage: React.FC<RSVPStageProps> = ({
  currentResult,
  currentItem,
  currentIndex,
  totalWords,
  isPlaying,
  onTogglePlay,
  onOpenLibraryDrawer,
}) => {
  const { theme } = useTheme();
  const { readerSettings } = useLibrary();
  const { speak, isSpeaking } = useSpeechSynthesis();

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentItem?.word) {
      speak(currentItem.word, {
        rate: readerSettings.speechRate,
        pitch: readerSettings.speechPitch,
        tone: readerSettings.voiceTone,
        voiceURI: readerSettings.selectedVoiceURI,
      });
    }
  };

  // Font size mapping for children
  const getFontSizeClass = () => {
    switch (readerSettings.fontSize) {
      case 'md':
        return 'text-4xl sm:text-5xl';
      case 'lg':
        return 'text-5xl sm:text-6xl';
      case 'xl':
        return 'text-6xl sm:text-7xl';
      case '2xl':
        return 'text-7xl sm:text-8xl';
      case '3xl':
        return 'text-8xl sm:text-9xl';
      default:
        return 'text-6xl sm:text-7xl';
    }
  };

  const getFontFamilyClass = () => {
    switch (readerSettings.fontFamily) {
      case 'reading':
        return 'font-reading';
      case 'comic':
        return 'font-comic';
      default:
        return 'font-sans';
    }
  };

  const mascotState = isPlaying ? 'reading' : 'paused';

  const wordStageRef = useRef<HTMLDivElement>(null);
  const focalRef = useRef<HTMLSpanElement>(null);
  const [wordScale, setWordScale] = useState(1);

  const fitWordToStage = useCallback(() => {
    const stage = wordStageRef.current;
    const focalEl = focalRef.current;
    if (!stage || !focalEl || !currentResult) return;

    const stageStyle = window.getComputedStyle(stage);
    const available =
      stage.clientWidth -
      (parseFloat(stageStyle.paddingLeft) || 0) -
      (parseFloat(stageStyle.paddingRight) || 0);
    if (available <= 0) return;

    const fontStyle = window.getComputedStyle(focalEl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.font = `${fontStyle.fontWeight} ${fontStyle.fontSize} ${fontStyle.fontFamily}`;

    const prefixW = ctx.measureText(currentResult.prefix || '').width;
    const focalW = Math.max(ctx.measureText(currentResult.focal || '').width, 1);
    const suffixW = ctx.measureText(currentResult.suffix || '').width;
    const half = Math.max(1, available / 2 - 6);
    const leftExtent = prefixW + focalW / 2;
    const rightExtent = suffixW + focalW / 2;
    const next = Math.max(
      0.38,
      Math.min(1, half / Math.max(leftExtent, 1), half / Math.max(rightExtent, 1))
    );

    setWordScale((prev) => (Math.abs(prev - next) < 0.012 ? prev : next));
  }, [currentResult, readerSettings.fontSize, readerSettings.fontFamily]);

  useLayoutEffect(() => {
    fitWordToStage();
    const stage = wordStageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => fitWordToStage());
    observer.observe(stage);

    void document.fonts?.ready?.then(() => fitWordToStage());

    return () => observer.disconnect();
  }, [fitWordToStage]);

  return (
    <div
      onClick={onTogglePlay}
      className={`relative w-full max-w-4xl mx-auto rounded-3xl sm:rounded-4xl border-2 sm:border-3 ${theme.colors.cardBorder} ${theme.colors.cardBg} shadow-xl p-4 sm:p-8 cursor-pointer select-none transition-all duration-300 hover:shadow-2xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-between`}
    >
      {/* Top Bar inside Stage: Mascot, Status & Pronounce */}
      <div className="flex items-center justify-between w-full">
        {/* Progress tag */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-black/5 text-xs font-black tracking-wide text-gray-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {currentIndex + 1} / {totalWords} 词
            </span>
          </div>

          {/* Quick Pronounce Button */}
          {currentItem && (
            <button
              onClick={handlePronounce}
              className={`p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 border border-gray-200/80 shadow-xs transition-transform active:scale-90 ${
                isSpeaking ? 'ring-2 ring-pink-400 text-pink-600' : ''
              }`}
              title="听发音"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Companion Mascot */}
        <div onClick={(e) => e.stopPropagation()}>
          <Mascot
            type={theme.mascotType}
            name={theme.mascotName}
            state={mascotState}
          />
        </div>
      </div>

      {/* Center RSVP Display Arena */}
      <div className="relative my-auto py-8 sm:py-12 flex flex-col items-center justify-center">
        {/* Top Focus Tick Marker (AccelaReader ORP alignment indicator) */}
        {readerSettings.showORPIndicator && (
          <div className="absolute top-2 w-full flex justify-center pointer-events-none">
            <div className="flex flex-col items-center">
              <div
                className="w-1.5 h-3.5 rounded-full"
                style={{ backgroundColor: theme.colors.orpColor }}
              />
              <div
                className="w-0.5 h-2"
                style={{ backgroundColor: theme.colors.orpColor }}
              />
            </div>
          </div>
        )}

        {/* Word Stage with Rigid ORP Alignment */}
        {totalWords === 0 ? (
          <div className="flex flex-col items-center gap-3 text-center py-4">
            <span className="text-4xl animate-bounce-gentle">📚</span>
            <p className="text-sm font-bold text-gray-500">
              当前词书暂时还没有单词哦
            </p>
            {onOpenLibraryDrawer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLibraryDrawer();
                }}
                className="px-4 py-2 rounded-2xl bg-pink-500 text-white font-black text-xs shadow-md shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95"
              >
                打开词书库选择其他词书
              </button>
            )}
          </div>
        ) : currentResult ? (
          <div ref={wordStageRef} className="w-full overflow-visible px-1">
            <div
              className={`w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center font-extrabold tracking-normal ${getFontSizeClass()} ${getFontFamilyClass()}`}
              style={{
                transform: `scale(${wordScale})`,
                transformOrigin: 'center center',
              }}
            >
              <span
                className={`min-w-0 justify-self-end whitespace-nowrap pr-[0.05em] ${theme.colors.textPrimary}`}
              >
                {currentResult.prefix}
              </span>

              <span
                ref={focalRef}
                className="relative shrink-0 font-black px-[0.02em]"
                style={{ color: theme.colors.orpColor }}
              >
                {currentResult.focal}
                <span
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-60"
                  style={{ backgroundColor: theme.colors.orpColor }}
                />
              </span>

              <span
                className={`min-w-0 justify-self-start whitespace-nowrap pl-[0.05em] ${theme.colors.textPrimary}`}
              >
                {currentResult.suffix}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            准备就绪，轻触屏幕开始速读
          </div>
        )}

        {/* Bottom Focus Tick Marker */}
        {readerSettings.showORPIndicator && (
          <div className="absolute bottom-2 w-full flex justify-center pointer-events-none">
            <div className="flex flex-col items-center">
              <div
                className="w-0.5 h-2"
                style={{ backgroundColor: theme.colors.orpColor }}
              />
              <div
                className="w-1.5 h-3.5 rounded-full"
                style={{ backgroundColor: theme.colors.orpColor }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Information (Translation / Phonetic / Tap Hint) */}
      <div className="w-full flex flex-col items-center gap-2 pt-2 border-t border-black/5">
        {readerSettings.showTranslation && (
          <div className="min-h-[28px] flex items-center justify-center">
            {currentItem?.translation ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-gray-200/80 text-sm font-black text-gray-700 shadow-2xs">
                <span>{currentItem.translation}</span>
                {currentItem.phonetic && (
                  <span className="text-xs font-medium text-gray-400">
                    {currentItem.phonetic}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-gray-400/80">轻触屏幕可随时暂停 / 播放</span>
            )}
          </div>
        )}

        {/* Mobile touch hint */}
        <div className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
          {isPlaying ? (
            <span>轻触中央任意处暂停 ⏸️</span>
          ) : (
            <span className="text-pink-600 font-extrabold flex items-center gap-1">
              ▶️ 轻触屏幕或按空格键继续
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
