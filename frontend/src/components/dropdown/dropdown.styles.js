import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background-color: #fff;
  border-radius: var(--border-radius);
  border: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;

  padding: 1rem;
  overflow: hidden;

  position: absolute;
  top: 8rem; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(
    -50%,
    0
  ); /* This is a shorthand of translateX(-50%) and translateY(-50%) */
`;

export const Arrow = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 2rem 2rem 2rem; // Right and left center the arrow form and bottom creates the arrow
  border-color: transparent transparent white transparent; // Arrow up -> border bottom show
  /* -webkit-filter: drop-shadow(0px -2px 1px rgba(0, 0, 0, 0.75)); */
  filter: drop-shadow(0px -3px 3px rgba(0, 0, 0, 0.04));
  transition: border-width 0.6s linear;

  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
`;

export const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
`;

// --------------------------- CHILD COMPONENTS ----------------

export const DropDownItem = styled.div`
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  cursor: pointer;

  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  align-content: center;
  grid-gap: 1rem;

  & * {
    text-decoration: none;
    color: #333;
    font-size: 1.6rem;
    cursor: pointer;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;
