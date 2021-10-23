import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component';
import { TitleSm } from '../../components/general.styles';
import tokens from '../../tokens';

export const Container = styled.div`
  height: calc(100vh - 8rem);
  margin: 0 auto;
  width: 60%;

  display: grid;
  grid-gap: 2rem;
  justify-content: center;
  justify-items: center;
  align-content: center;

  @media only screen and (max-width: 1200px) {
    height: calc(100vh - 5.7rem);
    width: 70%;
  }

  @media only screen and (max-width: 800px) {
    height: calc(100vh - 5.5rem);
  }

  @media only screen and (max-width: 430px) {
    width: 80%;
  }
`;

export const Title = styled(TitleSm)`
  font-size: 15rem;
  margin-top: -4rem;

  /* font-family: ${tokens.fontPrimary}; */
  /* color: var(--color-primary); */
`;
export const Subtitle = styled.h2`
  font-size: 5rem;
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  text-align: center;
  margin-top: -3rem;
`;

export const Text = styled.p`
  font-size: 2rem;
  text-align: center;

  @media only screen and (max-width: 430px) {
    font-size: 2.5rem;
  }
`;

export const Button = styled(CustomButton)`
  font-size: 2.5rem;
  text-decoration: none;
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  padding: 1rem 2rem;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  color: #fff;
  background-color: var(--color-primary);
  border: 0.2px solid var(--color-primary);

  &:hover {
    transition-property: color, background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    border: 0.2px solid var(--color-primary);
    background-color: #fff;
    color: var(--color-primary);
  }
`;
