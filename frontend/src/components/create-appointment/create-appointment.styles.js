import styled from 'styled-components';
import { motion } from 'framer-motion';

import CustomButton from '../custom-button/custom-button.component';
import { TitleSm } from '../general.styles';

export const LoaderContainer = styled.div`
  margin: 30rem 0;
  @media only screen and (max-width: 700px) {
    margin: 25rem 0;
  }
`;

export const Container = styled(motion.div)`
  grid-column: center-start / center-end;
  border-radius: 5px;
  margin: auto 0;
  overflow: hidden;

  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);

  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  @media only screen and (min-height: 800px) and (max-width: 1280px) {
    margin: 10vh 0px;
  }

  @media only screen and (min-height: 800px) and (max-width: 430px) {
    margin: 4rem 0;
  }
  @media only screen and (max-width: 1200px) {
    margin: 4rem 0;
  }

  @media only screen and (max-width: 600px) {
    grid-column: full-start / full-end;
  }
`;

export const Title = styled(TitleSm)``;

export const FormContainer = styled.form`
  display: grid;
  grid-gap: 3rem;
  padding: 3rem;
  /* align-content: space-evenly; */

  @media only screen and (max-width: 430px) {
    grid-gap: 5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const Button = styled(CustomButton)`
  letter-spacing: 2px;
  font-weight: 300;
  text-transform: uppercase;
`;
