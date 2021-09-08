import styled from 'styled-components';
import tokens from '../../tokens';
import { motion } from 'framer-motion';

export const Grid = styled(motion.div)`
  overflow-x: hidden;
  display: grid;
  grid-template-rows:
    calc(100vh - 8rem) max-content calc(100vh - 8rem) max-content calc(
      100vh - 8rem
    )
    max-content;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];

  @media only screen and (max-width: 800px) {
    grid-template-rows:
      calc(100vh - 5.5rem) max-content calc(100vh - 5.5rem) max-content calc(
        100vh - 5.5rem
      )
      max-content;
  }
  /* @media only screen and (max-width: 600px) {
    grid-template-rows: calc(100vh - 5.5rem) max-content 100vh max-content 100vh max-content;
  } */
`;

export const SectionHeading = styled.div`
  background-color: var(--color-primary-light);
  grid-column: full-start / full-end;

  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  display: grid;
  justify-content: center;
  align-content: center;
`;

export const SectionTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-size: 12rem;
  text-align: center;
  color: var(--color-primary-dark);
  font-weight: 700;

  margin: 0 2rem;

  & span {
    font-family: ${tokens.fontHand};
    color: #000;
  }

  @media only screen and (max-width: 1000px) {
    font-size: 10rem;
  }
  @media only screen and (max-width: 800px) {
    font-size: 8rem;
  }
  @media only screen and (max-width: 600px) {
    font-size: 6rem;
  }
`;

export const SectionDescription = styled.div`
  grid-column: center-start / center-end;

  display: grid;
  grid-template-rows: min-content;
  align-content: center;
  justify-items: center;

  margin: 10rem 0;

  grid-gap: 3rem;
`;

export const Logo = styled.img`
  height: 25rem;
`;

export const SectionText = styled.p`
  font-size: 2rem;
  font-weight: 300;
  text-align: center;
`;

export const Gallery = styled.div`
  grid-column: full-start / full-end;
  padding: 7rem 3rem;
`;
