import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri';

export const Container = styled.div`
  position: relative;
  /* max-height: 5rem; */
`;

export const SelectLabel = styled.label`
  position: absolute;
  top: -9px;
  left: 11px;
  letter-spacing: 0.5px;
  font-size: 1.4rem;
  font-weight: 400;
  color: grey;
  background-color: #fff;
  padding: 0 3px;
  z-index: 1;

  @media only screen and (max-width: 430px) {
    font-size: 2rem;
  }
`;

export const Selector = styled.select`
  font-size: 1.75rem;
  font-weight: 300;
  color: grey;
  width: 100%;
  height: 4.2rem;

  border: 3px solid var(--color-primary-light);
  border-radius: 8px;
  padding: 0 11px;
  background-color: transparent;

  -webkit-appearance: none;
  outline: none;

  @media only screen and (max-width: 430px) {
    font-size: 2.5rem;
    height: 6rem;
  }
`;

export const Arrow = styled(RiArrowDownSLine)`
  position: absolute;
  top: 50%;
  right: 12px;
  width: 1.5rem;
  height: 1.5rem;
  transform: translateY(-50%);
  z-index: 1;

  @media only screen and (max-width: 430px) {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
