import { useCallback, useEffect, useState } from 'react';

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load available system voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const englishVoices = allVoices.filter(
        (v) => v.lang.startsWith('en') || v.lang.startsWith('en_')
      );
      setVoices(englishVoices.length > 0 ? englishVoices : allVoices);

      // Prefer friendly native voices if available
      const preferred = englishVoices.find(
        (v) =>
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Daniel') ||
          v.name.includes('Google US English') ||
          v.lang === 'en-US'
      );
      if (preferred) {
        setSelectedVoice(preferred);
      } else if (englishVoices.length > 0) {
        setSelectedVoice(englishVoices[0]);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, rate: number = 0.9) => {
      if (!('speechSynthesis' in window) || !text) return;

      // Clean punctuation for speech clarity
      const cleanWord = text.replace(/[^a-zA-Z0-9\s'-]/g, '').trim();
      if (!cleanWord) return;

      window.speechSynthesis.cancel(); // Stop prior utterance

      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.rate = rate;
      utterance.pitch = 1.05; // Slightly higher pitch is warmer and friendlier for kids

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice]
  );

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
    isSpeaking,
  };
}
