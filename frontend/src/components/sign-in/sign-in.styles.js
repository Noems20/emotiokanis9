import styled from 'styled-components';
import tokens from '../../tokens';
import Alert from '../alert/alert.component';
import { Link } from 'react-router-dom';

export const Message = styled(Alert)`
  margin-bottom: 4rem;
  padding-top: 1.5rem;
  width: 100%;
  max-width: 100%;

  /* & div h1 {
    font-size: 1.5rem;
  }
  & div p {
    font-size: 1.6rem;
  } */
`;

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

export const ForgotPasswordLink = styled(Link)`
  font-size: 1.5rem;
  color: var(--color-primary);
  text-decoration: none;
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
