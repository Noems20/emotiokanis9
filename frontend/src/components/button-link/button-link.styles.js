import styled from 'styled-components';
import tokens from '../../tokens';
import { Link } from 'react-router-dom';

// ------------------ PRIMARY BUTTON STYLES ------------

export const CustomButtonContainer = styled(Link)`
  display: inline-block;
  color: #fff;
  background-color: var(--color-primary);
  border: 0.2px solid var(--color-primary);
  font-family: ${tokens.fontPrimary};
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 100px;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease;

  &:hover {
    border: 0.2px solid var(--color-primary);
    background-color: #fff;
    color: var(--color-primary);
    transition-property: color, background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-primary);
  }

  @media only screen and (max-width: 430px) {
    font-size: 2.2rem;
  }
`;

export const ChildrenContainer = styled.div`
  height: 2.4rem;
  display: grid;
  align-content: center;
`;
