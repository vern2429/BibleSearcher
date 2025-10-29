import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BibleVerse, Highlight, Bookmark as BookmarkType } from "@shared/schema";

interface BibleContentProps {
  selectedBook: string;
  selectedChapter: number;
  selectedHighlightColor: string;
  searchQuery: string;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
}

export default function BibleContent({
  selectedBook,
  selectedChapter,
  selectedHighlightColor,
  searchQuery,
  onPreviousChapter,
  onNextChapter,
}: BibleContentProps) {
  const queryClient = useQueryClient();
  const [highlights, setHighlights] = useLocalStorage<Record<string, string>>('bible-highlights', {});
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('bible-bookmarks', []);

  const { data: verses = [], isLoading } = useQuery<BibleVerse[]>({
    queryKey: ["/api/verses", selectedBook, { chapter: selectedChapter }],
    queryFn: async () => {
      const response = await fetch(`/api/verses/${selectedBook}?chapter=${selectedChapter}`);
      if (!response.ok) throw new Error('Failed to fetch verses');
      return response.json();
    },
  });

  const { data: searchResults = [] } = useQuery<BibleVerse[]>({
    queryKey: ["/api/search", { q: searchQuery }],
    enabled: !!searchQuery,
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to search verses');
      return response.json();
    },
  });

  const displayVerses = searchQuery ? searchResults : verses;

  const toggleHighlight = (verseId: string) => {
    const newHighlights = { ...highlights };
    if (newHighlights[verseId]) {
      delete newHighlights[verseId];
    } else {
      newHighlights[verseId] = selectedHighlightColor;
    }
    setHighlights(newHighlights);
  };

  const toggleBookmark = (verseId: string) => {
    const newBookmarks = [...bookmarks];
    const index = newBookmarks.indexOf(verseId);
    if (index > -1) {
      newBookmarks.splice(index, 1);
    } else {
      newBookmarks.push(verseId);
    }
    setBookmarks(newBookmarks);
  };

  const getHighlightClass = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-highlight-yellow';
      case 'blue': return 'bg-highlight-blue';
      case 'red': return 'bg-highlight-red';
      case 'green': return 'bg-highlight-green';
      default: return 'bg-highlight-yellow';
    }
  };

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedBook} ${selectedChapter}`}
            </h1>
            {!searchQuery && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onPreviousChapter}
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={onNextChapter}
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          {!searchQuery && selectedBook === "Genesis" && selectedChapter === 1 && (
            <p className="text-lg text-gray-600 font-medium">The Creation</p>
          )}
        </div>

        {/* Scripture Content */}
        <div className="prose prose-lg max-w-none">
          {displayVerses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery ? "No verses found matching your search." : "No verses available for this chapter."}
              </p>
            </div>
          ) : (
            displayVerses.map((verse) => {
              const verseId = `${verse.book}:${verse.chapter}:${verse.verse}`;
              const isHighlighted = highlights[verseId];
              const isBookmarked = bookmarks.includes(verseId);

              return (
                <div key={verse.id} className="group relative mb-4">
                  <div className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-500 bg-gray-100 rounded-full flex-shrink-0 mt-1">
                      {verse.verse}
                    </span>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-lg leading-relaxed text-gray-900 font-serif cursor-pointer p-2 rounded transition-colors",
                          isHighlighted
                            ? getHighlightClass(isHighlighted)
                            : "group-hover:bg-gray-50"
                        )}
                        onClick={() => toggleHighlight(verseId)}
                      >
                        {searchQuery && (
                          <span className="text-sm text-blue-600 font-medium mb-1 block">
                            {verse.book} {verse.chapter}:{verse.verse}
                          </span>
                        )}
                        {verse.text}
                      </p>
                    </div>
                    <div className={cn(
                      "transition-opacity",
                      isBookmarked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      <Button
                        onClick={() => toggleBookmark(verseId)}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "p-1 transition-colors",
                          isBookmarked ? "text-blue-600" : "text-gray-400 hover:text-blue-600"
                        )}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chapter Navigation */}
        {!searchQuery && displayVerses.length > 0 && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <Button
              onClick={onPreviousChapter}
              variant="ghost"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </Button>
            <Button
              onClick={onNextChapter}
              variant="ghost"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
