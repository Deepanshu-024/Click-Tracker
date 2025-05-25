'use client';

import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Navigation Tracking Test</h1>
          <p className="text-lg text-gray-600">
            This page tests if navigation links are being tracked properly. 
            Check the console and log files to verify tracking works.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Navigation Links Test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next.js Link Components */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Next.js Link Components</h3>
              
              <Link 
                href="/"
                className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              >
                🏠 Go to Home (Next.js Link)
              </Link>
              
              <Link 
                href="/about"
                className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              >
                ℹ️ Go to About (Next.js Link)
              </Link>
              
              <Link 
                href="/dashboard"
                className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              >
                📊 Go to Dashboard (Next.js Link)
              </Link>
            </div>

            {/* Regular HTML Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Regular HTML Links</h3>
              
              <a 
                href="/"
                className="block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              >
                🏠 Go to Home (HTML Link)
              </a>
              
              <a 
                href="/about"
                className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              >
                ℹ️ Go to About (HTML Link)
              </a>
              
              <a 
                href="/dashboard"
                className="block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              >
                📊 Go to Dashboard (HTML Link)
              </a>
            </div>
          </div>
        </div>

        {/* Non-navigation links (should also be tracked) */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Non-Navigation Links</h2>
          
          <div className="flex gap-4 flex-wrap">
            <a 
              href="#section1"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              📍 Anchor Link (#section1)
            </a>
            
            <a 
              href="mailto:test@example.com"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition-colors"
            >
              ✉️ Email Link
            </a>
            
            <a 
              href="tel:+1234567890"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors"
            >
              📞 Phone Link
            </a>
            
            <a 
              href="javascript:alert('JavaScript link clicked!')"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
            >
              ⚡ JavaScript Link
            </a>
          </div>
        </div>

        {/* Regular buttons for comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Regular Buttons (for comparison)</h2>
          
          <div className="flex gap-4 flex-wrap">
            <button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors"
              onClick={() => console.log('Regular button clicked')}
            >
              🔘 Regular Button
            </button>
            
            <button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition-colors"
              onClick={() => alert('Alert button clicked')}
            >
              🚨 Alert Button
            </button>
            
            <div 
              className="btn bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded transition-colors cursor-pointer"
              onClick={() => console.log('Custom .btn class clicked')}
            >
              🎨 Custom .btn Class
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Testing Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Open your browser's Developer Console (F12)</li>
            <li>Click on various links and buttons above</li>
            <li>Check the console for tracking logs</li>
            <li>Navigate to different pages and verify tracking continues</li>
            <li>Check the log files in the <code>logs/</code> directory</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 