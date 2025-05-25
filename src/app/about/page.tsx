'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function About() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Page</h1>
          <p className="text-lg text-gray-600">
            This page demonstrates tracking across multiple pages. All button clicks here are also tracked!
          </p>
        </header>

        <nav className="mb-8">
          <div className="flex gap-4 justify-center">
            <Link 
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/dashboard"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Go to Dashboard →
            </Link>
          </div>
        </nav>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">About This Component</h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-gray-600">
              The UserTracker component automatically tracks user interactions across all pages in your application.
              Each click is logged with the current page URL, so you can analyze user behavior patterns.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">What gets tracked on this page:</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Page URL: <code>/about</code></li>
                <li>All button clicks with their text content</li>
                <li>Element IDs and CSS classes</li>
                <li>Click coordinates and timestamps</li>
                <li>Same session ID across all pages</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Try These Buttons</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                id="like-btn"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => setLikes(prev => prev + 1)}
              >
                ❤️ Like ({likes})
              </button>
              
              <button
                id="share-btn"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => alert('Shared! (This click was tracked)')}
              >
                📤 Share
              </button>
              
              <button
                id="subscribe-btn"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => console.log('Subscribed! Check the tracking logs.')}
              >
                🔔 Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Multi-Page Tracking Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🔍 User Journey Analysis</h3>
              <p className="text-blue-700 text-sm">
                Track how users navigate through your site and which pages have the most engagement.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">📊 Page Performance</h3>
              <p className="text-green-700 text-sm">
                Identify which pages have the highest click-through rates and user interaction.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Conversion Tracking</h3>
              <p className="text-purple-700 text-sm">
                Monitor user actions across multiple pages to understand conversion funnels.
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">🔄 Session Continuity</h3>
              <p className="text-orange-700 text-sm">
                Maintain the same session ID across all pages for comprehensive user tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 