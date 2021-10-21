import styled from 'styled-components';
import tokens from '../../tokens';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: grid;
  align-content: start;
`;

export const SignUpTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 2.5rem;

  @media only screen and (max-width: 430px) {
    font-size: 3rem;
  }
`;

export const SignUpSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 1rem;
  margin-bottom: 3rem;
  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;

export const FormContainer = styled.form`
  display: grid;
  grid-gap: 3rem;
`;

export const ButtonsContainer = styled.div`
  width: ${({ loading }) => (loading === 'true' ? 'auto' : '100%')};
  margin: 0 auto;

  & button {
    width: 100%;

    &:hover {
      background-color: ${({ loading }) =>
        loading === 'true' ? 'var(--color-primary)' : '#fff'};
    }
  }
`;

// -----------------------------------------------
// EMAIL MESSAGE
// ------------------------------------------------
export const EmailContainer = styled(motion.div)`
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
`;

export const Text = styled.p`
  text-align: center;
  font-size: 2rem;
  justify-self: center;
`;
