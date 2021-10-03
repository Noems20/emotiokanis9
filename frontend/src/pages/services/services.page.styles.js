import styled from 'styled-components';
import { PageGrid } from '../../components/general.styles';

export const Grid = styled(PageGrid)`
  grid-auto-rows: calc(60vh - 8rem) 40vh;
  height: ${({ loading }) => (loading ? 'calc(100vh - 8rem)' : 'auto')};

  @media only screen and (max-width: 992px) {
    height: ${({ loading }) => (loading ? 'calc(100vh - 5.7rem)' : 'auto')};
  }

  @media only screen and (max-width: 800px) {
    height: ${({ loading }) => (loading ? 'calc (100vh - 5.5rem)' : 'auto')};
  }

  @media only screen and (max-width: 1100px) {
    grid-auto-rows: calc(60vh - 8rem) max-content;
  }
`;
