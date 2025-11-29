import { useState, useRef, useEffect } from 'react';
import ScriptureModal from './ScriptureModal';
import './ShortsPlayer.css';

const ShortsPlayer = ({ videoData, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false);
  const [showScriptureModal, setShowScriptureModal] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleScriptureModal = () => {
    setShowScriptureModal(!showScriptureModal);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="shorts-player">
      <video
        ref={videoRef}
        className="video-element"
        src={videoData.videoUrl}
        loop
        playsInline
        onClick={togglePlayPause}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="play-overlay" onClick={togglePlayPause}>
          <span className="material-icons play-icon">play_arrow</span>
        </div>
      )}

      {/* Right Side Actions */}
      <div className="action-buttons">
        <div className="action-item">
        </div>

        <div className="action-item" onClick={toggleLike}>
          <div className="action-icon">
            <span className={`material-icons ${isLiked ? 'liked' : ''}`}>
              {isLiked ? 'favorite' : 'favorite_border'}
            </span>
          </div>
          <span className="action-count">{formatNumber(videoData.likes + (isLiked ? 1 : 0))}</span>
        </div>

        <div className="action-item" onClick={toggleScriptureModal}>
          <div className="action-icon">
            <span className="material-icons">library_books</span>
          </div>
          <span className="action-count">Scriptures</span>
        </div>
        
        <div className="action-item">
          <div className="action-icon">
            <span className="material-icons">share</span>
          </div>
          <span className="action-count">Share</span>
        </div>

        <div className="action-item">
          <div className="action-icon">
            <span className="material-icons">more_vert</span>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="video-info">
        <div className="username-section">
          <span className="username">{videoData.description}</span>
        </div>
        <div className="description">
          {videoData.date}
        </div>
      </div>

      {/* Scripture Modal */}
      <ScriptureModal
        isOpen={showScriptureModal}
        onClose={toggleScriptureModal}
        title={videoData.description}
        content={videoData.moreInfo || 'No additional scripture information available.'}
      />
    </div>
  );
};

export default ShortsPlayer;

