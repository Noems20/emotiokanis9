import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';
import tokens from '../../tokens';

export const ServiceHeading = styled.div`
  grid-column: full-start / full-end;
  background-image: linear-gradient(
      rgba(245, 151, 69, 0.7),
      rgba(245, 151, 69, 0.7)
    ),
    ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

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
  font-size: 8rem;
  font-weight: 300;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 0 2rem;

  @media only screen and (max-width: 400px) {
    font-size: 6rem;
  }
`;

export const ContentContainer = styled.div`
  margin: auto 10rem;
  grid-column: full-start / full-end;

  display: grid;
  grid-template-columns: 0.5fr 0.5fr;

  @media only screen and (max-width: 1100px) {
    margin: 3rem 5rem;
    grid-gap: 3rem;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
  }
  @media only screen and (max-width: 500px) {
    margin: 3rem;
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
  font-size: 3rem;
  color: var(--color-primary);
`;
export const Description = styled.p`
  font-size: 2rem;
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
  font-size: 3rem;
  font-weight: 300;
  color: var(--color-primary);
`;
export const Price = styled.p`
  font-size: 4rem;
`;

export const Button = styled(CustomButton)``;
