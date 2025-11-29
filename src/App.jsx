import { useEffect } from 'react';
import ShortsContainer from './components/ShortsContainer';
import { mockVideos } from './data/mockVideos';
import './App.css';

function App() {
  useEffect(() => {
    // Prevent pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Kirāṭa</h1>
          <div className="header-icons">
            <button className="header-btn">🔍</button>
            <button className="header-btn">📹</button>
          </div>
        </div>
      </header>
      <ShortsContainer videos={mockVideos} />
    </div>
  );
}

export default App;
