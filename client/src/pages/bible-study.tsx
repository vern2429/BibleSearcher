import { useState, useEffect } from "react";
import BibleHeader from "@/components/bible-header";
import BibleSidebar from "@/components/bible-sidebar";
import BibleContent from "@/components/bible-content";
import MobileNavigation from "@/components/mobile-navigation";
import BookmarksModal from "@/components/bookmarks-modal";
import { useQuery } from "@tanstack/react-query";
import type { BibleBook } from "@shared/schema";

export default function BibleStudyPage() {
  const [selectedBook, setSelectedBook] = useState(() => {
    return localStorage.getItem("selectedBook") || "Genesis";
  });
  const [selectedChapter, setSelectedChapter] = useState(() => {
    const saved = localStorage.getItem("selectedChapter");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [selectedHighlightColor, setSelectedHighlightColor] = useState("yellow");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState("content"); // content, books, chapters, highlights, bookmarks

  const { data: books = [] } = useQuery<BibleBook[]>({
    queryKey: ["/api/books"],
  });

  // Save selected book and chapter to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedBook", selectedBook);
    localStorage.setItem("selectedChapter", selectedChapter.toString());
  }, [selectedBook, selectedChapter]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            (document.querySelector('input[placeholder*="Search"]') as HTMLInputElement)?.focus();
            break;
          case 'b':
            e.preventDefault();
            setShowBookmarks(!showBookmarks);
            break;
        }
      }
      
      // Arrow navigation
      if (e.key === 'ArrowLeft' && e.altKey) {
        e.preventDefault();
        handlePreviousChapter();
      }
      if (e.key === 'ArrowRight' && e.altKey) {
        e.preventDefault();
        handleNextChapter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedBook, selectedChapter, showBookmarks]);

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      // Navigate to previous book's last chapter
      const currentBookIndex = books.findIndex(book => book.name === selectedBook);
      if (currentBookIndex > 0) {
        const previousBook = books[currentBookIndex - 1];
        setSelectedBook(previousBook.name);
        setSelectedChapter(previousBook.chapters);
      }
    }
  };

  const handleNextChapter = () => {
    const currentBook = books.find(book => book.name === selectedBook);
    if (currentBook && selectedChapter < currentBook.chapters) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      // Navigate to next book's first chapter
      const currentBookIndex = books.findIndex(book => book.name === selectedBook);
      if (currentBookIndex < books.length - 1) {
        const nextBook = books[currentBookIndex + 1];
        setSelectedBook(nextBook.name);
        setSelectedChapter(1);
      }
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <BibleHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
      />
      
      <div className="flex h-screen pt-16">
        <BibleSidebar
          books={books}
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          selectedHighlightColor={selectedHighlightColor}
          onSelectBook={setSelectedBook}
          onSelectChapter={setSelectedChapter}
          onSelectHighlightColor={setSelectedHighlightColor}
        />
        
        <BibleContent
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          selectedHighlightColor={selectedHighlightColor}
          searchQuery={searchQuery}
          onPreviousChapter={handlePreviousChapter}
          onNextChapter={handleNextChapter}
        />
      </div>

      <MobileNavigation
        activeTab={showMobileNav}
        onTabChange={setShowMobileNav}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
      />

      <BookmarksModal
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
      />
    </div>
  );
}
