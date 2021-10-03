import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

// REDUX
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modalActions';

// STYLES
import {
  CardContainer,
  CardImage,
  CardDescription,
  CardTitle,
  CardText,
} from './gallery-card.styles';

// import image from '../../pages/about/images/gallery/img1.jpg';

const GalleryCard = ({ title, description, url, alt, setSelectedImg }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleClick = () => {
    setSelectedImg(url);
    dispatch(setModalType('image'));
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
    </>
  );
};

export default GalleryCard;
