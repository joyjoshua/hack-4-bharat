import { useState } from 'react';
import { FaUser, FaVideo, FaHeart, FaEye, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './UserInfo.css';

const UserInfo = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('videos');

  const userStats = {
    username: 'creative_mind',
    fullName: 'Creative Creator',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Creating amazing content every day ✨\nFollow for more inspiration!',
    followers: 125400,
    following: 892,
    likes: 2340000,
    totalViews: 5600000,
    videos: 45
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
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={userStats.avatar} alt={userStats.username} />
          </div>
          <h2 className="profile-username">@{userStats.username}</h2>
          <p className="profile-fullname">{userStats.fullName}</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">{formatNumber(userStats.following)}</div>
            <div className="stat-label">Following</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">{formatNumber(userStats.followers)}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">{formatNumber(userStats.likes)}</div>
            <div className="stat-label">Likes</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-row">
          <button className="action-btn primary">Edit Profile</button>
          <button className="action-btn secondary">Share Profile</button>
        </div>

        {/* Bio */}
        <div className="bio-section">
          <p className="bio-text">{userStats.bio}</p>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <FaVideo /> Videos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            <FaHeart /> Liked
          </button>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {activeTab === 'videos' && (
            <>
              {[...Array(12)].map((_, index) => (
                <div key={index} className="grid-item">
                  <div className="grid-thumbnail">
                    <div className="thumbnail-placeholder">
                      <FaVideo />
                    </div>
                    <div className="view-count">
                      <FaEye /> {formatNumber(Math.floor(Math.random() * 500000) + 10000)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {activeTab === 'liked' && (
            <div className="empty-state">
              <FaHeart className="empty-icon" />
              <p>Your liked videos will appear here</p>
            </div>
          )}
        </div>

        {/* Settings Footer */}
        <div className="settings-footer">
          <button className="footer-btn">
            <FaCog /> Settings
          </button>
          <button className="footer-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

