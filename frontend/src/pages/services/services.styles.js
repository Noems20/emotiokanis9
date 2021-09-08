import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Grid = styled(motion.div)`
  display: grid;

  grid-template-rows:
    calc(60vh - 8rem) 40vh calc(60vh - 8rem) 40vh calc(60vh - 8rem)
    40vh calc(60vh - 8rem) 40vh;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];

  @media only screen and (max-width: 910px) {
    grid-template-rows:
      calc(60vh - 8rem) max-content calc(60vh - 8rem) max-content calc(
        60vh - 8rem
      )
      max-content calc(60vh - 8rem) max-content;
  }
`;
