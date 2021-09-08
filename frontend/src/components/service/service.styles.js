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
  grid-column: full-start / full-end;

  display: grid;
  /* grid-gap: 4rem; */
  grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
  align-content: center;
  align-items: start;

  @media only screen and (max-width: 900px) {
    grid-gap: 2rem;
    margin: 3rem 0;
  }
  @media only screen and (max-width: 300px) {
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
`;

export const ServiceDescription = styled.div`
  margin-left: 10rem;
  margin-right: 2rem;
  display: grid;
  grid-gap: 1.5rem;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    margin-right: 2rem;
    margin-left: 2rem;
  }
`;
export const DescriptionTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 3rem;
  color: var(--color-primary);
`;
export const Description = styled.p`
  font-size: 2rem;

  @media only screen and (max-width: 1572px) {
    /* font-size: 2.5rem; */
  }
`;

export const ServicePrice = styled.div`
  text-align: center;
  margin-right: 4rem;
  margin-left: 2rem;
  display: grid;
  grid-gap: 1.5rem;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    margin-right: 2rem;
    margin-left: 2rem;
  }
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
