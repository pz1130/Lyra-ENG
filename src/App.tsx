import React, { useEffect, useState, useCallback } from 'react';
import { useLibrary } from './context/LibraryContext';
import { useTheme } from './context/ThemeContext';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { useRSVPReader } from './hooks/useRSVPReader';

import { Header } from './components/common/Header';
import { RSVPStage } from './components/rsvp/RSVPStage';
import { RSVPControls } from './components/rsvp/RSVPControls';
import { CompletionCelebration } from './components/rsvp/CompletionCelebration';
import { ThemePickerModal } from './components/common/ThemePickerModal';
import { LibraryDrawer } from './components/library/LibraryDrawer';
import { ImportModal } from './components/library/ImportModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { IOSInstallGuide } from './components/common/IOSInstallGuide';

export const App: React.FC = () => {
  const { theme } = useTheme();
  const { activeLibrary, readerSettings } = useLibrary();
  const { playTick } = useSoundEffects(readerSettings.soundEffectsEnabled);
  const { speak } = useSpeechSynthesis();

  // Modals state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isLibraryDrawerOpen, setIsLibraryDrawerOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isIOSGuideOpen, setIsIOSGuideOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // RSVP Reader Engine
  const {
    currentIndex,
    currentItem,
    currentResult,
    isPlaying,
    togglePlay,
    stepBack,
    stepForward,
    jumpTo,
    reset,
  } = useRSVPReader({
    libraryId: activeLibrary.id,
    words: activeLibrary.words || [],
    settings: readerSettings,
    onComplete: () => {
      setIsCompletionOpen(true);
    },
    onTick: () => {
      if (readerSettings.tickSoundEnabled) {
        playTick();
      }
    },
    onSpeak: (word: string) => {
      speak(word, {
        rate: readerSettings.speechRate,
        pitch: readerSettings.speechPitch,
        tone: readerSettings.voiceTone,
        voiceURI: readerSettings.selectedVoiceURI,
      });
    },
  });

  // Keyboard controls (Space to toggle play, Left/Right arrow to step)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepBack(5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward(5);
      } else if (e.code === 'Escape') {
        setIsThemeModalOpen(false);
        setIsLibraryDrawerOpen(false);
        setIsImportModalOpen(false);
        setIsSettingsModalOpen(false);
        setIsIOSGuideOpen(false);
        setIsCompletionOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, stepBack, stepForward]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${theme.colors.bgGradient} flex flex-col justify-between transition-colors duration-500 font-sans`}
    >
      {/* Top Header */}
      <Header
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenLibraryDrawer={() => setIsLibraryDrawerOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenIOSGuide={() => setIsIOSGuideOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main Interactive Speed Reading Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center gap-4 sm:gap-6">
        <RSVPStage
          key={`stage-${activeLibrary.id}`}
          currentResult={currentResult}
          currentItem={currentItem}
          currentIndex={currentIndex}
          totalWords={activeLibrary.words?.length || 0}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onOpenLibraryDrawer={() => setIsLibraryDrawerOpen(true)}
        />

        <RSVPControls
          key={`controls-${activeLibrary.id}`}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onStepBack={stepBack}
          onStepForward={stepForward}
          onReset={reset}
          currentIndex={currentIndex}
          totalWords={activeLibrary.words?.length || 0}
          onScrub={jumpTo}
        />
      </main>

      {/* Bottom Kid-Friendly Subtle Footer */}
      <footer className="w-full py-2.5 px-4 text-center text-xs font-bold opacity-60 flex items-center justify-center gap-2">
        <span>🐰 萌萌速读 (Lyra Reader) · 视线定焦不晃眼，轻松爱上阅读</span>
      </footer>

      {/* Interactive Modals */}
      <ThemePickerModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      <LibraryDrawer
        isOpen={isLibraryDrawerOpen}
        onClose={() => setIsLibraryDrawerOpen(false)}
        onOpenImport={() => {
          setIsLibraryDrawerOpen(false);
          setIsImportModalOpen(true);
        }}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <IOSInstallGuide
        isOpen={isIOSGuideOpen}
        onClose={() => setIsIOSGuideOpen(false)}
      />

      <CompletionCelebration
        isOpen={isCompletionOpen}
        onClose={() => setIsCompletionOpen(false)}
        onRestart={reset}
        onOpenLibrary={() => setIsLibraryDrawerOpen(true)}
      />
    </div>
  );
};
export default App;
