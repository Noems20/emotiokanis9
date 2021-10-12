import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TabSubContainer } from '../../general.styles.js';

// COMPONENTS
import TabLoader from '../../loaders/tab-loader/tab-loader.component';

import { TitleSm } from '../../general.styles';

export const SettingsContainer = styled(motion.div)`
  height: 100%;
  overflow: auto;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
`;

export const ServicesSettings = styled(TabSubContainer)`
  height: 100%;
  padding: 0 8rem;
  position: relative;

  @media only screen and (max-width: 1200px) {
    & h1 {
      justify-self: center;
    }

    padding-bottom: ${({ loading }) => (loading === 'true' ? '20rem' : '0')};
  }
  @media only screen and (max-width: 900px) {
    padding: 0 10rem;
    padding-bottom: ${({ loading }) => (loading === 'true' ? '20rem' : '0')};
  }
  @media only screen and (max-width: 700px) {
    padding: 0 8rem;
    padding-bottom: ${({ loading }) => (loading === 'true' ? '20rem' : '0')};
  }
  @media only screen and (max-width: 600px) {
    padding: 0 5rem;
    padding-bottom: ${({ loading }) => (loading === 'true' ? '20rem' : '0')};
  }
  @media only screen and (max-width: 400px) {
    padding: 0 3rem;
    padding-bottom: ${({ loading }) => (loading === 'true' ? '20rem' : '0')};
  }
`;

export const Title = styled(TitleSm)`
  justify-self: start;
  font-size: 2.6rem;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    justify-self: center;
  }
`;

export const Loader = styled(TabLoader)``;
