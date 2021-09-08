import styled from 'styled-components';

export const Button = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  position: fixed;
  bottom: 16px;
  right: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  -webkit-transition: opacity 300ms, visibility 300ms, background-color 300ms;
  transition: opacity 300ms, visibility 300ms, background-color 300ms;

  &:hover {
    background-color: var(--color-primary-light);
    /* transition: all 0.2s; */
  }
  & svg {
    font-size: 3.5rem;
    fill: white;
  }

  @media only screen and (max-width: 500px) {
    width: 6rem;
    height: 6rem;
    & svg {
      font-size: 4.5rem;
    }
  }

  @media only screen and (max-width: 430px) {
    width: 6.5rem;
    height: 6.5rem;
    & svg {
      font-size: 5rem;
    }
  }
`;
