import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import './RatingModal.css';

const RatingModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const body = document.body;
      
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      
      return () => {
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (rating > 0) {
      setShowSuccess(true);
      if (onSubmit) {
        onSubmit(rating);
      }
      
      // Auto-close after showing success
      setTimeout(() => {
        setShowSuccess(false);
        setRating(0);
        onClose();
      }, 2000);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="rating-modal-overlay">
      <div className="rating-modal-content" onClick={(e) => e.stopPropagation()}>
        {!showSuccess ? (
          <>
            <h3 className="rating-title">How relevant is this content to you?</h3>
            
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="star-btn"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <span className="material-icons star-icon">
                    {star <= (hoveredRating || rating) ? 'star' : 'star_border'}
                  </span>
                </button>
              ))}
            </div>

            <button 
              className={`submit-btn ${rating === 0 ? 'disabled' : ''}`}
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit
            </button>
          </>
        ) : (
          <div className="success-message">
            <span className="material-icons success-icon">check_circle</span>
            <p className="success-text">Thank you for your feedback!</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default RatingModal;

