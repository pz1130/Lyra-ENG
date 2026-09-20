import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ORPResult, ReaderSettings, WordItem } from '../types/index';
import { processRSVPWord, wpmToMs } from '../utils/rsvpHelper';

interface UseRSVPReaderProps {
  libraryId?: string;
  words: WordItem[];
  settings: ReaderSettings;
  onComplete?: () => void;
  onTick?: () => void;
  onSpeak?: (word: string) => void;
}

export function useRSVPReader({
  libraryId,
  words,
  settings,
  onComplete,
  onTick,
  onSpeak,
}: UseRSVPReaderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronously reset when libraryId or words change (BEFORE render commits)
  const [prevLibraryKey, setPrevLibraryKey] = useState<string>(libraryId || '');
  const [prevWords, setPrevWords] = useState<WordItem[]>(words);

  if ((libraryId && libraryId !== prevLibraryKey) || words !== prevWords) {
    setPrevLibraryKey(libraryId || '');
    setPrevWords(words);
    setCurrentIndex(0);
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  // Keep references to latest callbacks and settings to avoid closure capture issues
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  const onSpeakRef = useRef(onSpeak);
  onSpeakRef.current = onSpeak;

  // Clamped safe index guaranteed to be in valid range [0, words.length - 1]
  const safeIndex =
    words.length > 0
      ? Math.max(0, Math.min(currentIndex, words.length - 1))
      : 0;

  // Base interval in ms from WPM
  const baseIntervalMs = useMemo(() => wpmToMs(settings.wpm), [settings.wpm]);

  // Current item being displayed - ALWAYS fall back to words[0] or words[safeIndex] so it NEVER renders blank!
  const currentItem = words[safeIndex] || (words.length > 0 ? words[0] : null);

  // Process current item into ORP chunks (prefix, focal letter, suffix, delay)
  const currentResult: ORPResult | null = useMemo(() => {
    if (!currentItem) return null;
    return processRSVPWord(
      currentItem,
      baseIntervalMs,
      settings.punctuationPauseMultiplier
    );
  }, [currentItem, baseIntervalMs, settings.punctuationPauseMultiplier]);

  // Calculate percentage progress
  const progress = useMemo(() => {
    if (words.length <= 1) return 100;
    return Math.min(100, Math.round(((safeIndex + 1) / words.length) * 100));
  }, [safeIndex, words.length]);

  // Stop current timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Jump to specific word index
  const jumpTo = useCallback((index: number) => {
    const len = wordsRef.current.length;
    if (len === 0) return;
    const target = Math.max(0, Math.min(index, len - 1));
    setCurrentIndex(target);
  }, []);

  // Step back N words (default 5)
  const stepBack = useCallback((count = 5) => {
    setCurrentIndex((prev) => Math.max(0, prev - count));
  }, []);

  // Step forward N words (default 5)
  const stepForward = useCallback((count = 5) => {
    const len = wordsRef.current.length;
    setCurrentIndex((prev) => Math.min(Math.max(0, len - 1), prev + count));
  }, []);

  // Reset to first word
  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentIndex(0);
  }, [clearTimer]);

  // Pause playback
  const pause = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    if (
      settingsRef.current.autoPronounceOnPause &&
      wordsRef.current[safeIndex]
    ) {
      onSpeakRef.current?.(wordsRef.current[safeIndex].word);
    }
  }, [clearTimer, safeIndex]);

  // Start / Resume playback
  const play = useCallback(() => {
    const list = wordsRef.current;
    if (!list || list.length === 0) return;

    setCurrentIndex((prev) => {
      if (prev >= list.length - 1) {
        return 0;
      }
      return prev;
    });
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Active RSVP execution loop
  useEffect(() => {
    if (!isPlaying) {
      clearTimer();
      return;
    }

    if (!words || words.length === 0) {
      setIsPlaying(false);
      clearTimer();
      return;
    }

    const currentWord = words[safeIndex];
    if (!currentWord) {
      setIsPlaying(false);
      clearTimer();
      return;
    }

    // Play soft tick sound if enabled
    onTickRef.current?.();

    // Auto pronounce every word if kid has that option turned on
    if (settingsRef.current.autoPronounceEveryWord && currentWord.word) {
      onSpeakRef.current?.(currentWord.word);
    }

    // Determine duration for current word taking punctuation into account
    const orp = processRSVPWord(
      currentWord,
      baseIntervalMs,
      settingsRef.current.punctuationPauseMultiplier
    );

    // Schedule next word
    timerRef.current = setTimeout(() => {
      if (safeIndex < words.length - 1) {
        setCurrentIndex(safeIndex + 1);
      } else {
        // Finished entire word book!
        setIsPlaying(false);
        clearTimer();
        onCompleteRef.current?.();
      }
    }, orp.delayMs);

    return () => {
      clearTimer();
    };
  }, [isPlaying, safeIndex, words, baseIntervalMs, clearTimer]);

  return {
    currentIndex: safeIndex,
    currentItem,
    currentResult,
    isPlaying,
    progress,
    play,
    pause,
    togglePlay,
    jumpTo,
    stepBack,
    stepForward,
    reset,
  };
}
