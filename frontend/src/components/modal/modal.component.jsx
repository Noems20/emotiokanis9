import React from 'react';
import { motion } from 'framer-motion';

// REDUX
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';

// STYLES
import './modal.styles.scss';

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      dispatch(setModalType(null));
    }
  };

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <motion.img
        src={selectedImg}
        alt='Enlarged pic'
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      /> */}
      {children}
    </motion.div>
  );
};

export default Modal;
