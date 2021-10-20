import styled from 'styled-components';
import { motion } from 'framer-motion';
import tokens from '../../tokens';
import { TitleSm } from '../general.styles';
import CustomButton from '../custom-button/custom-button.component';

export const LoaderContainer = styled.div`
  margin: 61rem 0;
  @media only screen and (max-width: 700px) {
    margin: 75rem 0;
  }
`;

export const Container = styled(motion.div)`
  grid-column: center-start / center-end;
  border-radius: 5px;
  margin: auto 0;
  overflow: hidden;

  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 1200px) {
    margin: 4rem 0;
  }

  @media only screen and (max-width: 600px) {
    grid-column: full-start / full-end;
  }
`;

// ---------------------------------------------
// CONTENT
// ---------------------------------------------

export const AppointmentContent = styled.div`
  padding: 3rem;
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: max-content 1fr;

  @media only screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceImage = styled.img`
  justify-self: center;
  align-self: center;
  height: 27rem;
  width: 27rem;
  padding: 2.5px;
  border-radius: 50%;
  border: 5px solid var(--color-primary);
  grid-column: 2 / 3;
  grid-row: 2 / 4;

  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);

  @media only screen and (min-width: 1900px) {
    height: 29rem;
    width: 29rem;
  }

  @media only screen and (max-width: 960px) {
    grid-column: auto / auto;
    grid-row: auto / auto;
  }
`;

export const AppointmentTitle = styled(TitleSm)`
  grid-column: 1 / 3;
  @media only screen and (max-width: 960px) {
    text-align: center;
    grid-column: auto / auto;
  }
`;

export const SubTitle = styled.span`
  font-size: 2.5rem;
  font-family: ${tokens.fontPrimary};
  color: var(--color-primary);
`;

export const ServiceTitle = styled.h1`
  font-size: 3rem;
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  grid-column: 1 / 2;

  @media only screen and (min-width: 1900px) {
    font-size: 3.5rem;
  }

  @media only screen and (max-width: 960px) {
    text-align: center;
    grid-column: auto / auto;
  }
`;
export const AppointmentDate = styled.p`
  font-size: 2rem;
  font-family: ${tokens.fontPrimary};
  color: var(--color-grey-dark-3);
  font-weight: 300;
  grid-column: 1 / 2;

  @media only screen and (min-width: 1900px) {
    font-size: 2.5rem;
  }

  @media only screen and (max-width: 960px) {
    text-align: center;
    grid-column: auto / auto;
  }
`;
export const Description = styled.p`
  font-size: 2rem;
  font-weight: 400;
  grid-column: 1 / 3;

  @media only screen and (min-width: 1900px) {
    font-size: 2.5rem;
  }

  @media only screen and (max-width: 960px) {
    text-align: center;
    grid-column: auto / auto;
  }
`;

// -----------------------------------------
// MODAL
// -----------------------------------------

export const Title = styled(TitleSm)`
  justify-self: start;
  font-size: 2.6rem;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    justify-self: center;
  }
`;

export const FormContainer = styled(motion.form)`
  width: 60vw;
  height: auto;
  padding: 3rem;
  border-radius: 8px;
  background-color: #fff;

  display: grid;
  grid-gap: 4rem;

  @media only screen and (max-width: 1400px) {
    width: 75vw;
  }
  @media only screen and (max-width: 1200px) {
    width: 80vw;
    padding: 3rem;
  }
  @media only screen and (max-width: 600px) {
    width: 90vw;
    /* height: 90vh; */
  }
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;

  grid-template-columns: max-content max-content;

  @media only screen and (max-width: 960px) {
    justify-self: center;
  }
`;

export const Button = styled(CustomButton)`
  /* letter-spacing: 2px; */
  text-transform: uppercase;
`;
