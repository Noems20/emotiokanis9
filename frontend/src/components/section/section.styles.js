import styled from 'styled-components';

export const SectionContainer = styled.div`
  background-color: ${({ lightBg }) => (lightBg ? '#fff' : '#000')};
  height: 68rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 992px) {
    height: 90rem;
  }
  @media screen and (max-width: 695px) {
    height: 87rem;
  }
`;

export const ContentWrapper = styled.div`
  width: 80%;

  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
  grid-gap: 7rem;
  align-items: center;
  z-index: 2;
  @media screen and (max-width: 992px) {
    grid-template-areas: 'col1 col1' 'col2 col2';
    grid-gap: 0;
  }
`;

export const ColumnOne = styled.div`
  grid-area: col1;
  /* max-height: 80%; */
`;

export const ColumnTwo = styled.div`
  grid-area: col2;
  /* max-height: 80%; */
`;

export const Subtitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const Heading = styled.h1`
  color: ${({ lightBg }) => (lightBg ? '#000' : '#fff')};
  font-size: 4.7rem;
  @media screen and (max-width: 1024px) {
    font-size: 4.4rem;
  }
`;

export const Description = styled.p`
  font-size: 2rem;
  color: ${({ lightBg }) => (lightBg ? '#000' : '#fff')};
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const ImageWrapper = styled.div``;

export const Image = styled.img`
  width: 100%;
  max-width: 590px;
  display: block;
  margin: auto;
  @media screen and (max-width: 992px) {
    /* max-height: 50%; */
    margin-top: 2rem;
  }
`;

export const Decoration = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${({ imgStart }) =>
    imgStart ? '0 100vw 25vh 0' : '0 0 25vh 100vw'};
  border-color: ${({ imgStart }) =>
    imgStart
      ? 'transparent transparent var(--color-primary-light) transparent'
      : 'transparent transparent var(--color-primary) transparent'};

  background: rgb(30, 152, 228);
  background: linear-gradient(
    90deg,
    rgba(30, 152, 228, 1) 0%,
    rgba(0, 100, 161, 1) 49%
  );
  z-index: 1;
`;
