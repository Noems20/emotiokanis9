import styled from 'styled-components';
import tokens from '../../tokens';

export const Container = styled.div`
  display: grid;
  align-content: start;
`;

export const SignInTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 2.5rem;

  @media only screen and (max-width: 430px) {
    font-size: 3rem;
  }
`;

export const SignInSubtitle = styled.h3`
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
  /* grid-template-rows: repeat(3, 1fr); */
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;
