import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import {
  CardContainer,
  CardImage,
  CardDescription,
  CardTitle,
  CardText,
} from './gallery-card.styles';
import { connect } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';

// import image from '../../pages/about/images/gallery/img1.jpg';

const GalleryCard = ({
  title,
  description,
  url,
  alt,
  setSelectedImg,
  setModalType,
}) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleClick = () => {
    setSelectedImg(url);
    setModalType('image');
  };

  return (
    <>
      <CardContainer data-aos='zoom-in-up' onClick={handleClick}>
        <CardImage src={url} alt={alt} />
        <CardDescription>
          <CardTitle>{title.toUpperCase()}</CardTitle>
          <CardText>{description}</CardText>
        </CardDescription>
      </CardContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setModalType: (modal) => dispatch(setModalType(modal)),
});

export default connect(null, mapDispatchToProps)(GalleryCard);
