import { useState, useRef, useEffect } from 'react';
import ShortsPlayer from './ShortsPlayer';
import RatingModal from './RatingModal';
import './ShortsContainer.css';

const ShortsContainer = ({ videos, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);
  const containerRef = useRef(null);
  const previousIndexRef = useRef(initialIndex);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Show rating modal when user scrolls AWAY FROM video ID 3
  useEffect(() => {
    const previousVideo = videos[previousIndexRef.current];
    const currentVideo = videos[currentIndex];
    
    // Check if user just left video ID 3
    if (previousVideo && previousVideo.id === 3 && 
        currentVideo && currentVideo.id !== 3 && 
        !hasShownRating) {
      // Small delay before showing modal
      const timer = setTimeout(() => {
        setShowRatingModal(true);
        setHasShownRating(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Update previous index for next comparison
    previousIndexRef.current = currentIndex;
  }, [currentIndex, videos, hasShownRating]);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    // Disable swipe when rating modal is open
    if (showRatingModal) return;
    
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

  const handleRatingSubmit = (ratingValue) => {
    console.log('User rated:', ratingValue);
    // Store rating in sessionStorage
    sessionStorage.setItem('video_3_rating', ratingValue);
  };

  const handleCloseRating = () => {
    setShowRatingModal(false);
  };

  // Update container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  // Keyboard navigation for desktop testing
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Disable keyboard navigation when rating modal is open
      if (showRatingModal) return;
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        navigateToVideo(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        navigateToVideo(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, videos.length, showRatingModal]);

  // Mouse wheel support for desktop
  const handleWheel = (e) => {
    // Disable wheel navigation when rating modal is open
    if (showRatingModal || isTransitioning) return;
    
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
          transform: `translateY(-${currentIndex * (containerHeight || window.innerHeight)}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {videos.map((video, index) => (
          <ShortsPlayer
            key={video.id}
            videoData={video}
            isActive={index === currentIndex}
            isModalOpen={showRatingModal}
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

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={handleCloseRating}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
};

export default ShortsContainer;

