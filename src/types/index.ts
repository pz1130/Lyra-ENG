export interface WordItem {
  id: string;
  word: string;
  translation?: string;
  phonetic?: string;
  example?: string;
}

export type LibraryCategory = 'sight-words' | 'phonics' | 'stories' | 'custom' | 'cambridge';

export interface WordLibrary {
  id: string;
  title: string;
  description: string;
  category: LibraryCategory;
  isCustom?: boolean;
  createdAt?: number;
  badgeEmoji?: string;
  words: WordItem[];
}

export type VoiceTone = 'child' | 'sweet' | 'fairy' | 'standard';

export interface ReaderSettings {
  wpm: number; // 60 to 450
  chunkSize: number; // 1 or 2
  punctuationPauseMultiplier: number; // 1.0 to 3.0
  showORPIndicator: boolean;
  fontSize: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fontFamily: 'reading' | 'comic' | 'sans';
  autoPronounceOnPause: boolean;
  autoPronounceEveryWord: boolean;
  soundEffectsEnabled: boolean;
  tickSoundEnabled: boolean;
  showTranslation: boolean;
  speechRate: number; // 0.7 to 1.3
  speechPitch: number; // 0.8 to 1.8
  voiceTone: VoiceTone;
  selectedVoiceURI?: string;
}

export interface ORPResult {
  prefix: string;
  focal: string;
  suffix: string;
  focalIndex: number;
  delayMs: number;
  originalWord: string;
  translation?: string;
}
