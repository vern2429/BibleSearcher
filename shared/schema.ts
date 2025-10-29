import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bibleBooks = pgTable("bible_books", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  testament: text("testament").notNull(), // "Old" or "New"
  chapters: integer("chapters").notNull(),
  order: integer("order").notNull(),
});

export const bibleVerses = pgTable("bible_verses", {
  id: serial("id").primaryKey(),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  text: text("text").notNull(),
});

export const highlights = pgTable("highlights", {
  id: serial("id").primaryKey(),
  verseId: text("verse_id").notNull(), // format: "book:chapter:verse"
  color: text("color").notNull(), // "yellow", "blue", "red", "green"
  userId: text("user_id").notNull().default("default"),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  verseId: text("verse_id").notNull(), // format: "book:chapter:verse"
  userId: text("user_id").notNull().default("default"),
});

export const insertBibleBookSchema = createInsertSchema(bibleBooks).omit({
  id: true,
});

export const insertBibleVerseSchema = createInsertSchema(bibleVerses).omit({
  id: true,
});

export const insertHighlightSchema = createInsertSchema(highlights).omit({
  id: true,
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
});

export type BibleBook = typeof bibleBooks.$inferSelect;
export type BibleVerse = typeof bibleVerses.$inferSelect;
export type Highlight = typeof highlights.$inferSelect;
export type Bookmark = typeof bookmarks.$inferSelect;

export type InsertBibleBook = z.infer<typeof insertBibleBookSchema>;
export type InsertBibleVerse = z.infer<typeof insertBibleVerseSchema>;
export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
