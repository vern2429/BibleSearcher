import { Book, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
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
            <Book className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About BibleSearcher</h1>
            <p className="text-lg text-gray-600">
              A modern Bible study application for focused scripture reading and study
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Built with Purpose</h3>
              <p className="text-gray-600">
                Created to provide a clean, distraction-free environment for studying God's Word with modern tools for highlighting and bookmarking.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Everyone</h3>
              <p className="text-gray-600">
                Whether you're new to Bible study or a seasoned reader, our intuitive interface helps you engage with scripture meaningfully.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Complete Bible text (World English Bible)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Powerful search functionality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Verse reference lookup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Color-coded highlighting</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Bookmark favorite verses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Keyboard shortcuts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Mobile-responsive design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Easy chapter navigation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Bible Translation</h3>
            <p className="text-gray-700 mb-4">
              This application uses the <strong>World English Bible (WEB)</strong>, a public domain modern English translation based on the American Standard Version (1901), the Biblia Hebraica Stuttgartensia Old Testament, and the Greek Majority Text New Testament.
            </p>
            <p className="text-gray-600 text-sm">
              The World English Bible is freely available for copying and distribution without copyright restrictions, making it perfect for digital Bible study applications.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}