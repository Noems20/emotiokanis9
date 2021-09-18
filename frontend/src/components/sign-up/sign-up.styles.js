import styled from 'styled-components';
import tokens from '../../tokens';

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
  width: ${({ loading }) => (loading ? 'auto' : '100%')};
  margin: 0 auto;
  /* max-width: ${({ loading }) => (loading ? '45px' : '100%')}; */
  /* margin: ${({ loading }) => (loading ? '0 auto' : '0')}; */
  /* transition: max-width 5s ease-out; */

  & button {
    width: 100%;
    /* max-width: ${({ loading }) => (loading ? '45px' : '100%')}; */

    &:hover {
      background-color: ${({ loading }) =>
        loading ? 'var(--color-primary)' : '#fff'};
    }
  }
`;
