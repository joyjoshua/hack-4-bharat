import { useEffect, useState } from 'react';
import ShortsContainer from './components/ShortsContainer';
import UserInfo from './components/UserInfo';
import { mockVideos } from './data/mockVideos';
import './App.css';

function App() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [initialVideoIndex, setInitialVideoIndex] = useState(0);

  useEffect(() => {
    // Prevent pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleVideoSelect = (videoIndex) => {
    setInitialVideoIndex(videoIndex);
    setShowUserInfo(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Kirāṭa</h1>
          <div className="header-icons">
            <button className="header-btn" onClick={toggleUserInfo}>
              <span className="material-icons">person</span>
            </button>
          </div>
        </div>
      </header>
      {showUserInfo ? (
        <UserInfo onClose={toggleUserInfo} onVideoSelect={handleVideoSelect} />
      ) : (
        <ShortsContainer videos={mockVideos} initialIndex={initialVideoIndex} />
      )}
    </div>
  );
}

export default App;
