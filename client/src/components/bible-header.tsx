import { Search, Book, Bookmark, Settings, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";

interface BibleHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleBookmarks: () => void;
}

export default function BibleHeader({ 
  searchQuery, 
  onSearchChange, 
  onToggleBookmarks 
}: BibleHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Book className="text-blue-600 text-xl" />
              <h1 className="text-xl font-bold text-gray-900">BibleSearcher</h1>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search verses or try 'John 3:16'..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onToggleBookmarks}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            
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
                  <Link href="/">
                    <button 
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowMenu(false)}
                      data-testid="menu-table-of-contents"
                    >
                      Table of Contents
                    </button>
                  </Link>
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

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search verses or try 'John 3:16'..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
