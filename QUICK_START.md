# UserTracker - Quick Start (5 Minutes)

Get user interaction tracking up and running in your project in just 5 minutes!

## 🚀 For Next.js Projects

### 1. Copy These Files

**File 1: `src/components/UserTracker.tsx`**
```tsx
'use client';

import { useEffect, useRef } from 'react';

interface ClickData {
  timestamp: string;
  elementType: string;
  elementText: string;
  elementId?: string;
  elementClass?: string;
  pageUrl: string;
  userAgent: string;
  coordinates: { x: number; y: number };
  sessionId: string;
}

interface UserTrackerProps {
  apiEndpoint?: string;
  sessionId?: string;
  enableConsoleLog?: boolean;
  trackAllClicks?: boolean;
}

export default function UserTracker({
  apiEndpoint = '/api/track',
  sessionId,
  enableConsoleLog = false,
  trackAllClicks = false
}: UserTrackerProps) {
  const sessionIdRef = useRef<string>(
    sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  const logClick = async (clickData: ClickData, isNavigationLink = false) => {
    try {
      if (enableConsoleLog) {
        console.log('User Interaction Tracked:', clickData);
      }

      if (isNavigationLink && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(clickData)], { type: 'application/json' });
        navigator.sendBeacon(apiEndpoint, blob);
      } else {
        await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clickData),
        });
      }
    } catch (error) {
      console.error('Failed to log click data:', error);
    }
  };

  const handleClick = async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    const clickableElement = target.closest('button') || 
                            target.closest('a') || 
                            target.closest('[role="button"]') ||
                            (target.classList.contains('btn') || target.classList.contains('button') ? target : null) ||
                            (target.tagName.toLowerCase() === 'button' ? target : null) ||
                            (target.tagName.toLowerCase() === 'a' ? target : null);

    const shouldTrack = trackAllClicks || clickableElement !== null;
    if (!shouldTrack || !clickableElement) return;

    const isLink = clickableElement.tagName.toLowerCase() === 'a';
    const href = isLink ? (clickableElement as HTMLAnchorElement).href : null;
    const isNavigationLink = isLink && href && 
                           !href.startsWith('javascript:') && 
                           !href.startsWith('#') &&
                           !href.startsWith('mailto:') &&
                           !href.startsWith('tel:');

    const clickData: ClickData = {
      timestamp: new Date().toISOString(),
      elementType: clickableElement.tagName.toLowerCase(),
      elementText: clickableElement.textContent?.trim() || '',
      elementId: clickableElement.id || undefined,
      elementClass: clickableElement.className || undefined,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      coordinates: { x: event.clientX, y: event.clientY },
      sessionId: sessionIdRef.current,
    };

    if (isNavigationLink) {
      event.preventDefault();
      try {
        await logClick(clickData, true);
        await new Promise(resolve => setTimeout(resolve, 50));
        if (href) window.location.href = href;
      } catch (error) {
        console.error('Error tracking navigation click:', error);
        if (href) window.location.href = href;
      }
    } else {
      logClick(clickData, false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}

export type { ClickData, UserTrackerProps };
```

**File 2: `src/app/api/track/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    let clickData;
    const contentType = request.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      clickData = await request.json();
    } else {
      const text = await request.text();
      try {
        clickData = JSON.parse(text);
      } catch {
        clickData = { rawData: text, timestamp: new Date().toISOString() };
      }
    }
    
    const logsDir = path.join(process.cwd(), 'logs');
    try {
      await fs.access(logsDir);
    } catch {
      await fs.mkdir(logsDir, { recursive: true });
    }

    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `user-interactions-${today}.json`);

    let existingData = [];
    try {
      const fileContent = await fs.readFile(logFile, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch {
      existingData = [];
    }

    existingData.push({
      ...clickData,
      serverTimestamp: new Date().toISOString(),
    });

    await fs.writeFile(logFile, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Click data logged successfully',
      logFile: `user-interactions-${today}.json`
    });

  } catch (error) {
    console.error('Error logging click data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log click data' },
      { status: 500 }
    );
  }
}
```

### 2. Add to Your Layout

**Update `src/app/layout.tsx`:**
```tsx
import UserTracker from '../components/UserTracker';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Add this line - tracks all pages */}
        <UserTracker enableConsoleLog={true} />
        {children}
      </body>
    </html>
  );
}
```

### 3. Test It!

Add some buttons to any page:
```tsx
export default function TestPage() {
  return (
    <div>
      <button>This button will be tracked!</button>
      <a href="/other-page">This link will be tracked too!</a>
    </div>
  );
}
```

**That's it! 🎉** Open your browser console and click around to see the tracking in action.

---

## 🔧 For React Projects (Non-Next.js)

### 1. Copy the UserTracker Component
Use the same `UserTracker.tsx` file from above.

### 2. Add to Your App
```tsx
// src/App.tsx
import UserTracker from './components/UserTracker';

function App() {
  return (
    <div className="App">
      <UserTracker 
        enableConsoleLog={true}
        apiEndpoint="/your-api-endpoint"
      />
      {/* Your app content */}
    </div>
  );
}
```

### 3. Set Up Your Backend
Create an endpoint that accepts POST requests with the tracking data.

---

## 🌐 For Any Website (Vanilla JavaScript)

### Just Add This Script Tag:
```html
<script>
(function() {
  const UserTracker = {
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    apiEndpoint: '/api/track',
    enableConsoleLog: true,

    init() {
      document.addEventListener('click', this.handleClick.bind(this), true);
    },

    async handleClick(event) {
      const target = event.target;
      const clickableElement = target.closest('button') || 
                              target.closest('a') || 
                              target.closest('[role="button"]') ||
                              (target.classList.contains('btn') ? target : null);

      if (!clickableElement) return;

      const clickData = {
        timestamp: new Date().toISOString(),
        elementType: clickableElement.tagName.toLowerCase(),
        elementText: clickableElement.textContent?.trim() || '',
        elementId: clickableElement.id || undefined,
        elementClass: clickableElement.className || undefined,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        coordinates: { x: event.clientX, y: event.clientY },
        sessionId: this.sessionId,
      };

      if (this.enableConsoleLog) {
        console.log('User Interaction Tracked:', clickData);
      }

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clickData),
        });
      } catch (error) {
        console.error('Failed to log click data:', error);
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UserTracker.init());
  } else {
    UserTracker.init();
  }
})();
</script>
```

---

## 📊 View Your Data

### Check the Console
Open browser DevTools (F12) and click around - you'll see tracking logs!

### Check Log Files
Look for `logs/user-interactions-YYYY-MM-DD.json` in your project root.

### Sample Data:
```json
[
  {
    "timestamp": "2024-01-15T10:30:45.123Z",
    "elementType": "button",
    "elementText": "Click Me",
    "elementId": "my-button",
    "pageUrl": "http://localhost:3000/",
    "coordinates": { "x": 150, "y": 300 },
    "sessionId": "session_1705312245123_abc123"
  }
]
```

---

## 🎯 What Gets Tracked

✅ **Buttons** (`<button>` elements)  
✅ **Links** (`<a>` elements, including navigation)  
✅ **Custom buttons** (elements with `.btn` or `.button` classes)  
✅ **Role buttons** (elements with `role="button"`)  
✅ **Click coordinates** and timestamps  
✅ **Page context** and session tracking  

---

## ⚙️ Configuration Options

```tsx
<UserTracker 
  enableConsoleLog={true}          // Show logs in console
  trackAllClicks={false}           // Only track buttons/links
  sessionId="custom-session"       // Custom session ID
  apiEndpoint="/api/custom-track"  // Custom API endpoint
/>
```

---

## 🚨 Troubleshooting

**Not seeing logs?**
- Make sure `enableConsoleLog={true}`
- Check browser console for errors
- Verify you're clicking trackable elements

**API errors?**
- Check that your API endpoint is working
- Verify the endpoint URL is correct
- Check network tab in DevTools

**Need help?** Check the full [Integration Guide](./INTEGRATION_GUIDE.md) for detailed instructions!

---

**🎉 You're now tracking user interactions! Perfect for hackathons, analytics, and understanding user behavior.** 