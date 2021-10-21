import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  grid-column: col-start 3 / col-end 6;
  padding: 2rem;
  margin: auto 0;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);

  display: grid;
  grid-gap: 3rem;
  align-content: center;

  & svg {
    justify-self: center;
    font-size: 10rem;
    color: var(--color-primary-light);
  }

  @media only screen and (max-width: 1200px) {
    margin: 6rem 0;
    min-height: 52vh;
  }

  @media only screen and (max-width: 650px) {
    grid-column: center-start / center-end;
  }

  /* @media only screen and (max-width: 550px) {
    grid-column: full-start / full-end;
  } */

  @media only screen and (max-width: 500px) {
    grid-gap: 5rem;
  }
`;

export const Text = styled.p`
  text-align: center;
  font-size: 2rem;
  justify-self: center;
`;
