import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, ThemeConfig, ThemeId } from '../types/theme';

interface ThemeContextType {
  currentThemeId: ThemeId;
  theme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  allThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'lyra_reader_theme';

const LEGACY_THEME_IDS: Record<string, ThemeId> = {
  pony: 'glow',
  eggy: 'sunny',
};

function resolveThemeId(value: string | null): ThemeId | null {
  if (!value) return null;
  if (value in THEMES) return value as ThemeId;
  return LEGACY_THEME_IDS[value] ?? null;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTheme = resolveThemeId(urlParams.get('theme'));
        if (urlTheme) return urlTheme;
      }
      const saved = resolveThemeId(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        if (localStorage.getItem(STORAGE_KEY) !== saved) {
          localStorage.setItem(STORAGE_KEY, saved);
        }
        return saved;
      }
    } catch {
      // LocalStorage not available or blocked
    }
    return 'candy';
  });

  const theme = THEMES[currentThemeId] || THEMES.candy;

  const setTheme = (id: ThemeId) => {
    setCurrentThemeId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    // Set theme-color meta tag for Safari header
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      if (currentThemeId === 'candy') meta.setAttribute('content', '#FF8EAC');
      else if (currentThemeId === 'glow') meta.setAttribute('content', '#F59E0B');
      else if (currentThemeId === 'sunny') meta.setAttribute('content', '#FB923C');
      else if (currentThemeId === 'forest') meta.setAttribute('content', '#10B981');
      else if (currentThemeId === 'space') meta.setAttribute('content', '#0F172A');
      else if (currentThemeId === 'ocean') meta.setAttribute('content', '#06B6D4');
    }
  }, [currentThemeId]);

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        theme,
        setTheme,
        allThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
