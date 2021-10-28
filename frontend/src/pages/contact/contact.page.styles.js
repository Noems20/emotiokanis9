import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component';
import { motion } from 'framer-motion';
import { PageGrid } from '../../components/general.styles';
import tokens from '../../tokens';
import img from './images/img1.jpg';

export const Grid = styled(PageGrid)`
  grid-template-rows: repeat(2, calc(100vh - 8rem)) max-content;

  @media only screen and (max-width: 1200px) {
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

  @media only screen and (max-width: 700px) {
    grid-column: full-start / full-end;
  }
`;

export const Map = styled.div`
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
`;

export const PopupLabel = styled.h2`
  color: var(--color-primary);
  @media only screen and (max-width: 430px) {
    font-size: 1.8rem;
  }
`;
export const PopupDescription = styled.p`
  font-size: 1.3rem;

  @media only screen and (max-width: 430px) {
    font-size: 1.6rem;
  }
`;

export const MapTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 2.5rem;
  letter-spacing: 1px;
  color: var(--color-primary);
  text-transform: uppercase;
  text-align: center;
  margin: 0 2rem 3rem 2rem;

  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-gap: 1.5rem;
  align-items: center;
  font-style: 1.6rem;

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

export const Container = styled(motion.div)`
  grid-column: col-start 3 / col-end 6;
  padding: 2rem;
  margin: auto 0;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);

  display: grid;
  grid-gap: 3rem;
  align-content: center;

  & svg {
    justify-self: center;
    font-size: 10rem;
    color: var(--color-primary-light);
  }

  @media only screen and (max-width: 1200px) {
    margin: 6rem 0;
  }

  @media only screen and (max-width: 650px) {
    grid-column: center-start / center-end;
  }

  @media only screen and (max-width: 500px) {
    grid-gap: 5rem;
  }
`;

export const Text = styled.p`
  text-align: center;
  font-size: 2rem;
  justify-self: center;

  @media only screen and (max-width: 430px) {
    font-size: 2.3rem;
  }
`;
