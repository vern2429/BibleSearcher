export const HIGHLIGHT_COLORS = {
  yellow: {
    name: 'Yellow',
    class: 'bg-highlight-yellow',
    borderClass: 'border-yellow-400',
    cssVar: '--highlight-yellow'
  },
  blue: {
    name: 'Blue',
    class: 'bg-highlight-blue',
    borderClass: 'border-blue-300',
    cssVar: '--highlight-blue'
  },
  red: {
    name: 'Red',
    class: 'bg-highlight-red',
    borderClass: 'border-red-300',
    cssVar: '--highlight-red'
  },
  green: {
    name: 'Green',
    class: 'bg-highlight-green',
    borderClass: 'border-green-300',
    cssVar: '--highlight-green'
  }
} as const;

export type HighlightColor = keyof typeof HIGHLIGHT_COLORS;

export const KEYBOARD_SHORTCUTS = {
  SEARCH: { key: 'f', modifier: 'ctrl' },
  BOOKMARKS: { key: 'b', modifier: 'ctrl' },
  PREVIOUS_CHAPTER: { key: 'ArrowLeft', modifier: 'alt' },
  NEXT_CHAPTER: { key: 'ArrowRight', modifier: 'alt' }
} as const;

export const VERSE_REFERENCE_REGEX = /^([1-3]?\s*[A-Za-z]+)\s+(\d+):(\d+)$/;

export function parseVerseReference(reference: string): {
  book: string;
  chapter: number;
  verse: number;
} | null {
  const match = reference.trim().match(VERSE_REFERENCE_REGEX);
  if (!match) return null;

  const [, book, chapter, verse] = match;
  return {
    book: book.trim(),
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10)
  };
}

export function formatVerseReference(book: string, chapter: number, verse: number): string {
  return `${book} ${chapter}:${verse}`;
}

export function createVerseId(book: string, chapter: number, verse: number): string {
  return `${book}:${chapter}:${verse}`;
}

export function parseVerseId(verseId: string): {
  book: string;
  chapter: number;
  verse: number;
} | null {
  const parts = verseId.split(':');
  if (parts.length !== 3) return null;

  const [book, chapter, verse] = parts;
  const chapterNum = parseInt(chapter, 10);
  const verseNum = parseInt(verse, 10);

  if (isNaN(chapterNum) || isNaN(verseNum)) return null;

  return {
    book,
    chapter: chapterNum,
    verse: verseNum
  };
}

export const DEFAULT_BOOK = "Matthew";
export const DEFAULT_CHAPTER = 5;
export const DEFAULT_HIGHLIGHT_COLOR: HighlightColor = "yellow";

export const MOBILE_BREAKPOINT = 1024; // lg breakpoint in Tailwind

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export const SEARCH_DEBOUNCE_MS = 300;

export const LOCAL_STORAGE_KEYS = {
  HIGHLIGHTS: 'bible-highlights',
  BOOKMARKS: 'bible-bookmarks',
  LAST_READING: 'bible-last-reading',
  SETTINGS: 'bible-settings'
} as const;

export interface LastReading {
  book: string;
  chapter: number;
  timestamp: number;
}

export interface BibleSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontFamily: 'sans' | 'serif';
  theme: 'light' | 'dark';
  highlightColor: HighlightColor;
}

export const DEFAULT_SETTINGS: BibleSettings = {
  fontSize: 'lg',
  fontFamily: 'serif',
  theme: 'light',
  highlightColor: 'yellow'
};
