import React from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { setModalType } from '../../redux/modal/modal.actions';

import './modal.styles.scss';

const Modal = ({ children, setModalType }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setModalType(null);
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

const mapDispatchToProps = (dispatch) => ({
  setModalType: (modal) => dispatch(setModalType(modal)),
});

export default connect(null, mapDispatchToProps)(Modal);
