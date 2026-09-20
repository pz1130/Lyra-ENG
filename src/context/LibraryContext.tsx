import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LIBRARIES } from '../data/defaultLibraries';
import { ReaderSettings, WordLibrary } from '../types/index';

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
  showTranslation: true,
  speechRate: 0.9,
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load custom libraries
  const [customLibraries, setCustomLibraries] = useState<WordLibrary[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_LIBS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return [];
  });

  // All libraries: default built-ins + custom ones
  const allLibraries = [...DEFAULT_LIBRARIES, ...customLibraries];

  // Active library id
  const [activeLibraryId, setActiveLibraryIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_LIB_KEY);
      if (saved && allLibraries.some((l) => l.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore
    }
    return DEFAULT_LIBRARIES[0].id;
  });

  // Active library object
  const activeLibrary =
    allLibraries.find((l) => l.id === activeLibraryId) || DEFAULT_LIBRARIES[0];

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
    setActiveLibraryIdState(id);
    try {
      localStorage.setItem(ACTIVE_LIB_KEY, id);
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
