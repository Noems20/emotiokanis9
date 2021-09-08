import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -1.4rem;
  font-size: 1.4rem;
  color: ${mainColor};

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;

export const GroupContainer = styled.div`
  position: relative;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputContainer = styled.input`
  background-color: white;
  color: ${subColor};
  font-size: 1.8rem;
  padding: 10px 10px 10px 5px;
  display: inline-block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  position: relative;
  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 430px) {
    font-size: 2.5rem;
  }
`;

export const MagicBox = styled.div`
  &::after,
  &::before {
    content: ' ';
    width: 0%;
    bottom: -2.5px;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: ease-in-out 0.5s all;
  }

  &::after {
    border-bottom: 3px solid var(--color-primary-light);
  }

  &:focus-within::after {
    width: 101%;
  }

  &:focus-within ~ label {
    ${shrinkLabelStyles}
  }
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
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
