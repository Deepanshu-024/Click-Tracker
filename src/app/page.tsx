'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserTracker from '../components/UserTracker';

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleCounterClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleAlertClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDownloadLogs = async () => {
    try {
      const response = await fetch('/api/track');
      const data = await response.json();
      alert(`Found ${data.files.length} log files: ${data.files.join(', ')}`);
    } catch (error) {
      alert('Error fetching log files');
    }
  };

  return (
    <>
      {/* User Tracker Component - This tracks all button clicks */}
      <UserTracker 
        enableConsoleLog={true} 
        trackAllClicks={false} // Only track buttons and button-like elements
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              User Interaction Tracker Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This page demonstrates a reusable user tracking component that logs button clicks 
              and user interactions to a file. Open your browser console to see real-time tracking data.
            </p>
            
            {/* Navigation */}
            <div className="flex gap-4 justify-center mt-6 flex-wrap">
              <Link 
                href="/about"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                About Page →
              </Link>
              <Link 
                href="/dashboard"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Dashboard →
              </Link>
              <Link 
                href="/ai-analytics"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                🤖 AI Analytics
              </Link>
              <Link 
                href="/test"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                🧪 Test Navigation Tracking
              </Link>
            </div>
          </header>

          {/* Alert Banner */}
          {showAlert && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              Alert button was clicked! This interaction was tracked.
            </div>
          )}

          {/* Demo Buttons Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Interactive Elements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Counter Button */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Counter Button</h3>
                <button
                  id="counter-btn"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  onClick={handleCounterClick}
                >
                  Clicked {clickCount} times
                </button>
              </div>

              {/* Alert Button */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Alert Button</h3>
                <button
                  id="alert-btn"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  onClick={handleAlertClick}
                >
                  Show Alert
                </button>
              </div>

              {/* Download Logs Button */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">View Logs</h3>
                <button
                  id="logs-btn"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  onClick={handleDownloadLogs}
                >
                  Check Log Files
                </button>
              </div>

              {/* Styled Link as Button */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Link Button</h3>
                <a
                  href="#"
                  role="button"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Link as Button
                </a>
              </div>

              {/* Custom Class Button */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Custom Class</h3>
                <div
                  className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer inline-block"
                  onClick={() => console.log('Custom class button clicked')}
                >
                  Custom .btn Class
                </div>
              </div>

              {/* Nested Button */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Nested Elements</h3>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  <span>Button with</span>
                  <br />
                  <span className="text-sm">Nested Elements</span>
                </button>
              </div>
            </div>
          </div>

          {/* Integration Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How to Integrate</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">1. Add the UserTracker component:</h3>
                <code className="text-sm text-gray-600 block">
                  {`<UserTracker enableConsoleLog={true} trackAllClicks={false} />`}
                </code>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">2. Customize tracking options:</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li><code>enableConsoleLog</code>: Show tracking data in console</li>
                  <li><code>trackAllClicks</code>: Track all clicks vs just buttons</li>
                  <li><code>sessionId</code>: Custom session identifier</li>
                  <li><code>apiEndpoint</code>: Custom API endpoint for logging</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">3. View logged data:</h3>
                <p className="text-sm text-gray-600">
                  Click data is automatically saved to <code>logs/user-interactions-YYYY-MM-DD.json</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
