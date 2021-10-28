import styled from 'styled-components';
import { PageGrid, TitleSm } from '../../components/general.styles';
import Alert from '../../components/alert/alert.component';

export const Grid = styled(PageGrid)`
  align-items: center;
  height: calc(100vh - 8rem);

  @media only screen and (max-width: 1200px) {
    height: calc(100vh - 5.7rem);
  }

  @media only screen and (max-width: 800px) {
    min-height: auto;
  }
  @media only screen and (max-height: 630px) {
    margin: 7rem 0;
  }
`;

export const FormContainer = styled.div`
  grid-column: col-start 3 / col-end 6;
  min-height: 23rem;
  border-radius: 10px;
  box-shadow: var(--shadow-dark);

  @media only screen and (max-width: 500px) {
    grid-column: full-start / full-end;
  }
`;

export const Container = styled.div`
  margin: 2rem;
  display: grid;
  grid-gap: 3rem;

  & svg {
    justify-self: center;
    font-size: 10rem;
    color: var(--color-primary-light);
  }

  @media only screen and (max-width: 500px) {
    margin: 4rem 2rem;
    grid-gap: 5rem;
  }
`;

export const Title = styled(TitleSm)``;

export const Text = styled.p`
  text-align: center;
  font-size: 2rem;
  justify-self: center;

  @media only screen and (max-width: 430px) {
    font-size: 2.3rem;
  }
`;

export const Message = styled(Alert)`
  padding-top: 1.5rem;
  & svg {
    color: white;
  }
`;
