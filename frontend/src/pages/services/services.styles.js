import styled from 'styled-components';
import { PageGrid } from '../../components/general.styles';

export const Grid = styled(PageGrid)`
  grid-template-rows:
    calc(60vh - 8rem) 40vh calc(60vh - 8rem) 40vh calc(60vh - 8rem)
    40vh calc(60vh - 8rem) 40vh;

  @media only screen and (max-width: 910px) {
    grid-template-rows:
      calc(60vh - 8rem) max-content calc(60vh - 8rem) max-content calc(
        60vh - 8rem
      )
      max-content calc(60vh - 8rem) max-content;
  }
`;
