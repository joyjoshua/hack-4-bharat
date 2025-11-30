import { useState } from 'react';
import './UserInfo.css';
import { mockVideos } from '../data/mockVideos';

// Import thumbnail images
import thumb1 from '../assets/images/Rectangle.png';
import thumb2 from '../assets/images/Rectangle-1.png';
import thumb3 from '../assets/images/Rectangle-2.png';
import thumb4 from '../assets/images/Rectangle-3.png';
import thumb5 from '../assets/images/Rectangle-4.png';
import thumb6 from '../assets/images/Rectangle-5.png';
import thumb7 from '../assets/images/Rectangle-6.png';
import thumb8 from '../assets/images/Rectangle-7.png';
import thumb9 from '../assets/images/Rectangle-8.png';
import thumb10 from '../assets/images/Rectangle-9.png';
import thumb11 from '../assets/images/Rectangle-10.png';
import thumb12 from '../assets/images/Rectangle-11.png';

const UserInfo = ({ onClose, onVideoSelect }) => {
  const [activeTab, setActiveTab] = useState('videos');

  const handleVideoClick = (index) => {
    if (onVideoSelect) {
      onVideoSelect(index);
    }
  };
  
  const thumbnailImages = [
    thumb1, thumb2, thumb3, thumb4, thumb5, thumb6,
    thumb7, thumb8, thumb9, thumb10, thumb11, thumb12
  ];

  // Get random thumbnail for each video, cycling through available thumbnails
  const getRandomThumbnail = (index) => {
    // Use modulo to cycle through thumbnails if more videos than thumbnails
    const thumbnailIndex = index % thumbnailImages.length;
    return thumbnailImages[thumbnailIndex];
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
    <div className="user-info-container">
      <div className="user-info-wrapper">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <span className="material-icons">close</span>
        </button>

        {/* Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <span className="material-icons">video_library</span> Videos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            <span className="material-icons">favorite</span> Liked
          </button>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {activeTab === 'videos' && (
            <>
              {mockVideos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="grid-item"
                  onClick={() => handleVideoClick(index)}
                >
                  <div className="grid-thumbnail">
                    <img 
                      src={getRandomThumbnail(index)} 
                      alt={video.description}
                      className="thumbnail-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="view-count">
                      <span className="material-icons">visibility</span> {formatNumber(video.likes)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {activeTab === 'liked' && (
            <div className="empty-state">
              <span className="material-icons empty-icon">favorite_border</span>
              <p>Your liked videos will appear here</p>
            </div>
          )}
        </div>

        {/* Settings Footer */}
        <div className="settings-footer">
          <button className="footer-btn">
            <span className="material-icons">settings</span> Settings
          </button>
          <button className="footer-btn">
            <span className="material-icons">logout</span> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

