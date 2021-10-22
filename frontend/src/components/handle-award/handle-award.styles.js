import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';
import tokens from '../../tokens';
import { TitleSm } from '../general.styles';
import { motion } from 'framer-motion';

export const Container = styled.div``;

export const ServiceHeading = styled.div`
  height: 20rem;
  background-image: linear-gradient(
      rgba(245, 151, 69, 0.7),
      rgba(245, 151, 69, 0.7)
    ),
    ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  /* background-attachment: fixed; */

  box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);

  display: grid;
  justify-content: center;
  align-content: center;

  @media only screen and (max-width: 1400px) {
    background-attachment: scroll;
  }
`;
export const ServiceTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-size: 5rem;
  font-weight: 300;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 0 2rem;

  @media only screen and (max-width: 400px) {
    font-size: 4rem;
  }
`;

export const ContentContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;

  @media only screen and (max-width: 1100px) {
    grid-gap: 3rem;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
  }
`;

export const ServiceDescription = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-auto-rows: min-content;
  align-items: start;
  justify-items: start;
`;
export const DescriptionTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 2rem;
  color: var(--color-primary);
`;
export const Description = styled.p`
  font-size: 1.6rem;

  @media only screen and (max-width: 430px) {
    font-size: 1.8rem;
  }
`;

export const ServicePrice = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-auto-rows: min-content;
  align-items: start;
  justify-items: center;
`;
export const PriceTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-size: 2rem;
  font-weight: 300;
  color: var(--color-primary);
`;

export const Price = styled.p`
  font-size: 2rem;
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  justify-items: center;

  @media only screen and (max-width: 1100px) {
    grid-template-columns: max-content max-content;
  }
`;

// -------------------- FORM STYLES --------------
export const FormContainer = styled(motion.div)`
  width: 60vw;
  padding: 5rem;
  border-radius: 8px;
  background-color: #fff;

  display: grid;
  grid-gap: 3rem;

  @media only screen and (max-width: 1400px) {
    width: 75vw;
  }
  @media only screen and (max-width: 1200px) {
    width: 80vw;
    padding: 3rem;
    grid-gap: 1rem;
  }
  @media only screen and (max-width: 600px) {
    width: 90vw;
    /* height: 90vh; */
  }
`;

export const Title = styled(TitleSm)`
  justify-self: start;
  font-size: 2.6rem;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    justify-self: center;
    margin-bottom: 1rem;
  }
`;

export const UpdateServiceButton = styled(CustomButton)`
  justify-self: ${({ loading }) => loading && 'center'};
`;
