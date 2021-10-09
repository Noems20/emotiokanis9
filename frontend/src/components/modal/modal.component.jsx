import React from 'react';
import { motion } from 'framer-motion';

// STYLES
import { Backdrop } from './modal.styles';

const modalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const contentVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      mass: 0.5,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const Modal = ({ children, handleClose }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      handleClose();
    }
  };

  return (
    <Backdrop
      className='backdrop'
      onClick={handleClick}
      variants={modalVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <motion.div
        variants={contentVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
