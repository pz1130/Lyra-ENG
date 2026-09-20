import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useTheme } from '../../context/ThemeContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface RSVPControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack: (count?: number) => void;
  onStepForward: (count?: number) => void;
  onReset: () => void;
  currentIndex: number;
  totalWords: number;
  onScrub: (index: number) => void;
}

const SPEED_PRESETS = [
  { label: '60', name: '龟龟速 🐢', wpm: 60 },
  { label: '90', name: '兔兔速 🐰', wpm: 90 },
  { label: '120', name: '小鹿速 🦌', wpm: 120 },
  { label: '180', name: '猎豹速 🐆', wpm: 180 },
  { label: '250', name: '火箭速 🚀', wpm: 250 },
];

export const RSVPControls: React.FC<RSVPControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onStepBack,
  onStepForward,
  onReset,
  currentIndex,
  totalWords,
  onScrub,
}) => {
  const { theme } = useTheme();
  const { readerSettings, updateSettings } = useLibrary();
  const { playPop } = useSoundEffects();

  const handlePresetWpm = (wpm: number) => {
    playPop();
    updateSettings({ wpm });
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onScrub(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 select-none">
      {/* Visual Scrubber / Progress Bar */}
      <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl p-3 border border-gray-200/70 shadow-xs">
        <div className="flex items-center justify-between text-xs font-black text-gray-500 mb-1.5 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            阅读进度
          </span>
          <span>
            {currentIndex + 1} / {totalWords} (
            {totalWords > 0
              ? Math.round(((currentIndex + 1) / totalWords) * 100)
              : 0}
            %)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalWords - 1)}
          value={currentIndex}
          onChange={handleScrubberChange}
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>

      {/* Main Playback Control Bar */}
      <div
        className={`w-full rounded-3xl border-2 ${theme.colors.cardBorder} ${theme.colors.cardBg} shadow-lg p-3 sm:p-5 flex flex-col gap-4`}
      >
        {/* Playback Buttons row */}
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {/* Reset button */}
          <button
            onClick={() => {
              playPop();
              onReset();
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center shadow-xs active:scale-90 transition-transform"
            title="从头开始"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Step back 5 words */}
          <button
            onClick={() => {
              playPop();
              onStepBack(5);
            }}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 font-black text-xs sm:text-sm shadow-xs active:scale-90 transition-transform"
            title="倒退 5 个词"
          >
            <SkipBack className="w-4 h-4" />
            <span>-5词</span>
          </button>

          {/* Big Chunky Play / Pause Button */}
          <button
            onClick={() => {
              playPop();
              onTogglePlay();
            }}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl ${theme.colors.primaryBtn} ${theme.colors.primaryBtnHover} flex items-center justify-center shadow-xl active:scale-95 transition-all duration-200`}
            title={isPlaying ? '暂停 (空格)' : '开始速读 (空格)'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
            )}
          </button>

          {/* Step forward 5 words */}
          <button
            onClick={() => {
              playPop();
              onStepForward(5);
            }}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 font-black text-xs sm:text-sm shadow-xs active:scale-90 transition-transform"
            title="快进 5 个词"
          >
            <span>+5词</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Adjustment: Quick Presets & Slider */}
        <div className="pt-2 border-t border-black/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black text-gray-700">
              <Gauge className="w-4 h-4 text-pink-500" />
              <span>速度控制 (WPM: 每分钟词数)</span>
            </div>
            <span className="text-sm font-black px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {readerSettings.wpm} WPM
            </span>
          </div>

          {/* Quick presets for children */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {SPEED_PRESETS.map((preset) => {
              const isCurrent = readerSettings.wpm === preset.wpm;
              return (
                <button
                  key={preset.wpm}
                  onClick={() => handlePresetWpm(preset.wpm)}
                  className={`py-1.5 sm:py-2 px-1 rounded-xl text-center font-black transition-all active:scale-95 ${
                    isCurrent
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-102'
                      : 'bg-white/80 hover:bg-white text-gray-700 border border-gray-200/80 text-xs'
                  }`}
                >
                  <div className="text-[10px] sm:text-xs leading-tight">
                    {preset.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continuous slider */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-[11px] font-bold text-gray-400">慢 (50)</span>
            <input
              type="range"
              min={50}
              max={400}
              step={10}
              value={readerSettings.wpm}
              onChange={(e) =>
                updateSettings({ wpm: parseInt(e.target.value, 10) })
              }
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <span className="text-[11px] font-bold text-gray-400">快 (400)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
