import { motion } from 'framer-motion';
import styled from 'styled-components';
import CustomButton from '../../components/custom-button/custom-button.component';

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns:
    [sidebar-start] 25rem [sidebar-end full-start] minmax(6rem, 1fr)
    [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];

  grid-template-rows: calc(100vh - 8rem);

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  & svg {
    font-size: 2.5rem;
    color: #fff;
    z-index: 3;
  }

  @media only screen and (max-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(6rem, 1fr)
      [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
      [center-end] minmax(6rem, 1fr) [full-end];
    grid-template-rows: min-content 1fr;
  }

  @media only screen and (max-width: 430px) {
    & svg {
      font-size: 3rem;
      color: #fff;
      z-index: 3;
    }
  }
`;

export const Sidebar = styled.div`
  grid-column: sidebar-start / sidebar-end;
  background-color: var(--color-grey-dark-1);

  display: grid;
  grid-template-columns: 1fr;
  @media only screen and (max-width: 1200px) {
    grid-column: full-start / full-end;
  }
  z-index: 10;
`;

export const SidebarContainer = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, min-content);

  @media only screen and (max-width: 1200px) {
    margin-top: 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
`;

export const SidebarItem = styled.div`
  position: relative;
  padding: 2rem 5rem;
  cursor: pointer;

  display: grid;
  grid-gap: 2rem;
  grid-template-columns: min-content max-content;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 3px;
    background-color: var(--color-primary);
    transform: scaleY(0);
    transform-origin: center; // DEFAULT
    transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.1s;
    z-index: 2;
  }

  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }

  &:active::before {
    background-color: var(--color-primary-light);
  }

  @media only screen and (max-width: 1200px) {
    justify-content: center;
  }

  @media only screen and (max-width: 700px) {
    grid-template-columns: min-content;
  }
`;

export const SidebarText = styled.p`
  font-size: 1.6rem;
  color: #fff;
  z-index: 3;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const Button = styled(CustomButton)`
  justify-self: start;
`;
