import { Book, Search, Palette, Bookmark, Keyboard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowToUse() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Book className="text-blue-600 text-xl" />
              <h1 className="text-xl font-bold text-gray-900">BibleSearcher</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Table of Contents
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">How to Use BibleSearcher</h1>
            <p className="text-lg text-gray-600">
              Learn how to make the most of your Bible study experience
            </p>
          </div>

          {/* Navigation Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Book className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Navigation</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Books & Chapters</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Click any book name in the sidebar to select it</li>
                    <li>• Use the numbered chapter buttons to jump to specific chapters</li>
                    <li>• Navigate with Previous/Next Chapter buttons</li>
                    <li>• All 66 books of the Bible are available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mobile Navigation</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Use the bottom navigation bar on mobile devices</li>
                    <li>• Switch between Books, Chapters, and features</li>
                    <li>• Tap icons to access different sections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Search Features</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verse References</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Type "John 3:16" to find specific verses</li>
                    <li>• Try "Genesis 1:1" or "Psalm 23:1"</li>
                    <li>• Works with all book names and abbreviations</li>
                    <li>• Supports numbered books like "1 Corinthians 13:4"</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Text Search</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Search for any word: "love", "faith", "hope"</li>
                    <li>• Search book names: "Matthew", "Psalms"</li>
                    <li>• Results show instantly as you type</li>
                    <li>• Search across all 31,000+ verses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Highlighting Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Palette className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Highlighting Verses</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How to Highlight</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Choose a color from the sidebar (yellow, blue, red, green)</li>
                    <li>• Click on any verse text to highlight it</li>
                    <li>• Click again to remove the highlight</li>
                    <li>• Highlights are saved automatically</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Color System</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
                      <span className="text-gray-700">Yellow - General highlights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
                      <span className="text-gray-700">Blue - Important passages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
                      <span className="text-gray-700">Red - Key verses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
                      <span className="text-gray-700">Green - Personal favorites</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmarks Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bookmark className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Bookmarking</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Adding Bookmarks</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Hover over any verse to see the bookmark icon</li>
                    <li>• Click the bookmark icon to save the verse</li>
                    <li>• Bookmarked verses stay visible with a blue icon</li>
                    <li>• Click again to remove the bookmark</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Viewing Bookmarks</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Click the bookmark icon in the header</li>
                    <li>• View all your saved verses in one place</li>
                    <li>• Each bookmark shows the verse reference</li>
                    <li>• Delete bookmarks from the bookmark panel</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Keyboard className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Keyboard Shortcuts</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Navigation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Previous Chapter</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-sm">Alt + ←</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Next Chapter</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-sm">Alt + →</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Focus Search</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-sm">Ctrl + F</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Toggle Bookmarks</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-sm">Ctrl + B</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pro Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Use different highlight colors for different themes (promises, prayers, etc.)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bookmark verses you want to memorize or share</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Search for topics like "peace" or "forgiveness" to study themes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Use keyboard shortcuts for faster navigation during study</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}