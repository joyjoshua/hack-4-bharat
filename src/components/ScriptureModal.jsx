import { createPortal } from 'react-dom';
import './ScriptureModal.css';

const ScriptureModal = ({ isOpen, onClose, title, content }) => {
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

