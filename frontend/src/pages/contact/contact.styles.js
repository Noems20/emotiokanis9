import { motion } from 'framer-motion';
import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component';
import tokens from '../../tokens';
import img from './images/img1.jpg';

export const Grid = styled(motion.div)`
  display: grid;

  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];

  grid-template-rows: repeat(2, calc(100vh - 8rem)) max-content;

  @media only screen and (max-width: 1200px) {
    grid-template-rows: calc(100vh - 5.7rem) max-content max-content;
  }
  @media only screen and (max-width: 992px) {
    grid-template-rows: calc(100vh - 5.7rem) max-content max-content;
  }

  @media only screen and (max-width: 800px) {
    grid-template-rows: calc(100vh - 5.5rem) max-content max-content;
  }
`;

export const Heading = styled.div`
  grid-column: full-start / full-end;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(${img});
  background-size: cover;
  background-position: center;
  /* background-attachment: fixed; */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  display: grid;
  grid-template-columns: min-content;
  align-content: center;
  align-items: start;

  @media only screen and (max-width: 1230px) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(${img});
    justify-content: center;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-size: 10rem;
  color: white;
  margin-left: 5rem;

  @media only screen and (min-width: 1750px) {
    font-size: 15rem;
  }
  @media only screen and (max-width: 1230px) {
    text-align: center;
    margin-left: 0;
  }

  @media only screen and (max-width: 400px) {
    font-size: 9rem;
  }
`;

export const MapContainer = styled.div`
  grid-column: center-start / center-end;
  margin-bottom: 5rem;

  display: grid;
  /* grid-template-rows: 1fr; */
  align-content: center;
  /* align-items: center; */

  & iframe {
    -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.73);
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.73);
    border: 5px solid var(--color-primary);
    width: 100%;
    min-height: 350px;
    max-height: 700px;
    border-radius: 5px;

    @media only screen and (max-width: 700px) {
      border: none;
    }
  }

  @media only screen and (max-width: 700px) {
    grid-column: full-start / full-end;
  }
`;

export const MapTitle = styled.h1`
  /* font-family: ${tokens.fontPrimary}; */
  font-size: 2.5rem;
  color: var(--color-primary);
  text-transform: uppercase;
  text-align: center;
  margin: 0 2rem 3rem 2rem;

  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-gap: 1.5rem;
  align-items: center;
  font-style: 1.6rem;
  color: $color-grey-light-2;

  &::before,
  &::after {
    content: '';
    height: 1px;
    display: block;
    background-color: currentColor;
  }
`;

export const Button = styled(CustomButton)`
  justify-self: start;
`;
