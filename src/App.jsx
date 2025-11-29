import { useEffect, useState } from 'react';
import ShortsContainer from './components/ShortsContainer';
import UserInfo from './components/UserInfo';
import { mockVideos } from './data/mockVideos';
import './App.css';

function App() {
  const [showUserInfo, setShowUserInfo] = useState(false);

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

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Kirāṭa</h1>
          <div className="header-icons">
            <button className="header-btn" onClick={toggleUserInfo}>📹</button>
          </div>
        </div>
      </header>
      {showUserInfo ? (
        <UserInfo onClose={toggleUserInfo} />
      ) : (
        <ShortsContainer videos={mockVideos} />
      )}
    </div>
  );
}

export default App;
