'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
              <p className="text-lg text-gray-600">
                Multi-page tracking demo - All interactions tracked with page context
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                id="notifications-btn"
                className="relative bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={clearNotifications}
              >
                🔔 Notifications
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <Link 
                href="/ai-analytics"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                🤖 AI Analytics
              </Link>
              
              <Link 
                href="/"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                ← Home
              </Link>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'analytics', 'settings'].map((tab) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Clicks</h3>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                    <button
                      id="refresh-clicks"
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => console.log('Refreshing clicks data...')}
                    >
                      Refresh →
                    </button>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Active Users</h3>
                    <p className="text-3xl font-bold text-green-600">89</p>
                    <button
                      id="view-users"
                      className="mt-2 text-green-600 hover:text-green-800 text-sm"
                      onClick={() => alert('Viewing active users...')}
                    >
                      View Details →
                    </button>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Conversion Rate</h3>
                    <p className="text-3xl font-bold text-purple-600">12.5%</p>
                    <button
                      id="analyze-conversion"
                      className="mt-2 text-purple-600 hover:text-purple-800 text-sm"
                      onClick={() => console.log('Analyzing conversion data...')}
                    >
                      Analyze →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analytics</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Home Page</span>
                        <button
                          id="view-home-analytics"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          onClick={() => console.log('Viewing home page analytics')}
                        >
                          View
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>About Page</span>
                        <button
                          id="view-about-analytics"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          onClick={() => console.log('Viewing about page analytics')}
                        >
                          View
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dashboard</span>
                        <button
                          id="view-dashboard-analytics"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          onClick={() => console.log('Viewing dashboard analytics')}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      id="export-data"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                      onClick={() => alert('Exporting analytics data...')}
                    >
                      📊 Export Data
                    </button>
                    
                    <button
                      id="generate-report"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
                      onClick={() => console.log('Generating comprehensive report...')}
                    >
                      📋 Generate Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tracking Configuration</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Enable Console Logging</span>
                        <button
                          id="toggle-console-log"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                          onClick={() => console.log('Toggling console logging...')}
                        >
                          Toggle
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Track All Clicks</span>
                        <button
                          id="toggle-all-clicks"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                          onClick={() => console.log('Toggling all clicks tracking...')}
                        >
                          Toggle
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      id="save-settings"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                      onClick={() => alert('Settings saved!')}
                    >
                      💾 Save Settings
                    </button>
                    
                    <button
                      id="reset-settings"
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                      onClick={() => confirm('Reset all settings to default?')}
                    >
                      🔄 Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              id="quick-backup"
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg text-center"
              onClick={() => console.log('Creating backup...')}
            >
              <div className="text-2xl mb-2">💾</div>
              <div className="text-sm">Backup Data</div>
            </button>
            
            <button
              id="quick-sync"
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-lg text-center"
              onClick={() => console.log('Syncing data...')}
            >
              <div className="text-2xl mb-2">🔄</div>
              <div className="text-sm">Sync</div>
            </button>
            
            <button
              id="quick-help"
              className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-lg text-center"
              onClick={() => alert('Help documentation opened!')}
            >
              <div className="text-2xl mb-2">❓</div>
              <div className="text-sm">Help</div>
            </button>
            
            <Link
              href="/about"
              className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <div className="text-sm">About</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 