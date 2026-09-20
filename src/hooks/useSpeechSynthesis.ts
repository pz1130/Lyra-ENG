import { useCallback, useEffect, useState } from 'react';
import { VoiceTone } from '../types/index';

const DISALLOWED_VOICE_NAMES = [
  'albert',
  'bad news',
  'bahh',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'deranged',
  'good news',
  'hysterical',
  'junior',
  'kathy',
  'organ',
  'princess',
  'ralph',
  'trinoids',
  'whisper',
  'zarvox',
  'fred',
  'jester',
];

const PREFERRED_SWEET_VOICES = [
  'samantha',
  'karen',
  'tessa',
  'moira',
  'victoria',
  'flo',
  'google us english',
  'google uk english female',
  'microsoft zira',
  'microsoft jenny',
  'microsoft aria',
  'serena',
  'fiona',
];

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  tone?: VoiceTone;
  voiceURI?: string;
}

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load available system voices & filter out harsh robotic ones
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      
      // Filter for English voices that are NOT harsh/scary novelty voices
      const filtered = allVoices.filter((v) => {
        const isEnglish = v.lang.startsWith('en') || v.lang.startsWith('en_');
        if (!isEnglish) return false;
        const lowerName = v.name.toLowerCase();
        return !DISALLOWED_VOICE_NAMES.some((bad) => lowerName.includes(bad));
      });

      const usableVoices = filtered.length > 0 ? filtered : allVoices;
      setVoices(usableVoices);

      // Find the sweetest, most natural sounding voice
      let bestVoice: SpeechSynthesisVoice | null = null;

      for (const pref of PREFERRED_SWEET_VOICES) {
        const match = usableVoices.find((v) =>
          v.name.toLowerCase().includes(pref)
        );
        if (match) {
          bestVoice = match;
          break;
        }
      }

      if (!bestVoice) {
        // Find default or first English voice
        bestVoice =
          usableVoices.find((v) => v.default && v.lang.startsWith('en')) ||
          usableVoices[0] ||
          null;
      }

      setSelectedVoice(bestVoice);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const getToneModifiers = (tone?: VoiceTone) => {
    switch (tone) {
      case 'child':
        return { pitch: 1.35, rate: 0.95 }; // Warm, cheerful, cute child tone
      case 'sweet':
        return { pitch: 1.18, rate: 0.88 }; // Sweet and gentle sister tone
      case 'fairy':
        return { pitch: 1.55, rate: 1.0 }; // Sparkly, magical fairy tone
      case 'standard':
      default:
        return { pitch: 1.05, rate: 0.9 };
    }
  };

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (!('speechSynthesis' in window) || !text) return;

      // Clean punctuation for speech clarity
      const cleanWord = text.replace(/[^a-zA-Z0-9\s'-]/g, '').trim();
      if (!cleanWord) return;

      window.speechSynthesis.cancel(); // Stop prior utterance

      const utterance = new SpeechSynthesisUtterance(cleanWord);

      const toneMods = getToneModifiers(options?.tone || 'child');
      utterance.pitch = options?.pitch ?? toneMods.pitch;
      utterance.rate = options?.rate ?? toneMods.rate;

      // Select specific voice if requested or fallback to sweet default
      if (options?.voiceURI) {
        const targetVoice = voices.find((v) => v.voiceURI === options.voiceURI);
        if (targetVoice) {
          utterance.voice = targetVoice;
        }
      } else if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice, voices]
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
