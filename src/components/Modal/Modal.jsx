import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
