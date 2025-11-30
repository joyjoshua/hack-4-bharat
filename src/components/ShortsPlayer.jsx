import { useState, useRef, useEffect } from 'react';
import ScriptureModal from './ScriptureModal';
import { useLikes } from '../hooks/useLikes';
import './ShortsPlayer.css';

const ShortsPlayer = ({ videoData, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted - user can mute later
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false);
  const [showScriptureModal, setShowScriptureModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);
  const { isLiked: checkIsLiked, toggleLike } = useLikes();
  const isLiked = checkIsLiked(videoData.id);

  // Handle video playback based on active state and play/pause state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.volume = 1.0;
        video.muted = isMuted;
        await video.play();
        
        // If user has interacted and we're muted, try to unmute
        if (!isMuted && hasInteracted) {
          video.muted = false;
        }
      } catch (error) {
        console.log('Autoplay failed:', error);
        // Try with muted as fallback
        try {
          video.muted = true;
          setIsMuted(true);
          await video.play();
        } catch (mutedError) {
          console.log('Muted autoplay also failed:', mutedError);
          setIsPlaying(false);
        }
      }
    };

    if (isActive) {
      if (isPlaying) {
        attemptPlay();
      } else {
        video.pause();
      }
    } else {
      // Pause and reset non-active videos
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, isPlaying, isMuted, hasInteracted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent play/pause toggle
    setHasInteracted(true);
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleToggleLike = () => {
    toggleLike(videoData.id);
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
        muted={isMuted}
        preload="auto"
        onClick={togglePlayPause}
        webkit-playsinline="true"
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

        <div className="action-item" onClick={handleToggleLike}>
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

        {/* Mute/Unmute Button - Subtle */}
        <div className="action-item mute-action" onClick={toggleMute}>
          <div className="action-icon mute-icon">
            <span className="material-icons">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
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

