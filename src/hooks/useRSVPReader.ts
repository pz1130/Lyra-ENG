import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ORPResult, ReaderSettings, WordItem } from '../types/index';
import { processRSVPWord, wpmToMs } from '../utils/rsvpHelper';

interface UseRSVPReaderProps {
  words: WordItem[];
  settings: ReaderSettings;
  onComplete?: () => void;
  onTick?: () => void;
  onSpeak?: (word: string) => void;
}

export function useRSVPReader({
  words,
  settings,
  onComplete,
  onTick,
  onSpeak,
}: UseRSVPReaderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Base interval in ms from WPM
  const baseIntervalMs = useMemo(() => wpmToMs(settings.wpm), [settings.wpm]);

  // Current item being displayed
  const currentItem = words[currentIndex] || null;

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
    return Math.min(100, Math.round(((currentIndex + 1) / words.length) * 100));
  }, [currentIndex, words.length]);

  // Stop current timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Jump to specific word index
  const jumpTo = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, wordsRef.current.length - 1));
      setCurrentIndex(target);
    },
    []
  );

  // Step back N words (default 5)
  const stepBack = useCallback(
    (count = 5) => {
      setCurrentIndex((prev) => Math.max(0, prev - count));
    },
    []
  );

  // Step forward N words (default 5)
  const stepForward = useCallback(
    (count = 5) => {
      setCurrentIndex((prev) =>
        Math.min(wordsRef.current.length - 1, prev + count)
      );
    },
    []
  );

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
    if (settingsRef.current.autoPronounceOnPause && wordsRef.current[currentIndex]) {
      onSpeakRef.current?.(wordsRef.current[currentIndex].word);
    }
  }, [clearTimer, currentIndex]);

  // Start / Resume playback
  const play = useCallback(() => {
    if (wordsRef.current.length === 0) return;
    
    // If reached end, restart from beginning
    if (currentIndex >= wordsRef.current.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }, [currentIndex]);

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

    if (words.length === 0) {
      setIsPlaying(false);
      return;
    }

    const currentWord = words[currentIndex];
    if (!currentWord) {
      setIsPlaying(false);
      return;
    }

    // Play soft tick sound if enabled
    onTickRef.current?.();

    // Auto pronounce every word if kid has that option turned on
    if (settingsRef.current.autoPronounceEveryWord) {
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
      if (currentIndex < words.length - 1) {
        setCurrentIndex((prev) => prev + 1);
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
  }, [isPlaying, currentIndex, words, baseIntervalMs, clearTimer]);

  // Reset index if words array changes completely
  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
    clearTimer();
  }, [words, clearTimer]);

  return {
    currentIndex,
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
