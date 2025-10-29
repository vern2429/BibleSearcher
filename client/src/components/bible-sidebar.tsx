import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BibleBook } from "@shared/schema";

interface BibleSidebarProps {
  books: BibleBook[];
  selectedBook: string;
  selectedChapter: number;
  selectedHighlightColor: string;
  onSelectBook: (book: string) => void;
  onSelectChapter: (chapter: number) => void;
  onSelectHighlightColor: (color: string) => void;
}

export default function BibleSidebar({
  books,
  selectedBook,
  selectedChapter,
  selectedHighlightColor,
  onSelectBook,
  onSelectChapter,
  onSelectHighlightColor,
}: BibleSidebarProps) {
  const currentBook = books.find(book => book.name === selectedBook);
  const highlightColors = [
    { name: "yellow", class: "bg-highlight-yellow border-yellow-400" },
    { name: "blue", class: "bg-highlight-blue border-blue-300" },
    { name: "red", class: "bg-highlight-red border-red-300" },
    { name: "green", class: "bg-highlight-green border-green-300" },
  ];

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 hidden lg:block overflow-y-auto">
      {/* Books Navigation */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Books</h3>
        <ScrollArea className="h-96">
          <div className="space-y-1">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => onSelectBook(book.name)}
                className={cn(
                  "w-full px-3 py-2 rounded-md text-sm cursor-pointer transition-colors text-left",
                  selectedBook === book.name
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {book.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chapters Navigation */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Chapters</h3>
        <div className="grid grid-cols-6 gap-2">
          {currentBook && Array.from({ length: currentBook.chapters }, (_, i) => (
            <Button
              key={i + 1}
              onClick={() => onSelectChapter(i + 1)}
              variant={selectedChapter === i + 1 ? "default" : "outline"}
              className={cn(
                "w-10 h-10 rounded-md text-sm font-medium transition-colors",
                selectedChapter === i + 1
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Highlight Colors */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Highlight Colors</h3>
        <div className="flex space-x-2">
          {highlightColors.map((color) => (
            <button
              key={color.name}
              onClick={() => onSelectHighlightColor(color.name)}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all",
                color.class,
                selectedHighlightColor === color.name
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-2 hover:ring-blue-500"
              )}
              title={`${color.name} highlight`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
