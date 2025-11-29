import { useState, useRef, useEffect } from 'react';
import ShortsPlayer from './ShortsPlayer';
import './ShortsContainer.css';

const ShortsContainer = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    if (isSwipeUp && currentIndex < videos.length - 1) {
      navigateToVideo(currentIndex + 1);
    }

    if (isSwipeDown && currentIndex > 0) {
      navigateToVideo(currentIndex - 1);
    }
  };

  const navigateToVideo = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Keyboard navigation for desktop testing
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        navigateToVideo(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        navigateToVideo(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, videos.length]);

  // Mouse wheel support for desktop
  const handleWheel = (e) => {
    if (isTransitioning) return;
    
    if (e.deltaY > 0 && currentIndex < videos.length - 1) {
      navigateToVideo(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      navigateToVideo(currentIndex - 1);
    }
  };

  return (
    <div 
      className="shorts-container"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={handleWheel}
    >
      <div 
        className="shorts-wrapper"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {videos.map((video, index) => (
          <ShortsPlayer
            key={video.id}
            videoData={video}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Navigation Hints */}
      {currentIndex > 0 && (
        <div className="nav-hint nav-hint-up">
          <div className="hint-arrow">↑</div>
        </div>
      )}
      {currentIndex < videos.length - 1 && (
        <div className="nav-hint nav-hint-down">
          <div className="hint-arrow">↓</div>
        </div>
      )}
    </div>
  );
};

export default ShortsContainer;

