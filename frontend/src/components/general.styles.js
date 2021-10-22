import { motion } from 'framer-motion';
import styled from 'styled-components';
import tokens from '../tokens';

// --------------------------------------------------------
// PAGE GRID
// ---------------------------------------------------------
export const PageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];
`;

// --------------------------------------------------------
// SMALL TITLLES
// ---------------------------------------------------------
export const TitleSm = styled(motion.h1)`
  font-family: ${tokens.fontPrimary};
  font-weight: 300;
  font-size: 3rem;

  justify-self: center;
  text-align: center;

  background-image: -webkit-linear-gradient(
    linear,
    left top,
    right top,
    from(var(--color-primary-light)),
    to(var(--color-primary))
  );
  background-image: linear-gradient(
    to right,
    var(--color-primary-light),
    var(--color-primary)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  display: inline-block;
`;

// --------------------------------------------------------
// SIDE BAR MENUS
// ---------------------------------------------------------

export const Sidebar = styled.div`
  background: rgb(30, 152, 228);
  background: linear-gradient(
    135deg,
    rgba(30, 152, 228, 1) 0%,
    rgba(14, 121, 187, 1) 50%,
    rgba(0, 100, 161, 1) 100%
  );
  box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-light-4);

  display: grid;
  grid-template-columns: 1fr;

  z-index: 10;

  @media only screen and (max-width: 1200px) {
    border-radius: 0 0 10px 10px;
  }
`;

export const SidebarContainer = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  @media only screen and (max-width: 1200px) {
    margin-top: 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
`;

const sidebarItemColor = '#fff';

export const SidebarAdmin = styled.div`
  margin-top: 3.5rem;

  @media only screen and (max-width: 1200px) {
    margin-top: 0;
    grid-column: 1 / 4;

    & div div {
      // SidebarItem
      display: flex;
      justify-items: flex-start;
    }
  }
`;

export const SidebarAdminItems = styled(motion.div)`
  overflow: hidden;

  & div {
    // SidebarItem
    @media only screen and (max-width: 1200px) {
      padding: 2rem 0;
      margin: 0 5rem;
      border-right: 0px solid transparent !important;
      border-radius: 10px;

      &:last-child {
        margin-bottom: 1rem;
      }

      & div {
        // SidebarContent
        padding: 0 !important;
        margin: 0 2rem !important;
        margin-right: 0 !important;

        & p {
          @media only screen and (max-width: 700px) {
            display: block;
          }
          @media only screen and (max-width: 430px) {
            font-size: 1.6rem;
          }
        }

        &:hover {
          background-color: transparent;
        }
      }
    }
  }
`;

export const SidebarAdminText = styled.p`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${sidebarItemColor};
  text-transform: uppercase;
  margin: 1rem 5rem;
  padding-bottom: 3px;
  border-bottom: 2px solid #fff;

  position: relative;

  @media only screen and (max-width: 1200px) {
    cursor: pointer;
    margin-top: 1rem;

    &::before {
      content: '';
      display: inline-block;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: ${(props) =>
        props.open
          ? '0 0.7rem 0.7rem  0.7rem'
          : '0.7rem 0.7rem 0 0.7rem'}; // Right and left center the arrow form and bottom creates the arrow
      border-color: ${({ open }) =>
        open
          ? 'transparent transparent white transparent'
          : 'white transparent transparent transparent'}; // Arrow up -> border bottom show

      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin-top: auto;
      margin-bottom: auto;
      z-index: 10;
    }
  }
`;

export const SidebarItem = styled.div`
  position: relative;
  padding: 2rem 5rem;
  cursor: pointer;

  & svg {
    font-size: 2.5rem;
    color: ${sidebarItemColor};
    z-index: 3;
  }

  &.active,
  &:hover,
  &:active {
    border-left: 4px solid #fff;
    & div {
      -webkit-transform: translateX(8px);
      transform: translateX(8px);
    }
  }

  @media only screen and (max-width: 1200px) {
    transition: background-color 0.3s ease;
    border-radius: 0 0 10px 10px;

    &:not(:nth-child(3n)) {
      border-right: 1px solid rgba(51, 51, 51, 0.1);
    }

    &.active,
    &:hover,
    &:active {
      background-color: rgba(30, 152, 228, 0.5);
      border-left: 0px solid #fff;
      & div {
        -webkit-transform: translateX(0px);
        transform: translateX(0px);
      }
    }
  }

  @media only screen and (max-width: 430px) {
    & svg {
      font-size: 3rem;
      z-index: 3;
    }
  }
`;

export const SidebarContent = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: min-content max-content;
  align-items: center;

  -webkit-transition: transform 0.3s;
  transition: transform 0.3s;

  @media only screen and (max-width: 1200px) {
    justify-content: center;
  }

  @media only screen and (max-width: 700px) {
    grid-template-columns: min-content;
  }
`;

export const SidebarText = styled.p`
  text-transform: uppercase;
  font-size: 1.4rem;
  color: ${sidebarItemColor};
  z-index: 3;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

// --------------------------------------------------------
// HANDLERS
// ---------------------------------------------------------
