import styled from 'styled-components';
import { PageGrid } from '../../components/general.styles';

export const Grid = styled(PageGrid)`
  grid-auto-rows: calc(60vh - 8rem) 40vh;

  @media only screen and (max-width: 1100px) {
    grid-auto-rows: calc(60vh - 8rem) max-content;
  }
`;
