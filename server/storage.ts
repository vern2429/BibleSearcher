import { 
  bibleBooks, 
  bibleVerses, 
  highlights, 
  bookmarks,
  type BibleBook, 
  type BibleVerse, 
  type Highlight, 
  type Bookmark,
  type InsertBibleBook,
  type InsertBibleVerse,
  type InsertHighlight,
  type InsertBookmark
} from "@shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IStorage {
  // Bible Books
  getAllBooks(): Promise<BibleBook[]>;
  getBookByName(name: string): Promise<BibleBook | undefined>;
  
  // Bible Verses
  getVersesByBook(book: string, chapter?: number): Promise<BibleVerse[]>;
  getVerse(book: string, chapter: number, verse: number): Promise<BibleVerse | undefined>;
  searchVerses(query: string): Promise<BibleVerse[]>;
  
  // Highlights
  getHighlights(userId?: string): Promise<Highlight[]>;
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  deleteHighlight(verseId: string, userId?: string): Promise<void>;
  
  // Bookmarks
  getBookmarks(userId?: string): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(verseId: string, userId?: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private books: Map<number, BibleBook> = new Map();
  private verses: Map<string, BibleVerse> = new Map();
  private highlightsList: Map<number, Highlight> = new Map();
  private bookmarksList: Map<number, Bookmark> = new Map();
  private currentBookId = 1;
  private currentVerseId = 1;
  private currentHighlightId = 1;
  private currentBookmarkId = 1;

  constructor() {
    this.initializeBibleData();
  }

  private initializeBibleData() {
    try {
      const bibleDataPath = path.join(__dirname, 'bible-data.json');
      const bibleData = JSON.parse(fs.readFileSync(bibleDataPath, 'utf8'));
      
      // Create a map of unique books
      const bookMap = new Map<string, BibleBook>();
      
      // Process all verses and extract book information
      Object.values(bibleData.verses).forEach((verse: any) => {
        const bookName = verse.book_name;
        if (!bookMap.has(bookName)) {
          // Determine testament based on book number (1-39 = Old, 40-66 = New)
          const testament = verse.book <= 39 ? "Old" : "New";
          
          // Get chapter count by finding max chapter for this book
          const maxChapter = Object.values(bibleData.verses)
            .filter((v: any) => v.book_name === bookName)
            .reduce((max: number, v: any) => Math.max(max, v.chapter), 0);
          
          const newBook: BibleBook = {
            id: this.currentBookId++,
            name: bookName,
            testament,
            chapters: maxChapter,
            order: verse.book
          };
          bookMap.set(bookName, newBook);
          this.books.set(newBook.id, newBook);
        }
        
        // Add verse to verses map
        const newVerse: BibleVerse = {
          id: this.currentVerseId++,
          book: verse.book_name,
          chapter: verse.chapter,
          verse: verse.verse,
          text: verse.text
        };
        const key = `${verse.book_name}:${verse.chapter}:${verse.verse}`;
        this.verses.set(key, newVerse);
      });
      
      console.log(`Loaded ${this.books.size} books and ${this.verses.size} verses from Bible data`);
    } catch (error) {
      console.error('Error loading Bible data:', error);
      // Fall back to minimal sample data
      this.initializeSampleData();
    }
  }

  private initializeSampleData() {
    // Fallback sample data if JSON loading fails
    const booksData: InsertBibleBook[] = [
      { name: "Genesis", testament: "Old", chapters: 50, order: 1 },
      { name: "Matthew", testament: "New", chapters: 28, order: 40 },
      { name: "John", testament: "New", chapters: 21, order: 43 },
    ];

    booksData.forEach(book => {
      const newBook: BibleBook = { ...book, id: this.currentBookId++ };
      this.books.set(newBook.id, newBook);
    });

    // Add a few sample verses
    const sampleVerses: InsertBibleVerse[] = [
      { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heavens and the earth." },
      { book: "Matthew", chapter: 5, verse: 3, text: "Blessed are the poor in spirit, for theirs is the kingdom of heaven." },
      { book: "John", chapter: 3, verse: 16, text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    ];

    sampleVerses.forEach(verse => {
      const newVerse: BibleVerse = { ...verse, id: this.currentVerseId++ };
      const key = `${verse.book}:${verse.chapter}:${verse.verse}`;
      this.verses.set(key, newVerse);
    });
  }

  async getAllBooks(): Promise<BibleBook[]> {
    return Array.from(this.books.values()).sort((a, b) => a.order - b.order);
  }

  async getBookByName(name: string): Promise<BibleBook | undefined> {
    return Array.from(this.books.values()).find(book => book.name === name);
  }

  async getVersesByBook(book: string, chapter?: number): Promise<BibleVerse[]> {
    const verses = Array.from(this.verses.values()).filter(verse => {
      if (verse.book !== book) return false;
      if (chapter && verse.chapter !== chapter) return false;
      return true;
    });
    return verses.sort((a, b) => a.verse - b.verse);
  }

  async getVerse(book: string, chapter: number, verse: number): Promise<BibleVerse | undefined> {
    const key = `${book}:${chapter}:${verse}`;
    return this.verses.get(key);
  }

  async searchVerses(query: string): Promise<BibleVerse[]> {
    const lowercaseQuery = query.toLowerCase().trim();
    
    // Check if the query looks like a verse reference (e.g., "John 3:16", "Genesis 1:1", "1 Corinthians 13:4")
    const verseRefPattern = /^([1-3]?\s*[a-zA-Z\s]+)\s*(\d+):(\d+)$/;
    const verseRefMatch = lowercaseQuery.match(verseRefPattern);
    
    if (verseRefMatch) {
      // Parse verse reference
      const [, bookName, chapterStr, verseStr] = verseRefMatch;
      const chapter = parseInt(chapterStr, 10);
      const verse = parseInt(verseStr, 10);
      
      // Find matching book (case-insensitive, partial match)
      const cleanBookName = bookName.trim().toLowerCase();
      const matchingVerse = Array.from(this.verses.values()).find(v => 
        v.book.toLowerCase().includes(cleanBookName) && 
        v.chapter === chapter && 
        v.verse === verse
      );
      
      return matchingVerse ? [matchingVerse] : [];
    }
    
    // Check if query is just a book name
    const bookNameMatch = Array.from(this.verses.values()).filter(verse =>
      verse.book.toLowerCase().includes(lowercaseQuery)
    );
    
    if (bookNameMatch.length > 0 && lowercaseQuery.length > 2) {
      // If it looks like a book name search, return first chapter
      const bookName = bookNameMatch[0].book;
      return Array.from(this.verses.values()).filter(verse =>
        verse.book === bookName && verse.chapter === 1
      ).slice(0, 10); // Limit to first 10 verses
    }
    
    // Default text search through verse content
    return Array.from(this.verses.values()).filter(verse =>
      verse.text.toLowerCase().includes(lowercaseQuery) ||
      verse.book.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getHighlights(userId = "default"): Promise<Highlight[]> {
    return Array.from(this.highlightsList.values()).filter(
      highlight => highlight.userId === userId
    );
  }

  async createHighlight(highlight: InsertHighlight): Promise<Highlight> {
    const newHighlight: Highlight = {
      ...highlight,
      id: this.currentHighlightId++,
      userId: highlight.userId || "default"
    };
    this.highlightsList.set(newHighlight.id, newHighlight);
    return newHighlight;
  }

  async deleteHighlight(verseId: string, userId = "default"): Promise<void> {
    const highlight = Array.from(this.highlightsList.values()).find(
      h => h.verseId === verseId && h.userId === userId
    );
    if (highlight) {
      this.highlightsList.delete(highlight.id);
    }
  }

  async getBookmarks(userId = "default"): Promise<Bookmark[]> {
    return Array.from(this.bookmarksList.values()).filter(
      bookmark => bookmark.userId === userId
    );
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: this.currentBookmarkId++,
      userId: bookmark.userId || "default"
    };
    this.bookmarksList.set(newBookmark.id, newBookmark);
    return newBookmark;
  }

  async deleteBookmark(verseId: string, userId = "default"): Promise<void> {
    const bookmark = Array.from(this.bookmarksList.values()).find(
      b => b.verseId === verseId && b.userId === userId
    );
    if (bookmark) {
      this.bookmarksList.delete(bookmark.id);
    }
  }
}

export const storage = new MemStorage();
