import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHighlightSchema, insertBookmarkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Bible Books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:name", async (req, res) => {
    try {
      const book = await storage.getBookByName(req.params.name);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  // Bible Verses
  app.get("/api/verses/:book", async (req, res) => {
    try {
      const { book } = req.params;
      const chapter = req.query.chapter ? parseInt(req.query.chapter as string) : undefined;
      const verses = await storage.getVersesByBook(book, chapter);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch verses" });
    }
  });

  app.get("/api/verses/:book/:chapter/:verse", async (req, res) => {
    try {
      const { book, chapter, verse } = req.params;
      const verseData = await storage.getVerse(book, parseInt(chapter), parseInt(verse));
      if (!verseData) {
        return res.status(404).json({ message: "Verse not found" });
      }
      res.json(verseData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch verse" });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const verses = await storage.searchVerses(query);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ message: "Failed to search verses" });
    }
  });

  // Highlights
  app.get("/api/highlights", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const highlights = await storage.getHighlights(userId);
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  app.post("/api/highlights", async (req, res) => {
    try {
      const validatedData = insertHighlightSchema.parse(req.body);
      const highlight = await storage.createHighlight(validatedData);
      res.status(201).json(highlight);
    } catch (error) {
      res.status(400).json({ message: "Invalid highlight data" });
    }
  });

  app.delete("/api/highlights/:verseId", async (req, res) => {
    try {
      const { verseId } = req.params;
      const userId = req.query.userId as string;
      await storage.deleteHighlight(verseId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete highlight" });
    }
  });

  // Bookmarks
  app.get("/api/bookmarks", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const bookmarks = await storage.getBookmarks(userId);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });

  app.post("/api/bookmarks", async (req, res) => {
    try {
      const validatedData = insertBookmarkSchema.parse(req.body);
      const bookmark = await storage.createBookmark(validatedData);
      res.status(201).json(bookmark);
    } catch (error) {
      res.status(400).json({ message: "Invalid bookmark data" });
    }
  });

  app.delete("/api/bookmarks/:verseId", async (req, res) => {
    try {
      const { verseId } = req.params;
      const userId = req.query.userId as string;
      await storage.deleteBookmark(verseId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete bookmark" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
