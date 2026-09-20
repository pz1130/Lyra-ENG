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
  const fullText = (item.word || '').trim();
  
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
 * Robust CSV line splitter that respects quoted fields e.g. "apple, a fruit","苹果"
 */
export function splitCsvLine(line: string, delimiter: string = ','): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());

  // Clean surrounding quotes from fields
  return fields.map((f) => {
    let clean = f.trim();
    if (clean.startsWith('"') && clean.endsWith('"') && clean.length >= 2) {
      clean = clean.slice(1, -1).trim();
    }
    return clean;
  });
}

/**
 * Detect best delimiter: tab, comma, chinese comma, semicolon, pipe
 */
export function detectDelimiter(lines: string[]): string {
  const sample = lines.slice(0, 5).join('\n');
  const counts: Record<string, number> = {
    '\t': (sample.match(/\t/g) || []).length,
    ',': (sample.match(/,/g) || []).length,
    '，': (sample.match(/，/g) || []).length,
    ';': (sample.match(/;/g) || []).length,
    '|': (sample.match(/\|/g) || []).length,
  };

  let best = ',';
  let maxCount = 0;
  for (const [delim, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      best = delim;
    }
  }
  return best;
}

export interface ParsedCsvResult {
  rows: string[][];
  hasHeader: boolean;
  detectedWordCol: number;
  detectedTransCol: number;
  detectedPhoneticCol: number;
  delimiter: string;
}

/**
 * Parses raw CSV/TSV/TXT content with intelligent column detection
 */
export function analyzeCsvContent(rawContent: string): ParsedCsvResult {
  // Remove UTF-8 BOM
  const content = rawContent.replace(/^\uFEFF/, '').trim();
  const rawLines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  if (rawLines.length === 0) {
    return {
      rows: [],
      hasHeader: false,
      detectedWordCol: 0,
      detectedTransCol: -1,
      detectedPhoneticCol: -1,
      delimiter: ',',
    };
  }

  const delimiter = detectDelimiter(rawLines);
  const rows: string[][] = rawLines.map((line) => splitCsvLine(line, delimiter));

  // Determine max columns
  const maxCols = Math.max(...rows.map((r) => r.length), 1);

  // Check if first row is a header
  const firstRow = rows[0] || [];
  let hasHeader = false;
  let wordCol = -1;
  let transCol = -1;
  let phoneticCol = -1;

  // Header keyword check
  firstRow.forEach((cell, idx) => {
    const lower = cell.toLowerCase().trim();
    if (
      ['word', 'words', 'vocabulary', 'english', 'term', 'spelling', '单词', '英文'].some((k) =>
        lower.includes(k)
      )
    ) {
      wordCol = idx;
      hasHeader = true;
    } else if (
      ['meaning', 'translation', 'definition', 'chinese', '释义', '中文'].some((k) =>
        lower.includes(k)
      )
    ) {
      transCol = idx;
      hasHeader = true;
    } else if (
      ['phonetic', 'symbol', '音标'].some((k) => lower.includes(k))
    ) {
      phoneticCol = idx;
      hasHeader = true;
    } else if (['序号', 'id', 'no', 'number', 'index'].some((k) => lower.includes(k))) {
      hasHeader = true;
    }
  });

  // If header wasn't conclusive, analyze data content of each column
  const sampleRows = (hasHeader ? rows.slice(1, 10) : rows.slice(0, 10));

  if (sampleRows.length > 0) {
    const colStats = Array.from({ length: maxCols }, () => ({
      pureNumberCount: 0,
      englishLetterScore: 0,
      chineseScore: 0,
      bracketScore: 0,
    }));

    sampleRows.forEach((row) => {
      row.forEach((cell, colIdx) => {
        if (colIdx >= maxCols) return;
        const text = cell.trim();
        if (!text) return;

        // Is it pure numbers (index like 1, 2, 3)?
        if (/^\d+$/.test(text)) {
          colStats[colIdx].pureNumberCount++;
        }
        // Does it look like an English word/phrase? (mostly ASCII letters)
        if (/^[a-zA-Z\s'-]+$/.test(text)) {
          colStats[colIdx].englishLetterScore += 2;
        } else if (/[a-zA-Z]/.test(text) && !/[\u4e00-\u9fa5]/.test(text)) {
          colStats[colIdx].englishLetterScore += 1;
        }
        // Does it contain Chinese characters?
        if (/[\u4e00-\u9fa5]/.test(text)) {
          colStats[colIdx].chineseScore += 2;
        }
        // Does it look like phonetic /.../ or [...]?
        if (/^[\[\/].+[\]\/]$/.test(text)) {
          colStats[colIdx].bracketScore += 2;
        }
      });
    });

    // Pick best English Word column if not set by header
    if (wordCol === -1) {
      let maxEng = -1;
      colStats.forEach((stat, colIdx) => {
        // Skip columns that are pure numbers (like row index)
        if (stat.pureNumberCount > sampleRows.length / 2) return;
        if (stat.englishLetterScore > maxEng) {
          maxEng = stat.englishLetterScore;
          wordCol = colIdx;
        }
      });
      if (wordCol === -1) wordCol = 0;
    }

    // Pick best Translation column if not set by header
    if (transCol === -1) {
      let maxChi = 0;
      colStats.forEach((stat, colIdx) => {
        if (colIdx === wordCol) return;
        if (stat.chineseScore > maxChi) {
          maxChi = stat.chineseScore;
          transCol = colIdx;
        }
      });
      // If no Chinese found, pick next available column
      if (transCol === -1 && maxCols > 1) {
        for (let c = 0; c < maxCols; c++) {
          if (c !== wordCol && colStats[c].pureNumberCount <= sampleRows.length / 2) {
            transCol = c;
            break;
          }
        }
      }
    }

    // Pick phonetic column if not set
    if (phoneticCol === -1) {
      colStats.forEach((stat, colIdx) => {
        if (colIdx !== wordCol && colIdx !== transCol && stat.bracketScore > 0) {
          phoneticCol = colIdx;
        }
      });
    }
  } else {
    if (wordCol === -1) wordCol = 0;
    if (transCol === -1 && maxCols > 1) transCol = 1;
  }

  return {
    rows,
    hasHeader,
    detectedWordCol: Math.max(0, wordCol),
    detectedTransCol: transCol,
    detectedPhoneticCol: phoneticCol,
    delimiter,
  };
}

/**
 * Converts structured CSV rows into clean WordItems based on selected column mapping
 */
export function buildWordItemsFromRows(
  rows: string[][],
  wordCol: number,
  transCol: number,
  phoneticCol: number,
  skipHeader: boolean
): WordItem[] {
  const dataRows = skipHeader ? rows.slice(1) : rows;
  const results: WordItem[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const word = (row[wordCol] || '').trim();
    if (!word) continue;

    const translation = transCol >= 0 ? (row[transCol] || '').trim() : undefined;
    const phonetic = phoneticCol >= 0 ? (row[phoneticCol] || '').trim() : undefined;

    results.push({
      id: `word-${Date.now()}-${i}`,
      word,
      translation: translation || undefined,
      phonetic: phonetic || undefined,
    });
  }

  return results;
}

/**
 * Default backward-compatible importer
 */
export function parseImportFileContent(content: string): WordItem[] {
  // Check JSON format
  const trimmed = content.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const json = JSON.parse(trimmed);
      if (Array.isArray(json)) {
        return json.map((item, idx) => ({
          id: item.id || `json-${Date.now()}-${idx}`,
          word: String(item.word || item || '').trim(),
          translation: item.translation || item.meaning || undefined,
          phonetic: item.phonetic || undefined,
          example: item.example || undefined,
        }));
      }
    } catch {
      // Fallback to CSV
    }
  }

  const analysis = analyzeCsvContent(content);
  return buildWordItemsFromRows(
    analysis.rows,
    analysis.detectedWordCol,
    analysis.detectedTransCol,
    analysis.detectedPhoneticCol,
    analysis.hasHeader
  );
}
