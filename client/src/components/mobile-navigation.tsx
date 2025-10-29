import { Book, List, Palette, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleBookmarks: () => void;
}

export default function MobileNavigation({
  activeTab,
  onTabChange,
  onToggleBookmarks,
}: MobileNavigationProps) {
  const tabs = [
    { id: "books", label: "Books", icon: Book },
    { id: "chapters", label: "Chapters", icon: List },
    { id: "highlights", label: "Highlights", icon: Palette },
    { id: "bookmarks", label: "Saved", icon: Bookmark },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === "bookmarks") {
      onToggleBookmarks();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors",
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
