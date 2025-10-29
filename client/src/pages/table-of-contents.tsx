import { Book, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { BibleBook } from "@shared/schema";
import { useState } from "react";

export default function TableOfContents() {
  const [, setLocation] = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  
  const { data: books, isLoading } = useQuery<BibleBook[]>({
    queryKey: ["/api/books"]
  });

  const oldTestamentBooks = books?.filter(book => book.testament === "Old") || [];
  const newTestamentBooks = books?.filter(book => book.testament === "New") || [];

  const handleBookClick = (bookName: string) => {
    localStorage.setItem("selectedBook", bookName);
    localStorage.setItem("selectedChapter", "1");
    setLocation("/read");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Bible books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Book className="text-blue-600 text-xl" />
              <h1 className="text-xl font-bold text-gray-900">BibleSearcher</h1>
            </div>
            
            {/* Menu Button */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link href="/how-to-use">
                    <button 
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      How to Use
                    </button>
                  </Link>
                  <Link href="/about">
                    <button 
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      About
                    </button>
                  </Link>
                  <Link href="/support">
                    <button 
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      Support Us
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Table of Contents</h1>
            <p className="text-lg text-gray-600">
              Click on any book to start reading
            </p>
          </div>

          {/* Old Testament */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <h2 className="px-4 text-2xl font-bold text-gray-900">Old Testament</h2>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {oldTestamentBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookClick(book.name)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left group"
                  data-testid={`book-${book.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                    {book.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* New Testament */}
          <div>
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <h2 className="px-4 text-2xl font-bold text-gray-900">New Testament</h2>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {newTestamentBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookClick(book.name)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left group"
                  data-testid={`book-${book.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                    {book.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
