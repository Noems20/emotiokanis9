import { motion } from 'framer-motion';
import styled from 'styled-components';

// COMPONENTS
import { TitleSm } from '../general.styles';
import CustomButton from '../custom-button/custom-button.component';

// ---------------------------------------------------------
// TAB STYLES
// ---------------------------------------------------------

export const TabContainer = styled(motion.div)`
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
`;

export const TabSubContainer = styled.div`
  padding: 0 16rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
  align-items: start;
  align-content: start;

  & form {
    display: grid;
    grid-gap: 4.5rem;
  }

  @media only screen and (max-width: 900px) {
    padding: 0 10rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 0 8rem;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 5rem;
  }
  @media only screen and (max-width: 400px) {
    padding: 0 3rem;
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

export const Line = styled.div`
  margin: 6rem 0;
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

export const TabButton = styled(CustomButton)`
  justify-self: end;

  @media only screen and (max-width: 600px) {
    justify-self: center;
  }
`;

export const ManageItems = styled(TabSubContainer)`
  height: 100%;
  padding: 0 8rem;
  padding-bottom: 1rem;
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
