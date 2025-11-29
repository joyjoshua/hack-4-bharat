import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisV, FaMusic } from 'react-icons/fa';
import './ShortsPlayer.css';

const ShortsPlayer = ({ videoData, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false);
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
          <FaPlay className="play-icon" />
        </div>
      )}

      {/* Right Side Actions */}
      <div className="action-buttons">
        <div className="action-item">
        </div>

        <div className="action-item" onClick={toggleLike}>
          <div className="action-icon">
            {isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
          </div>
          <span className="action-count">{formatNumber(videoData.likes + (isLiked ? 1 : 0))}</span>
        </div>

        <div className="action-item">
          <div className="action-icon">
            <FaShare />
          </div>
          <span className="action-count">Share</span>
        </div>

        <div className="action-item">
          <div className="action-icon">
            <FaEllipsisV />
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="video-info">
        <div className="username-section">
          <span className="username">@{videoData.username}</span>
        </div>
        <div className="description">
          {videoData.description}
        </div>
      </div>
    </div>
  );
};

export default ShortsPlayer;

