<div align="center">

# 🌟 Little Legends

### *An Educational Short-Form Video Platform for Mahabharata Stories*

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

**Little Legends** is a mobile-first, YouTube Shorts-inspired platform designed to make ancient Indian scriptures accessible and engaging for modern audiences through bite-sized video content.

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

Little Legends transforms the timeless wisdom of the Mahabharata into an engaging, swipeable video experience. Built with React and optimized for mobile devices, this application provides an intuitive interface for users to explore, like, and learn from ancient scriptures in a modern format.

### 🎯 Key Highlights

- **📱 Mobile-First Design** - Optimized touch gestures and responsive layout
- **🎬 Shorts-Style Interface** - Vertical video scrolling similar to YouTube Shorts/Instagram Reels
- **📚 Scripture Integration** - Deep-dive into Mahabharata stories with detailed scripture modals
- **❤️ Interactive Engagement** - Like, share, and save favorite videos
- **⭐ Smart Rating System** - Context-aware feedback collection
- **🎨 Beautiful UI** - Modern, glassmorphic design with smooth animations

---

## ✨ Features

### 🎥 Video Player
- **Vertical Scrolling** - Swipe up/down to navigate between videos
- **Auto-play** - Videos automatically play when in view
- **Touch Controls** - Tap to pause/play, swipe to navigate
- **Volume Control** - Mute/unmute with visual feedback
- **Keyboard Navigation** - Arrow keys for desktop testing

### 👤 User Profile
- **Video Library** - Browse all available videos in a grid layout
- **Liked Videos** - Dedicated tab for favorited content
- **Session Persistence** - Likes stored in sessionStorage
- **Quick Navigation** - Jump to any video from the profile view

### 📖 Scripture Modal
- **Detailed Context** - Read full scripture passages related to each video
- **Smooth Animations** - Elegant slide-up modal with backdrop blur
- **Scroll Support** - Long-form content with custom scrollbar styling

### ⭐ Rating System
- **Smart Triggers** - Appears after viewing specific content (Video ID 3)
- **5-Star Rating** - Interactive star selection with hover effects
- **One-Time Display** - Prevents rating fatigue
- **Success Feedback** - Confirmation animation after submission

---

## 🏗️ Architecture

### 📐 Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                              │
│                    (Root Component)                          │
│                                                              │
│  • Manages global state (showUserInfo, initialVideoIndex)   │
│  • Handles navigation between main views                    │
│  • Prevents pull-to-refresh behavior                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
┌────────────────┐  ┌────────────────────┐
│  UserInfo.jsx  │  │ ShortsContainer.jsx│
│                │  │                    │
│ Profile View   │  │  Video Feed View   │
└────────────────┘  └────────────────────┘
         │                   │
         │                   ├──────────────┬──────────────┐
         │                   ▼              ▼              ▼
         │          ┌──────────────┐ ┌──────────┐ ┌──────────────┐
         │          │ShortsPlayer  │ │ Rating   │ │ Navigation   │
         │          │   .jsx       │ │ Modal    │ │  Indicators  │
         │          └──────────────┘ └──────────┘ └──────────────┘
         │                   │
         │                   ├──────────────┬──────────────┐
         │                   ▼              ▼              ▼
         │          ┌──────────────┐ ┌──────────┐ ┌──────────────┐
         │          │ Scripture    │ │ Video    │ │ Action       │
         │          │   Modal      │ │ Element  │ │  Buttons     │
         │          └──────────────┘ └──────────┘ └──────────────┘
         │                   │
         └───────────────────┴─────────────────────────────────┐
                                                                │
                                                                ▼
                                                    ┌───────────────────┐
                                                    │   useLikes Hook   │
                                                    │                   │
                                                    │ • Shared state    │
                                                    │ • sessionStorage  │
                                                    │ • Event system    │
                                                    └───────────────────┘
```

### 🔄 Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                      mockVideos.js                           │
│                   (Data Source)                              │
│                                                              │
│  • Video metadata (id, description, date)                   │
│  • Local video file imports                                 │
│  • Scripture content (moreInfo)                             │
│  • Engagement metrics (likes, comments, shares)             │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ├──────────────┬──────────────┬─────────────┐
                   ▼              ▼              ▼             ▼
          ┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
          │ShortsContainer│ │UserInfo  │ │useLikes  │ │App.jsx   │
          │              │ │          │ │          │ │          │
          │ Renders all  │ │ Displays │ │ Manages  │ │ Provides │
          │ videos       │ │ grid     │ │ state    │ │ to views │
          └──────────────┘ └──────────┘ └──────────┘ └──────────┘
```

### 🎯 Component Hierarchy

```
App
├── Header
│   ├── Title ("Little Legends")
│   └── Profile Button
│
├── UserInfo (Conditional)
│   ├── Close Button
│   ├── Tab Navigation
│   │   ├── Videos Tab
│   │   └── Liked Tab
│   ├── Content Grid
│   │   └── Video Thumbnails (clickable)
│   └── Settings Footer
│       ├── Settings Button
│       └── Logout Button
│
└── ShortsContainer (Conditional)
    ├── ShortsWrapper (Vertical Slider)
    │   └── ShortsPlayer[] (Multiple instances)
    │       ├── Video Element
    │       ├── Play/Pause Overlay
    │       ├── Action Buttons
    │       │   ├── Like Button (with count)
    │       │   ├── Scripture Button
    │       │   ├── Share Button
    │       │   ├── More Button
    │       │   └── Mute/Unmute Button
    │       ├── Video Info
    │       │   ├── Description
    │       │   └── Date
    │       └── ScriptureModal
    │           ├── Modal Header
    │           ├── Title
    │           ├── Content (scrollable)
    │           └── Close Button
    │
    ├── Progress Indicator
    │   └── Dots (one per video)
    │
    ├── Navigation Hints
    │   ├── Up Arrow
    │   └── Down Arrow
    │
    └── RatingModal
        ├── Rating Title
        ├── Star Selection (1-5)
        ├── Submit Button
        └── Success Message
```

---

## 🧩 Core Components

### 1️⃣ **App.jsx** - Root Orchestrator
**Purpose:** Main application controller and view switcher

**State Management:**
- `showUserInfo` - Toggle between profile and video feed
- `initialVideoIndex` - Track which video to display when returning from profile

**Key Features:**
- Prevents mobile pull-to-refresh
- Handles navigation between main views
- Passes video selection callbacks

---

### 2️⃣ **ShortsContainer.jsx** - Video Feed Manager
**Purpose:** Manages vertical video scrolling and navigation

**State Management:**
- `currentIndex` - Active video position
- `touchStart/touchEnd` - Touch gesture tracking
- `isTransitioning` - Prevents rapid scrolling
- `showRatingModal` - Controls rating popup
- `hasShownRating` - Ensures one-time rating display

**Navigation Methods:**
- **Touch Gestures:** Swipe up/down
- **Keyboard:** Arrow keys (desktop)
- **Mouse Wheel:** Scroll (desktop)

**Smart Features:**
- Detects when user leaves Video ID 3 → triggers rating modal
- Disables navigation when modal is open
- Smooth CSS transitions between videos
- Dynamic height calculation for responsive layouts

---

### 3️⃣ **ShortsPlayer.jsx** - Individual Video Player
**Purpose:** Renders and controls a single video with interactions

**State Management:**
- `isPlaying` - Play/pause state
- `isMuted` - Audio state
- `showScriptureModal` - Scripture overlay visibility
- `hasInteracted` - Tracks user engagement for autoplay policies

**Video Control Logic:**
```javascript
// Auto-play when active, pause when inactive
if (isActive && isPlaying) → play()
if (!isActive) → pause() and reset to start

// Handle browser autoplay restrictions
try {
  play with sound
} catch {
  fallback to muted autoplay
}
```

**Interaction Features:**
- Click video → toggle play/pause
- Click like → toggle like state (persisted)
- Click scripture → open detailed modal
- Click mute → toggle audio

---

### 4️⃣ **UserInfo.jsx** - Profile & Library
**Purpose:** Display user's video library and liked content

**State Management:**
- `activeTab` - Switch between 'videos' and 'liked'
- `likedVideos` - Synced from useLikes hook
- `forceUpdate` - Re-render on like changes

**Features:**
- **Videos Tab:** Grid of all videos with thumbnails
- **Liked Tab:** Filtered view of favorited videos
- **Empty State:** Friendly message when no likes
- **Click Handler:** Navigate to specific video in feed

**Thumbnail System:**
- Cycles through 12 pre-imported thumbnail images
- Uses modulo for consistent mapping
- Lazy loading for performance

---

### 5️⃣ **ScriptureModal.jsx** - Content Deep-Dive
**Purpose:** Display full scripture text related to video

**Features:**
- Portal rendering (overlays entire app)
- Backdrop blur effect
- Smooth slide-up animation
- Custom scrollbar styling
- Click outside to close

**Accessibility:**
- Prevents background scroll when open
- Escape key support (can be added)
- Focus trap (can be enhanced)

---

### 6️⃣ **RatingModal.jsx** - Feedback Collection
**Purpose:** Gather user ratings for content relevance

**State Management:**
- `rating` - Selected star value (1-5)
- `hoveredRating` - Visual feedback on hover
- `showSuccess` - Display confirmation message

**UX Flow:**
```
1. Modal appears after leaving Video ID 3
2. User hovers stars → visual preview
3. User clicks star → selection confirmed
4. User clicks submit → success animation
5. Auto-close after 2 seconds
```

**Accessibility:**
- Prevents background scroll
- Disabled submit until rating selected
- Visual feedback at every step

---

## 🪝 Custom Hooks

### **useLikes.js** - Centralized Like Management

**Purpose:** Shared state for video likes across components

**Storage Strategy:**
- Uses `sessionStorage` for persistence
- Survives page refresh (within session)
- Clears on browser close

**API:**
```javascript
const { likedVideos, toggleLike, isLiked, getLikedCount } = useLikes();

// Check if video is liked
isLiked(videoId) → boolean

// Toggle like state
toggleLike(videoId) → void

// Get total likes
getLikedCount() → number

// Get all liked video IDs
likedVideos → array
```

**Event System:**
- Dispatches `likesUpdated` event on change
- Components listen and re-render
- Keeps UserInfo and ShortsPlayer in sync

---

## 🎨 Styling Architecture

### **Design System**

**Color Palette:**
- **Primary:** Dark theme (#000000)
- **Accents:** Vibrant gradients
- **Text:** White with opacity variations
- **Overlays:** Glassmorphism with backdrop blur

**Typography:**
- **Font:** Material Icons for icons
- **Sizes:** Responsive scaling
- **Weights:** Variable for hierarchy

**Animations:**
- **Transitions:** 0.3s ease-out (standard)
- **Transforms:** translateY for vertical scrolling
- **Hover Effects:** Scale and opacity changes
- **Modal Animations:** Slide-up with fade

### **CSS Organization**

Each component has its own CSS file:
- `App.css` - Global layout and header
- `ShortsContainer.css` - Feed wrapper and navigation
- `ShortsPlayer.css` - Video player and action buttons
- `UserInfo.css` - Profile grid and tabs
- `ScriptureModal.css` - Modal overlay and content
- `RatingModal.css` - Rating interface
- `index.css` - Global resets and utilities

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hack-4-bharat

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
# Run ESLint
npm run lint

# Development server (with HMR)
npm run dev
```

---

## 🛠️ Tech Stack

### **Core Framework**
- **React 19.2.0** - UI library with latest features
- **Vite 7.2.4** - Lightning-fast build tool and dev server

### **Styling**
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformations
- **Autoprefixer 10.4.22** - Vendor prefix automation

### **Animations**
- **Framer Motion 12.23.24** - Production-ready animation library

### **HTTP Client**
- **Axios 1.13.2** - Promise-based HTTP client

### **Icons**
- **React Icons 5.5.0** - Icon library
- **Material Icons** - Google's icon font

### **Development Tools**
- **ESLint 9.39.1** - Code linting
- **@vitejs/plugin-react 5.1.1** - React integration for Vite

---

## 📁 Project Structure

```
hack-4-bharat/
│
├── public/                      # Static assets
│   └── vite.svg                # Favicon
│
├── src/
│   ├── assets/                 # Media files
│   │   ├── images/            # Thumbnail images (12 total)
│   │   │   ├── Rectangle.png
│   │   │   ├── Rectangle-1.png
│   │   │   └── ... (Rectangle-11.png)
│   │   └── videos/            # Local video files
│   │       ├── 1.mp4
│   │       ├── 2.mp4
│   │       ├── 3.mp4
│   │       ├── 4.mp4
│   │       └── 5.mp4
│   │
│   ├── components/            # React components
│   │   ├── ShortsContainer.jsx      # Video feed wrapper
│   │   ├── ShortsContainer.css
│   │   ├── ShortsPlayer.jsx         # Individual video player
│   │   ├── ShortsPlayer.css
│   │   ├── UserInfo.jsx             # Profile view
│   │   ├── UserInfo.css
│   │   ├── ScriptureModal.jsx       # Scripture overlay
│   │   ├── ScriptureModal.css
│   │   ├── RatingModal.jsx          # Rating popup
│   │   └── RatingModal.css
│   │
│   ├── data/                  # Static data
│   │   └── mockVideos.js     # Video metadata and content
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useLikes.js       # Like state management
│   │
│   ├── utils/                 # Utility functions (empty currently)
│   │
│   ├── App.jsx               # Root component
│   ├── App.css               # App-level styles
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
│
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint rules
├── .gitignore               # Git ignore patterns
└── README.md                # This file
```

---

## 🎯 Key Features Explained

### 📱 Mobile Optimization

**Touch Gestures:**
```javascript
// Swipe detection
const distance = touchStart - touchEnd;
const isSwipeUp = distance > 50;    // Next video
const isSwipeDown = distance < -50; // Previous video
```

**Viewport Configuration:**
```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1.0, 
               maximum-scale=1.0, user-scalable=no, 
               viewport-fit=cover" />
```

**Prevent Pull-to-Refresh:**
```javascript
document.body.style.overscrollBehavior = 'none';
```

---

### 🎬 Video Playback Strategy

**Autoplay Logic:**
1. Try to play with sound
2. If blocked by browser → fallback to muted
3. If still blocked → show play button
4. On user interaction → unmute if desired

**Performance Optimization:**
- Only active video plays
- Inactive videos pause and reset to start
- Preload set to "auto" for smooth transitions
- Local video files (no network latency)

---

### 💾 State Persistence

**SessionStorage Usage:**
```javascript
// Save likes
sessionStorage.setItem('kirata_liked_videos', JSON.stringify(likedVideos));

// Save rating
sessionStorage.setItem('video_3_rating', ratingValue);
```

**Why SessionStorage?**
- Persists during page refresh
- Clears on browser close (privacy)
- No server required
- Fast access

---

### 🎨 Animation Patterns

**Vertical Scrolling:**
```css
transform: translateY(-${currentIndex * viewportHeight}px);
transition: transform 0.3s ease-out;
```

**Modal Slide-Up:**
```css
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
```

**Like Button Animation:**
```css
.liked {
  animation: heartBeat 0.3s ease;
  color: #ff4444;
}
```

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **Backend Integration** - User authentication and cloud storage
- [ ] **Video Upload** - Allow users to contribute content
- [ ] **Comments System** - Enable discussions
- [ ] **Search Functionality** - Find videos by keywords
- [ ] **Categories/Tags** - Organize content by themes
- [ ] **Offline Support** - PWA with service workers
- [ ] **Analytics Dashboard** - Track engagement metrics
- [ ] **Multi-language Support** - i18n for broader reach
- [ ] **Social Sharing** - Native share API integration
- [ ] **Playlist Creation** - Custom video collections

### Technical Improvements
- [ ] **TypeScript Migration** - Type safety
- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **E2E Tests** - Playwright/Cypress
- [ ] **Performance Monitoring** - Web Vitals tracking
- [ ] **Accessibility Audit** - WCAG 2.1 compliance
- [ ] **SEO Optimization** - Meta tags and SSR
- [ ] **CDN Integration** - Faster video delivery
- [ ] **Image Optimization** - WebP/AVIF formats

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style
- Follow existing patterns
- Use meaningful variable names
- Comment complex logic
- Keep components focused and small
- Write CSS in component-specific files

---

## 📄 License

This project is created for educational purposes as part of Hack4Bharat.

---

## 🙏 Acknowledgments

- **Mahabharata** - The timeless epic that inspired this project
- **React Team** - For the amazing framework
- **Vite Team** - For the blazing-fast build tool
- **TailwindCSS** - For the utility-first approach
- **Material Design** - For the beautiful icon system

---

<div align="center">

### Made with ❤️ for preserving ancient wisdom in modern formats

**[⬆ Back to Top](#-little-legends)**

</div>
