import { X, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BibleVerse } from "@shared/schema";

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookmarksModal({ isOpen, onClose }: BookmarksModalProps) {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('bible-bookmarks', []);

  const { data: allVerses = [] } = useQuery<BibleVerse[]>({
    queryKey: ["/api/verses/all"],
    queryFn: async () => {
      // Fetch all verses for bookmarked verses
      const promises = bookmarks.map(async (verseId) => {
        const [book, chapter, verse] = verseId.split(':');
        const response = await fetch(`/api/verses/${book}/${chapter}/${verse}`);
        if (!response.ok) return null;
        return response.json();
      });
      const verses = await Promise.all(promises);
      return verses.filter(Boolean);
    },
    enabled: bookmarks.length > 0,
  });

  const removeBookmark = (verseId: string) => {
    const newBookmarks = bookmarks.filter(id => id !== verseId);
    setBookmarks(newBookmarks);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Saved Verses</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {allVerses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No saved verses yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Click the bookmark icon next to any verse to save it.
                </p>
              </div>
            ) : (
              allVerses.map((verse) => {
                const verseId = `${verse.book}:${verse.chapter}:${verse.verse}`;
                return (
                  <div key={verse.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">
                        {verse.book} {verse.chapter}:{verse.verse}
                      </span>
                      <Button
                        onClick={() => removeBookmark(verseId)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-gray-700 text-sm">{verse.text}</p>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
