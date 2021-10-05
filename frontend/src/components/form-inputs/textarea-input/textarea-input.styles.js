import styled, { css } from 'styled-components';
import tokens from '../../../tokens';

const subColor = 'grey';
// const mainColor = 'black';
const errorColor = '#ff3333';

const shrinkLabelStyles = css`
  top: -2rem;
  font-size: 1.4rem;

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
    top: -3rem;
  }
`;

export const GroupContainer = styled.div`
  position: relative;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;
export const InputGroup = styled.div`
  position: relative;

  &:focus-within ~ label {
    ${shrinkLabelStyles}
  }
`;

export const FormInputContainer = styled.textarea`
  background-color: white;
  color: ${subColor};
  font-size: 1.7rem;
  font-family: ${tokens.fontDisplay};
  font-weight: 400;
  margin-bottom: 2px; // Put active line in middle of normal line
  padding: 10px 10px 10px 5px;
  display: inline-block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: ${({ error }) =>
    error ? `1px solid ${errorColor}` : `1px solid ${subColor}`};

  resize: vertical;

  -webkit-text-fill-color: ${subColor};

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 430px) {
    font-size: 2.3rem;
  }
`;

export const MagicBox = styled.div`
  &::after,
  &::before {
    content: ' ';
    width: 0%;
    bottom: 2px;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: ease-in-out 0.5s width;
  }

  &::after {
    border-bottom: ${({ error }) =>
      error
        ? `3px solid ${errorColor}`
        : '3px solid var(--color-primary-light)'};
  }

  &:focus-within::after {
    width: 101%;
  }

  &.active {
    &::after {
      width: 101%;
    }
  }
`;

export const FormInputLabel = styled.label`
  color: ${({ error }) => (error ? `${errorColor}` : `${subColor}`)};
  font-size: 1.6rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }

  @media only screen and (max-width: 700px) {
    font-size: 2rem;
  }
`;

export const ErrorText = styled.p`
  color: ${errorColor};
  font-size: 1.4rem;
  margin-left: 5px;
  margin-top: 1rem;

  @media only screen and (max-width: 700px) {
    font-size: 1.6rem;
  }
`;
