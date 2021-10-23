import styled from 'styled-components';
import { motion } from 'framer-motion';
import tokens from '../../tokens';

export const CardContainer = styled(motion.div)`
  margin-bottom: 3rem;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.32);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.32);
  overflow: hidden;
  cursor: pointer;

  transition-property: box-shadow;
  transition-duration: 0.5s;
  transition-timing-function: ease;

  display: grid;
  grid-template-rows: repeat(2, min-content);

  &:hover {
    -webkit-box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.32);
    box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.32);
    transition-property: box-shadow;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  object-fit: fill;
  /* border-radius: 10px 10px 0 0; */
`;

export const CardDescription = styled.div`
  margin: 2rem;
  display: grid;
  align-items: center;
  grid-template-columns: 0.65fr 0.35fr;
  grid-column-gap: 3rem;
  grid-row-gap: 1rem;
`;

export const CardTitle = styled.h1`
  grid-column: 1/2;
  color: var(--color-primary);
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 2rem;

  @media only screen and (max-width: 430px) {
    font-size: 2.2rem;
  }
`;

export const CardDate = styled.h1`
  grid-column: 2/3;
  text-align: right;

  color: var(--color-grey-dark-3);
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 1.8rem;

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;

export const CardText = styled.p`
  grid-column: 1/3;
  font-size: 1.6rem;

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;
