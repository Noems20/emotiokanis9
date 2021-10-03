import React from 'react';

// REDUX
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modalActions';

// STYLES
import { Backdrop } from './modal.styles';

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      dispatch(setModalType(null));
    }
  };

  return (
    <Backdrop
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
    </Backdrop>
  );
};

export default Modal;
