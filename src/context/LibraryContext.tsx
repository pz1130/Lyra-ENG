import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LIBRARIES } from '../data/defaultLibraries';
import { LibraryCategory, ReaderSettings, WordLibrary } from '../types/index';

interface LibraryContextType {
  libraries: WordLibrary[];
  activeLibraryId: string;
  activeLibrary: WordLibrary;
  setActiveLibraryId: (id: string) => void;
  addCustomLibrary: (
    lib: Omit<WordLibrary, 'id' | 'createdAt' | 'isCustom'>
  ) => string;
  updateLibrary: (id: string, updates: Partial<WordLibrary>) => void;
  deleteLibrary: (id: string) => void;
  exportLibraryJson: (id: string) => void;
  readerSettings: ReaderSettings;
  updateSettings: (newSettings: Partial<ReaderSettings>) => void;
  resetSettings: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const CUSTOM_LIBS_KEY = 'lyra_custom_libraries_v1';
const ACTIVE_LIB_KEY = 'lyra_active_lib_id';
const SETTINGS_KEY = 'lyra_reader_settings';

const DEFAULT_SETTINGS: ReaderSettings = {
  wpm: 120, // Friendly default pace for young readers
  chunkSize: 1,
  punctuationPauseMultiplier: 2.0,
  showORPIndicator: true,
  fontSize: 'xl',
  fontFamily: 'reading',
  autoPronounceOnPause: true,
  autoPronounceEveryWord: false,
  soundEffectsEnabled: true,
  tickSoundEnabled: false, // Default off to keep reading peaceful
  showTranslation: true,
  speechRate: 0.9,
  speechPitch: 1.35, // Cute, bright, friendly child-like pitch
  voiceTone: 'child',
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load and sanitize custom libraries
  const [customLibraries, setCustomLibraries] = useState<WordLibrary[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_LIBS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed
            .filter((item) => item && typeof item === 'object')
            .map((lib) => ({
              id: String(lib.id || `custom-${Date.now()}`),
              title: String(lib.title || '自定义词书'),
              description: String(lib.description || ''),
              category: (['sight-words', 'phonics', 'discover', 'stories', 'custom', 'cambridge'].includes(lib.category)
                ? lib.category
                : 'custom') as LibraryCategory,
              badgeEmoji: String(lib.badgeEmoji || '✨'),
              isCustom: true,
              createdAt: Number(lib.createdAt) || Date.now(),
              words: Array.isArray(lib.words)
                ? lib.words
                    .filter(
                      (w: any) =>
                        w && typeof w.word === 'string' && w.word.trim().length > 0
                    )
                    .map((w: any, idx: number) => ({
                      id: String(w.id || `word-${idx}`),
                      word: String(w.word).trim(),
                      translation: w.translation
                        ? String(w.translation).trim()
                        : undefined,
                      phonetic: w.phonetic
                        ? String(w.phonetic).trim()
                        : undefined,
                    }))
                : [],
            }));
        }
      }
    } catch {
      // Ignore
    }
    return [];
  });

  // All libraries: default built-ins + custom ones
  const allLibraries = React.useMemo(
    () => [...DEFAULT_LIBRARIES, ...customLibraries],
    [customLibraries]
  );

  // Active library id with legacy migration and existence check
  const [activeLibraryId, setActiveLibraryIdState] = useState<string>(() => {
    try {
      let saved = localStorage.getItem(ACTIVE_LIB_KEY);
      if (saved === 'oxford-phonics-5') {
        saved = 'opw-level-5';
      }
      if (saved && allLibraries.some((l) => l.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore
    }
    return DEFAULT_LIBRARIES[0].id;
  });

  // Active library object with guaranteed valid words array
  const activeLibrary: WordLibrary = React.useMemo(() => {
    const found = allLibraries.find((l) => l.id === activeLibraryId);
    if (found && Array.isArray(found.words) && found.words.length > 0) {
      return found;
    }
    return DEFAULT_LIBRARIES[0];
  }, [allLibraries, activeLibraryId]);

  // Reader Settings
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_SETTINGS;
  });

  const setActiveLibraryId = (id: string) => {
    const normalizedId = id === 'oxford-phonics-5' ? 'opw-level-5' : id;
    setActiveLibraryIdState(normalizedId);
    try {
      localStorage.setItem(ACTIVE_LIB_KEY, normalizedId);
    } catch {
      // Ignore
    }
  };

  const addCustomLibrary = (
    lib: Omit<WordLibrary, 'id' | 'createdAt' | 'isCustom'>
  ): string => {
    const newId = `custom-lib-${Date.now()}`;
    const newLibrary: WordLibrary = {
      ...lib,
      id: newId,
      isCustom: true,
      createdAt: Date.now(),
      badgeEmoji: lib.badgeEmoji || '📚',
    };

    const updated = [newLibrary, ...customLibraries];
    setCustomLibraries(updated);
    try {
      localStorage.setItem(CUSTOM_LIBS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setActiveLibraryId(newId);
    return newId;
  };

  const updateLibrary = (id: string, updates: Partial<WordLibrary>) => {
    const updated = customLibraries.map((lib) =>
      lib.id === id ? { ...lib, ...updates } : lib
    );
    setCustomLibraries(updated);
    try {
      localStorage.setItem(CUSTOM_LIBS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const deleteLibrary = (id: string) => {
    const updated = customLibraries.filter((lib) => lib.id !== id);
    setCustomLibraries(updated);
    try {
      localStorage.setItem(CUSTOM_LIBS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (activeLibraryId === id) {
      setActiveLibraryId(DEFAULT_LIBRARIES[0].id);
    }
  };

  const exportLibraryJson = (id: string) => {
    const target = allLibraries.find((l) => l.id === id);
    if (!target) return;

    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(target, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${target.title}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const updateSettings = (newSettings: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
      } catch {
        // Ignore
      }
      return merged;
    });
  };

  const resetSettings = () => {
    setReaderSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch {
      // Ignore
    }
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_LIBS_KEY, JSON.stringify(customLibraries));
    } catch {
      // Ignore
    }
  }, [customLibraries]);

  return (
    <LibraryContext.Provider
      value={{
        libraries: allLibraries,
        activeLibraryId,
        activeLibrary,
        setActiveLibraryId,
        addCustomLibrary,
        updateLibrary,
        deleteLibrary,
        exportLibraryJson,
        readerSettings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
