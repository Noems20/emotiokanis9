import styled from 'styled-components';
import { PageGrid } from '../general.styles';
import tokens from '../../tokens';

export const Grid = styled(PageGrid)`
  height: 100vh;
  margin-top: -8rem;
  overflow: hidden;

  @media only screen and (max-width: 1200px) {
    margin-top: 0;
    height: calc(100vh - 5.7rem);
  }

  @media only screen and (max-width: 800px) {
    height: calc(100vh - 5.5rem);
  }
`;

export const HeroContainer = styled.div`
  grid-column: center-start/center-end;
  justify-self: center;
  align-self: center;
  height: 75vh;
  width: 100%;

  /* background-color: black; */

  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr max-content;
  grid-template-rows: 95% 5%;

  @media only screen and (max-width: 1100px) {
    grid-column-gap: 0;
    grid-row-gap: 2rem;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) min-content min-content;
  }

  @media only screen and (max-width: 992px) {
    height: 80vh;
  }
`;

export const ImageContainer = styled.div`
  /* background-color: red; */
  display: grid;
  grid-template-rows: 100%;
`;

export const Image = styled.img`
  align-self: center;
  justify-self: center;
  max-height: 100%;
  max-width: 100%;

  display: ${({ currentSlide, slide }) => !(currentSlide === slide) && 'none'};
`;

export const Puff = styled.div``;

export const TitleContainer = styled.div`
  /* background-color: blue; */
  display: grid;
  align-content: center;
`;

export const Title = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-size: 10rem;
  font-weight: 300;
  color: var(--color-grey-dark-1);
  line-height: 1;

  @media only screen and (max-width: 1100px) {
    font-size: 7rem;
    text-align: center;
  }
  @media only screen and (max-width: 550px) {
    font-size: 7rem;
  }
`;

export const TitleColor = styled.span`
  color: var(--color-primary);
`;

export const Slides = styled.div`
  grid-column: 1/3;
  justify-self: center;
  /* background-color: green; */

  display: grid;
  grid-gap: 2rem;
  justify-content: center;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);

  @media only screen and (max-width: 1100px) {
    grid-column: auto/auto;
    margin-top: 3rem;
  }
`;

export const Dot = styled.span`
  height: 2rem;
  width: 2rem;
  background-color: var(--color-primary);
  border-radius: 50%;
  border: 3px solid #fff;
  cursor: pointer;

  position: relative;

  &::after {
    content: '';
    display: inline-block;

    position: absolute;
    top: 50%; /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */

    transform: translate(
      -50%,
      -50%
    ); /* This is a shorthand of translateX(-50%) and translateY(-50%) */

    height: 2rem;
    width: 2rem;
    background-color: var(--color-primary);
    border-radius: 50%;
    border: 3px solid #fff;
    cursor: pointer;

    @media only screen and (max-width: 480px) {
      height: 2.3rem;
      width: 2.3rem;
    }
    @media only screen and (max-width: 430px) {
      height: 2.6rem;
      width: 2.6rem;
    }
  }

  &.selected,
  &:hover {
    &::before {
      content: '';
      display: inline-block;

      position: absolute;
      top: 50%; /* position the top  edge of the element at the middle of the parent */
      left: 50%; /* position the left edge of the element at the middle of the parent */

      transform: translate(
        -50%,
        -50%
      ); /* This is a shorthand of translateX(-50%) and translateY(-50%) */

      height: 2.4rem;
      width: 2.4rem;
      background-color: var(--color-primary);
      border-radius: 50%;

      @media only screen and (max-width: 480px) {
        height: 2.7rem;
        width: 2.7rem;
      }
      @media only screen and (max-width: 430px) {
        height: 3rem;
        width: 3rem;
      }
    }
  }
`;
