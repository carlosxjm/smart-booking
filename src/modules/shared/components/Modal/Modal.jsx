import { useEffect, useRef } from "react";
import "./Modal.css";

export const Modal = ({ title, isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="modal-root"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="modal-container"
            ref={modalRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <header>
              <div>{title && <h2>{title}</h2>}</div>
              <button
                className="modal-close-button"
                onClick={onClose}
                aria-label="Close Modal"
              >
                &times;
              </button>
            </header>
            <div className="modal-content">
              <div className="modal-content-inner">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
