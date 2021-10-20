import styled from 'styled-components';
import { motion } from 'framer-motion';
import tokens from '../../tokens';
import { TitleSm } from '../general.styles';
import CustomButton from '../custom-button/custom-button.component';

export const LoaderContainer = styled.div`
  margin: 20rem 0;
  @media only screen and (max-width: 700px) {
    margin: 25rem 0;
  }
`;

export const Container = styled(motion.div)`
  grid-column: center-start / center-end;
  border-radius: 5px;
  margin: 4rem 0;

  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);

  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: 0.95fr;
  grid-template-rows: 0.95fr;

  @media only screen and (max-width: 1200px) {
    padding: 3rem;
  }

  @media only screen and (min-height: 800px) and (max-width: 1280px) {
    margin: 10vh 0px;
  }

  @media only screen and (min-height: 800px) and (max-width: 430px) {
    margin: 4rem 0;
  }

  @media only screen and (max-width: 600px) {
    grid-column: full-start / full-end;
  }
`;

export const ContentWrapper = styled.div`
  /* display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, max-content); */
`;

// ---------------------------------------------
// CONTENT
// ---------------------------------------------

export const AppointmentContent = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: max-content 1fr;
  margin: 0 1rem;
`;

export const AppointmentTitle = styled(TitleSm)`
  grid-column: 1 / 3;
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
`;
export const AppointmentDate = styled.p`
  font-size: 2rem;
  font-family: ${tokens.fontPrimary};
  color: grey;
  font-weight: 300;
  grid-column: 1 / 2;
`;
export const Description = styled.p`
  font-size: 2rem;
  font-weight: 400;
  grid-column: 1 / 3;
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
    margin-bottom: 1rem;
  }
`;

export const FormContainer = styled(motion.div)`
  width: 60vw;
  padding: 5rem;
  border-radius: 8px;
  background-color: #fff;

  display: grid;
  grid-gap: 3rem;

  @media only screen and (max-width: 1400px) {
    width: 75vw;
  }
  @media only screen and (max-width: 1200px) {
    width: 80vw;
    padding: 3rem;
    grid-gap: 1rem;
  }
  @media only screen and (max-width: 600px) {
    width: 90vw;
    /* height: 90vh; */
  }
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  justify-items: center;

  grid-template-columns: max-content max-content;
`;

export const Button = styled(CustomButton)`
  /* letter-spacing: 2px; */
  text-transform: uppercase;
`;
