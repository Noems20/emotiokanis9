import styled from 'styled-components';
import tokens from '../../tokens';

export const Container = styled.div`
  padding: 2rem;
  border-radius: 10px;

  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);

  display: grid;
  justify-content: center;
  grid-gap: 2rem;
  grid-template-columns: 0.5fr 1fr 0.7fr;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr max-content;
  }
`;

export const UserHeading = styled.div`
  display: grid;
  grid-gap: 2rem;
  justify-content: center;
  justify-items: center;
  align-content: center;
`;

export const DetailsTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 2rem;
  color: var(--color-primary);
`;

export const Description = styled.p`
  font-size: 1.6rem;

  @media only screen and (max-width: 1200px) {
    text-align: center;
  }
  @media only screen and (max-width: 476px) {
    font-size: 1.8em;
  }
`;

export const UserDetails = styled.div`
  display: grid;
  grid-gap: 2rem;

  align-content: center;
  justify-content: center;
`;

export const UserInfoContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  justify-items: center;

  grid-auto-rows: min-content;
`;

export const UserImage = styled.div`
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  border: 2px solid var(--color-primary);

  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
`;

export const Username = styled.p`
  font-size: 2rem;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  align-content: center;
  grid-template-rows: min-content min-content;
`;
