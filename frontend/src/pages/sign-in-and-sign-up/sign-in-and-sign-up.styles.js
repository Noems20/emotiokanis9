import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];

  grid-template-rows: calc(100vh - 8rem);

  @media only screen and (max-width: 1024px) {
    grid-template-rows: max-content;
  }
`;

export const Container = styled.div`
  grid-column: center-start / center-end;
  /* background: red; */

  display: grid;
  grid-gap: 10rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.7fr;
  align-content: center;

  @media only screen and (max-width: 1024px) {
    margin: 5rem 0;

    grid-gap: 4rem;
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content;
  }

  @media only screen and (width: 800px), only screen and (height: 1280px) {
    margin-bottom: 10rem;
  }

  @media only screen and (width: 1024px), only screen and (height: 1366px) {
    margin-bottom: 10rem;
  }
`;
