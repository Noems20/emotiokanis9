import styled from 'styled-components';
import { PageGrid } from '../../components/general.styles';

export const Grid = styled(PageGrid)`
  grid-auto-rows: calc(60vh - 8rem) 40vh;
  height: ${({ loading }) => (loading ? 'calc(100vh - 8rem)' : 'auto')};

  @media only screen and (max-width: 1200px) {
    height: ${({ loading }) => (loading ? 'calc(100vh - 5.7rem)' : 'auto')};
    grid-auto-rows: calc(60vh - 5.7rem) 40vh;
  }

  @media only screen and (max-width: 1100px) {
    grid-auto-rows: calc(60vh - 5.7rem) max-content;
  }

  @media only screen and (max-width: 800px) {
    height: ${({ loading }) => (loading ? 'calc (100vh - 5.5rem)' : 'auto')};
  }
`;
