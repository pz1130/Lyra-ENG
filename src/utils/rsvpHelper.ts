import { ORPResult, WordItem } from '../types/index';

/**
 * Calculates the Optimal Recognition Point (ORP) index in a word.
 * Research shows eyes recognize words fastest when fixating slightly left of center.
 */
export function calculateORPIndex(word: string): number {
  const cleanLen = word.replace(/[^a-zA-Z0-9]/g, '').length;
  if (cleanLen <= 1) return 0;
  if (cleanLen <= 5) return 1;
  if (cleanLen <= 9) return 2;
  if (cleanLen <= 13) return 3;
  return 4;
}

/**
 * Splits a word or phrase into prefix, focal character, and suffix for RSVP rendering,
 * and calculates the punctuation-aware delay multiplier.
 */
export function processRSVPWord(
  item: WordItem,
  baseIntervalMs: number,
  punctuationMultiplier: number = 2.0
): ORPResult {
  const fullText = item.word.trim();
  
  if (!fullText) {
    return {
      prefix: '',
      focal: '',
      suffix: '',
      focalIndex: 0,
      delayMs: baseIntervalMs,
      originalWord: '',
      translation: item.translation,
    };
  }

  // Calculate ORP index relative to alphabetical/alphanumeric characters
  const targetIndex = calculateORPIndex(fullText);
  const clampedIndex = Math.min(Math.max(0, targetIndex), fullText.length - 1);

  const prefix = fullText.slice(0, clampedIndex);
  const focal = fullText.charAt(clampedIndex);
  const suffix = fullText.slice(clampedIndex + 1);

  // Calculate punctuation delay
  let delay = baseIntervalMs;
  const lastChar = fullText.slice(-1);
  const secondLastChar = fullText.length > 1 ? fullText.slice(-2, -1) : '';

  if (['.', '!', '?', '。', '！', '？'].includes(lastChar) || ['."', '!"', '?"'].includes(secondLastChar + lastChar)) {
    delay = Math.round(baseIntervalMs * punctuationMultiplier);
  } else if ([',', ';', ':', '，', '；', '：', '—', '-'].includes(lastChar)) {
    delay = Math.round(baseIntervalMs * Math.max(1.2, (punctuationMultiplier + 1) / 2));
  } else if (fullText.length > 10) {
    // Longer words require slightly more recognition time for kids
    delay = Math.round(baseIntervalMs * 1.15);
  }

  return {
    prefix,
    focal,
    suffix,
    focalIndex: clampedIndex,
    delayMs: delay,
    originalWord: fullText,
    translation: item.translation,
  };
}

/**
 * Converts Words Per Minute (WPM) to base millisecond interval per word.
 */
export function wpmToMs(wpm: number): number {
  if (wpm <= 0) return 500;
  return Math.round(60000 / wpm);
}

/**
 * Parses raw text (e.g. pasted story or article) into structured WordItems.
 */
export function parseRawTextToWords(text: string): WordItem[] {
  // Normalize whitespace and split on spaces while preserving word punctuation
  const tokens = text
    .replace(/\r\n/g, '\n')
    .replace(/\n+/g, ' ')
    .trim()
    .split(/\s+/);

  return tokens
    .filter((token) => token.trim().length > 0)
    .map((token, index) => ({
      id: `custom-word-${Date.now()}-${index}`,
      word: token.trim(),
    }));
}

/**
 * Parses CSV / TXT / Tab-separated content into WordItems.
 * Supports:
 * - Single word per line: apple
 * - Comma separated: apple, 苹果, [ˈæpl]
 * - Tab separated: apple\t苹果
 */
export function parseImportFileContent(content: string): WordItem[] {
  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const results: WordItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if JSON format
    if (i === 0 && line.startsWith('[') && lines[lines.length - 1].endsWith(']')) {
      try {
        const json = JSON.parse(content);
        if (Array.isArray(json)) {
          return json.map((item, idx) => ({
            id: item.id || `json-${Date.now()}-${idx}`,
            word: item.word || String(item),
            translation: item.translation || item.meaning || '',
            phonetic: item.phonetic || '',
            example: item.example || '',
          }));
        }
      } catch {
        // Fall back to line by line parsing
      }
    }

    // Try Tab, comma, or pipe separator
    let parts: string[] = [];
    if (line.includes('\t')) {
      parts = line.split('\t');
    } else if (line.includes('|')) {
      parts = line.split('|');
    } else if (line.includes(',')) {
      parts = line.split(',');
    } else {
      parts = [line];
    }

    const cleanParts = parts.map((p) => p.trim());
    const word = cleanParts[0] || '';
    if (!word) continue;

    results.push({
      id: `imp-${Date.now()}-${i}`,
      word,
      translation: cleanParts[1] || undefined,
      phonetic: cleanParts[2] || undefined,
      example: cleanParts[3] || undefined,
    });
  }

  return results;
}
