import styled from 'styled-components';
import { PageGrid } from '../../components/general.styles';

export const Grid = styled(PageGrid)`
  grid-template-rows: calc(100vh - 8rem);

  @media only screen and (max-width: 1200px) {
    grid-template-rows: calc(100vh - 5.7rem);
  }

  @media only screen and (max-width: 1024px) {
    grid-template-rows: max-content;
  }
`;

export const Container = styled.div`
  grid-column: center-start / center-end;
  /* overflow: hidden; */
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
