import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Aos from 'aos';
import 'aos/dist/aos.css';

// COMPONENTS
import Modal from '../modal/modal.component';

// STYLES
import {
  CardContainer,
  CardImage,
  CardDescription,
  CardTitle,
  CardText,
} from './gallery-card.styles';

const GalleryCard = ({ title, description, url, alt }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // ------------------- USE EFFECT ---------------
  useEffect(() => {
    Aos.init({ duration: 1000 });
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
      <CardContainer data-aos='zoom-in-up' onClick={handleClick}>
        <CardImage src={url} alt={alt} />
        <CardDescription>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
        </CardDescription>
      </CardContainer>
      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={handleClose}>
            <img src={url} alt='Imagen agrandada' />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryCard;
