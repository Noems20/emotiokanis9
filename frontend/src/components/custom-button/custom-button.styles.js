import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import tokens from '../../tokens';

// ------------------ PRIMARY BUTTON STYLES ------------
const primaryButtonStyles = css`
  color: #fff;
  background-color: var(--color-primary);
  border: 0.2px solid var(--color-primary);

  &:hover {
    border: 0.2px solid var(--color-primary);
    background-color: #fff;
    color: var(--color-primary);
  }

  &:disabled {
    background-color: var(--color-primary);
  }
`;

// ------------------ SECONDARY BUTTON STYLES ------------
const secondaryButtonStyles = css`
  border: none;
  color: var(--color-primary);
  background-color: #fff;

  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }

  &:disabled {
    background-color: var(--color-primary);
  }
`;

// ------------------ DANGER BUTTON STYLES ------------
const dangerButtonStyles = css`
  color: #fff;
  background-color: #f94415;
  border: 0.2px solid #f94415;

  &:hover {
    background-color: #e03e14;
    color: #fff;
    border: 0.2px solid #e03e14;
  }

  &:disabled {
    background-color: #f94415;
  }
`;

// ------------------ GOOGLE BUTTON STYLES ------------
const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: 0.2px solid #4285f4;
  padding: 0;
  max-height: 4.4rem;

  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  &:hover {
    border: 0.2px solid var(--color-primary);
    background-color: #fff;
    color: var(--color-primary);
  }

  & svg {
    background-color: white;
    border-radius: 50%;
    padding: 1px;
    height: 4rem;
    width: 4rem;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  } else if (props.primary) {
    return primaryButtonStyles;
  } else if (props.danger) {
    return dangerButtonStyles;
  } else {
    return secondaryButtonStyles;
  }
};

export const CustomButtonContainer = styled(motion.button)`
  font-family: ${tokens.fontPrimary};
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  padding: 1rem 2rem;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease;

  &:hover {
    transition-property: color, background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media screen and (min-width: 992px) {
    &:active {
      transform: translateY(2px);
    }
  }

  ${getButtonStyles}
`;

export const ChildrenContainer = styled.div`
  margin-left: -2rem;
`;
export const GoogleContainer = styled.div`
  display: grid;
  justify-content: start;
  justify-items: center;
`;
