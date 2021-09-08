import tokens from '../../tokens';

import { motion } from 'framer-motion';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  margin: 2rem 1rem;
  padding: 2rem;
  border-radius: 10px;

  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  justify-content: center;
`;

export const CardHeading = styled.div`
  /* margin: 2rem 2rem 0 2rem; */
  padding-bottom: 2rem;
  border-bottom: 3px solid var(--color-primary);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`;
export const CardHeadingTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  text-transform: uppercase;
  color: var(--color-primary);

  margin-right: 3rem;

  justify-self: start;
`;
export const CardHeadingDate = styled.h2`
  font-family: ${tokens.fontDisplay};
  /* font-weight: 300; */
  text-align: center;
  letter-spacing: 1px;
  color: #fff;

  padding: 0.5rem;
  border-radius: 10px;
  background-color: var(--color-primary);
`;

export const CardIcons = styled.div`
  justify-self: end;
  cursor: pointer;

  grid-column: 3 / 4;
`;

export const CloseIcon = styled(AiOutlineClose)`
  transform: scale(1.2);
  fill: #f94415;
  border-radius: 100%;
  padding: 2px;
  transition: all 0.3s ease-in-out;

  &:hover {
    fill: #fff;
    background-color: #f94415;
    transition: all 0.3s ease-in-out;
  }

  @media only screen and (max-width: 430px) {
    transform: scale(1.4);
  }
`;

export const EditIcon = styled(AiOutlineEdit)`
  transform: scale(1.2);
  fill: var(--color-primary);
  border-radius: 100%;
  padding: 2px;
  margin-right: 1.2rem;

  transition: all 0.3s ease-in-out;

  &:hover {
    fill: #fff;
    background-color: var(--color-primary-light);

    transition: all 0.3s ease-in-out;
  }

  @media only screen and (max-width: 430px) {
    /* margin-right: 1.7rem; */
    transform: scale(1.4);
  }
`;

export const FinishedText = styled.h2`
  /* justify-self: end; */
  margin-left: auto;
  color: #f94415;
`;

export const CardBody = styled.div`
  margin-top: 2rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  align-items: center;
`;

export const CardBodyTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  text-transform: uppercase;
  color: var(--color-primary);

  margin-bottom: 1rem;
`;
export const CardBodyDescription = styled.p`
  font-size: 1.6rem;

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;
