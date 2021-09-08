import React from 'react';

import {
  HeroContainer,
  HeroBackground,
  HeroImage,
  HeroContent,
  HeroH1,
  HeroP,
  HeroButton,
} from './hero.styles';

import image from './images/hero6.jpg';

const Hero = () => {
  return (
    <HeroContainer>
      <HeroBackground>
        <HeroImage src={image} alt='Fondo de perro' />
      </HeroBackground>
      <HeroContent>
        <HeroH1>Mascota Feliz Dueño Feliz</HeroH1>
        <HeroP>Con 15 años de experiencia</HeroP>
        <HeroP large={true}>
          ESCUELA CANINA DE APRENDIZAJE CONGNITIVO EMOCIONAL
        </HeroP>
        <HeroButton primary>Empieza ya</HeroButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
