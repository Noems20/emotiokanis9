import styled from 'styled-components';
import { motion } from 'framer-motion';

import CustomButton from '../custom-button/custom-button.component';
import { TitleSm } from '../general.styles';

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
    margin: 12vh 0px;
  }

  @media only screen and (max-width: 600px) {
    grid-column: full-start / full-end;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, max-content);
`;

export const Title = styled(TitleSm)``;

export const FormContainer = styled.form`
  display: grid;
  grid-gap: 2.5rem;
  /* align-content: space-evenly; */
`;

export const DateInputContainer = styled.div`
  justify-self: center;
  border-top: none;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  overflow: hidden;
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const Button = styled(CustomButton)`
  letter-spacing: 2px;
  text-transform: uppercase;
`;
