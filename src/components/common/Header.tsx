import React from 'react';
import {
  BookOpen,
  Maximize,
  Minimize,
  Palette,
  Settings,
  Tablet,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useTheme } from '../../context/ThemeContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface HeaderProps {
  onOpenThemeModal: () => void;
  onOpenLibraryDrawer: () => void;
  onOpenSettingsModal: () => void;
  onOpenIOSGuide: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenThemeModal,
  onOpenLibraryDrawer,
  onOpenSettingsModal,
  onOpenIOSGuide,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { theme } = useTheme();
  const { activeLibrary, readerSettings, updateSettings } = useLibrary();
  const { playPop } = useSoundEffects();

  const toggleSound = () => {
    playPop();
    updateSettings({ soundEffectsEnabled: !readerSettings.soundEffectsEnabled });
  };

  return (
    <header
      className={`w-full px-3.5 py-2.5 sm:px-6 sm:py-3 transition-colors duration-300 border-b ${theme.colors.navBg} backdrop-blur-md sticky top-0 z-30 flex items-center justify-between shadow-xs`}
    >
      {/* Left: Brand & Library Selector */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={onOpenLibraryDrawer}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-sm shrink-0">
            <span className="text-xl">🐰</span>
          </div>
          <div className="hidden xs:block">
            <h1 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1 leading-tight text-gray-800">
              萌萌速读
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                Lyra
              </span>
            </h1>
          </div>
        </div>

        {/* Current Active Library pill */}
        <button
          onClick={() => {
            playPop();
            onOpenLibraryDrawer();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold border transition-all active:scale-95 max-w-[160px] sm:max-w-[240px] truncate shadow-xs ${theme.colors.badgeBg}`}
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{activeLibrary.title}</span>
          <span className="text-[10px] opacity-75 shrink-0 font-normal">
            ({activeLibrary.words.length}词)
          </span>
        </button>
      </div>

      {/* Right: Quick Tools */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* iOS / iPad Install Guide */}
        <button
          onClick={() => {
            playPop();
            onOpenIOSGuide();
          }}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl text-xs font-bold text-amber-800 bg-amber-100/80 hover:bg-amber-100 border border-amber-300/60 flex items-center gap-1.5 transition-transform active:scale-95 shadow-2xs"
          title="安装到 iPhone / iPad"
        >
          <Tablet className="w-4 h-4 text-amber-700" />
          <span className="hidden md:inline">装到iPad/iPhone</span>
        </button>

        {/* Theme Picker Button */}
        <button
          onClick={() => {
            playPop();
            onOpenThemeModal();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl text-xs font-black bg-white/90 hover:bg-white text-gray-700 border border-gray-200/80 shadow-2xs transition-all active:scale-95"
          title="切换可爱皮肤"
        >
          <span className="text-base">{theme.emoji}</span>
          <span className="hidden sm:inline font-extrabold">{theme.name}</span>
          <Palette className="w-3.5 h-3.5 text-gray-400 sm:hidden" />
        </button>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-2xl border transition-all active:scale-95 ${
            readerSettings.soundEffectsEnabled
              ? 'bg-white/90 text-gray-700 border-gray-200/80'
              : 'bg-gray-100 text-gray-400 border-gray-200'
          }`}
          title={readerSettings.soundEffectsEnabled ? '音效开启' : '音效静音'}
        >
          {readerSettings.soundEffectsEnabled ? (
            <Volume2 className="w-4 h-4 text-pink-500" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => {
            playPop();
            onOpenSettingsModal();
          }}
          className="p-2 rounded-2xl bg-white/90 hover:bg-white text-gray-700 border border-gray-200/80 shadow-2xs transition-all active:scale-95"
          title="速读与发音设置"
        >
          <Settings className="w-4 h-4 text-gray-600" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={() => {
            playPop();
            onToggleFullscreen();
          }}
          className="p-2 rounded-2xl bg-white/90 hover:bg-white text-gray-700 border border-gray-200/80 shadow-2xs transition-all active:scale-95 hidden sm:flex"
          title={isFullscreen ? '退出全屏' : '全屏专注模式'}
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 text-gray-600" />
          ) : (
            <Maximize className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};
