import styled, { css } from 'styled-components';
import tokens from '../../tokens';
import { motion } from 'framer-motion';

import { RiCloseLine } from 'react-icons/ri';

const errorColor = '#f94415';
const successColor = '#41d888';

const ErrorBackgroundColor = css`
  background-color: ${errorColor};
`;
const SuccessBackgroundColor = css`
  background-color: ${successColor};
`;
const ErrorColor = css`
  color: ${errorColor};
`;
const SuccessColor = css`
  color: ${successColor};
`;

const getBackgroundColor = (props) => {
  switch (props.type) {
    case 'error':
      return ErrorBackgroundColor;
    case 'success':
      return SuccessBackgroundColor;
    default:
      return ErrorBackgroundColor;
  }
};
const getColor = (props) => {
  switch (props.type) {
    case 'error':
      return ErrorColor;
    case 'success':
      return SuccessColor;
    default:
      return ErrorColor;
  }
};

export const Container = styled(motion.div)`
  border-radius: 10px;
  max-width: 55rem;
  padding-top: 2rem;

  display: grid;
  grid-template-columns: repeat(4, [col-start] 1fr [col-end]);
  grid-template-rows: 1fr 1fr 0.2fr;

  position: relative;

  ${getBackgroundColor}
`;

export const Icon = styled.div`
  grid-column: col-start 1 / col-end 1;
  grid-row: 1 / 3;

  display: grid;
  justify-content: center;

  & svg {
    margin-top: -0.4rem;
    color: #fff;
    font-size: 7rem;
  }
`;

export const AlertContent = styled.div`
  grid-column: col-start 2 / col-end 4;
  grid-row: 1 / 3;
`;
export const AlertTitle = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;

  @media only screen and (max-width: 430px) {
    font-size: 2.5rem;
  }
`;
export const AlertText = styled.p`
  font-family: ${tokens.fontDisplay};
  font-size: 1.6rem;
  font-weight: 300;
  color: #fff;

  margin-right: 4rem;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;

export const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;

  border: 1px solid #fff;
  border-radius: 7px;
  padding: 6px;
  margin-bottom: 2rem;
  transition: all 0.2s ease-in-out;
  background-color: #fff;

  ${getColor}
  &:hover {
    color: #fff;
    background-color: transparent;
    transition: all 0.2s ease-in-out;
  }

  &:active {
    transform: translateY(1px);
  }

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;

export const Decoration = styled.div`
  grid-column: col-start 1 / col-end 3;
  grid-row: 3 / 4;
  /* margin-top: 2rem; */
  border-radius: 0 0 0 10px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const CloseIcon = styled(RiCloseLine)`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  fill: #fff;
  transform: scale(2.5);

  @media only screen and (max-width: 430px) {
    transform: scale(4);
  }
`;
