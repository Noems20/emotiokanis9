import React, { useState, useEffect } from 'react';

import {
  Grid,
  HeroContainer,
  ImageContainer,
  Image,
  Title,
  TitleColor,
  TitleContainer,
  Slides,
  Dot,
} from './hero2.styles';

import dog3 from './images/dog1.png';
import dog2 from './images/dog3.png';
import dog1 from './images/dog4.png';
import dog4 from './images/dog5.png';

const Hero = () => {
  const [slide, setSlide] = useState('slide1');
  const [index, setIndex] = useState(1);

  const titleSwitch = () => {
    switch (slide) {
      case 'slide1':
        return (
          <Title className='animate__animated animate__rotateInUpRight'>
            Mascota
            <br /> <TitleColor>Feliz</TitleColor> <br />
            Dueño <TitleColor>Feliz</TitleColor>
          </Title>
        );
      case 'slide2':
        return (
          <Title className='animate__animated animate__jackInTheBox'>
            La <TitleColor>Mejor</TitleColor> <br />
            Clínica
            <br /> <TitleColor>Veterinaria</TitleColor>
          </Title>
        );
      case 'slide3':
        return (
          <Title className='animate__animated animate__zoomInDown'>
            Mascota
            <br /> <TitleColor>Feliz</TitleColor> <br />
            Dueño <TitleColor>Feliz</TitleColor>
          </Title>
        );
      case 'slide4':
        return (
          <Title className='animate__animated animate__fadeInRight'>
            Mascota
            <br /> <TitleColor>Feliz</TitleColor> <br />
            Dueño <TitleColor>Feliz</TitleColor>
          </Title>
        );
      default:
        return (
          <Title className='animate__animated animate__rotateInUpRight'>
            Mascota
            <br /> <TitleColor>Feliz</TitleColor> <br />
            Dueño <TitleColor>Feliz</TitleColor>
          </Title>
        );
    }
  };

  const handleSlideChange = (slide) => {
    if (slide === 'slide1') {
      setSlide('slide1');
      setIndex(1);
    } else if (slide === 'slide2') {
      setSlide('slide2');
      setIndex(2);
    } else if (slide === 'slide3') {
      setSlide('slide3');
      setIndex(3);
    } else if (slide === 'slide4') {
      setSlide('slide4');
      setIndex(4);
    }
  };

  useEffect(() => {
    const interval = setInterval(function () {
      // method to be executed;

      if (index === 1) {
        setSlide('slide1');
      } else if (index === 2) {
        setSlide('slide2');
      } else if (index === 3) {
        setSlide('slide3');
      } else if (index === 4) {
        setSlide('slide4');
      }

      if (index + 1 === 5) {
        setIndex(1);
      } else {
        setIndex(index + 1);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <Grid>
      <HeroContainer>
        <ImageContainer>
          <Image
            src={dog1}
            slide='slide1'
            currentSlide={slide}
            className='animate__animated animate__fadeInLeft'
          />
          <Image
            src={dog2}
            slide='slide2'
            currentSlide={slide}
            className='animate__animated animate__zoomIn'
          />
          <Image
            src={dog3}
            slide='slide3'
            currentSlide={slide}
            className='animate__animated animate__rollIn'
          />
          <Image
            src={dog4}
            slide='slide4'
            currentSlide={slide}
            className='animate__animated animate__backInLeft'
          />
        </ImageContainer>
        <TitleContainer>{titleSwitch()}</TitleContainer>
        <Slides>
          <Dot
            onClick={() => handleSlideChange('slide1')}
            className={slide === 'slide1' ? 'selected' : ''}
          />
          <Dot
            onClick={() => handleSlideChange('slide2')}
            className={slide === 'slide2' ? 'selected' : ''}
          />
          <Dot
            onClick={() => handleSlideChange('slide3')}
            className={slide === 'slide3' ? 'selected' : ''}
          />
          <Dot
            onClick={() => handleSlideChange('slide4')}
            className={slide === 'slide4' ? 'selected' : ''}
          />
        </Slides>
      </HeroContainer>
    </Grid>
  );
};

export default Hero;
