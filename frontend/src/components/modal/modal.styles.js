import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 12;

  display: grid;

  grid-template-columns: 80vw;
  align-content: center;
  justify-content: center;
  justify-items: center;

  & img {
    display: block;

    max-width: 100%;
    max-height: 90vh;
    margin: 0 auto;
    // box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
    border: 3px solid white;
    border-radius: 5px;
    z-index: 10;
  }
`;
