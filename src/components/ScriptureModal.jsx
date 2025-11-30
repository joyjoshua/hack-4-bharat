import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './ScriptureModal.css';

const ScriptureModal = ({ isOpen, onClose, title, content }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      const body = document.body;
      
      // Prevent scroll on body
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll when modal closes
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="scripture-modal-overlay" onClick={onClose}>
      <div className="scripture-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="scripture-modal-header">
          <h2 className="scripture-modal-title">{title}</h2>
          <button className="scripture-close-btn" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="scripture-modal-body">
          <p className="scripture-text">{content}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ScriptureModal;

