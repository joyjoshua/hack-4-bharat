import { useState, useEffect } from 'react';

const LIKES_STORAGE_KEY = 'kirata_liked_videos';

export const useLikes = () => {
  const [likedVideos, setLikedVideos] = useState(() => {
    const stored = sessionStorage.getItem(LIKES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Save to sessionStorage whenever likedVideos changes
  useEffect(() => {
    sessionStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedVideos));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('likesUpdated'));
  }, [likedVideos]);

  const toggleLike = (videoId) => {
    setLikedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  const isLiked = (videoId) => {
    return likedVideos.includes(videoId);
  };

  const getLikedCount = () => {
    return likedVideos.length;
  };

  return {
    likedVideos,
    toggleLike,
    isLiked,
    getLikedCount
  };
};

