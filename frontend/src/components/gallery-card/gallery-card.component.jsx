import React, { useState, useEffect } from 'react';
import WOW from 'wowjs';
import { AnimatePresence } from 'framer-motion';

// COMPONENTS
import Modal from '../modal/modal.component';

// STYLES
import {
  CardContainer,
  CardImage,
  CardDescription,
  CardTitle,
  CardDate,
  CardText,
} from './gallery-card.styles';

const GalleryCard = ({ name, description, date, image }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let dateFormated = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // ------------------- USE EFFECT ---------------
  useEffect(() => {
    new WOW.WOW({
      live: false,
      animateClass: 'animate__animated',
    }).init();
  }, []);

  // ------------------ HANDLERS ------------------
  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CardContainer
        // data-aos='zoom-in-up'
        className='wow animate__animated animate__backInUp'
        data-wow-duration='1s'
        onClick={handleClick}
        // whileHover={{
        //   boxShadow: '0px 0px 11px 1px rgba(0, 0, 0, 0.32) ',
        //   scale: 1.03,
        // }}
        // transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <CardImage src={`/img/awards/${image}`} alt='Imagen de premio' />
        <CardDescription>
          <CardTitle>{name}</CardTitle>
          <CardDate>
            {dateFormated.toLocaleDateString('es-ES', options)}
          </CardDate>
          <CardText>{description}</CardText>
        </CardDescription>
      </CardContainer>
      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={handleClose}>
            <img src={`/img/awards/${image}`} alt='Imagen agrandada' />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryCard;
