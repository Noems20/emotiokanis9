import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import tokens from '../../tokens';

export const MobileIcon = styled.div`
  display: none;
  visibility: hidden;
  position: absolute;

  @media screen and (max-width: 1200px) {
    position: static;
    visibility: visible;
    display: inline-block;
    color: var(--color-primary);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-left: auto;
    & svg {
      font-size: 3.5rem;
    }
  }
`;

export const HeaderNav = styled.nav`
  background-color: ${({ scrollnav }) => (scrollnav ? '#fff' : 'transparent')};
  box-shadow: ${({ scrollnav }) =>
    scrollnav ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'none'};
  background-size: cover;

  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  position: sticky;
  transition: all 0.15s ease-in-out;

  z-index: 11;

  @media screen and (max-width: 1200px) {
    height: 5.7rem;
    transition: all 0.8s ease;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-self: stretch;
  align-items: center;
  width: 100vw;
  margin: 0 13rem;

  & > * {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px) {
      padding: 0 3rem;
    }
  }
  @media screen and (max-width: 1200px) {
    margin: 0 0rem;

    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
`;

const clickedNavMenu = css`
  @media screen and (max-width: 1200px) {
    height: 39rem;
    background: #fff;
    visibility: visible;
    opacity: 1;
    display: flex;
    flex-direction: column;
    flex: 0 1 100%;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.24);

    animation: fadeIn 0.5s;

    -webkit-transition: opacity 600ms, visibility 600ms;
    transition: opacity 600ms, visibility 600ms;

    & li {
      flex: 0 1 100%;
      &:not(:last-child) {
        border-bottom: 0.1px solid var(--color-primary);
      }

      &:last-child {
        margin: 0.5rem auto;
      }
    }
  }
`;
const notClickedNavMenu = css`
  @media screen and (max-width: 1200px) {
    background: #fff;
    display: flex;
    flex-direction: column;
    flex: 0 1 100%;
    height: 0rem;
    visibility: hidden;
    opacity: 0;

    animation: fadeOut 0.3s;

    -webkit-transition: opacity 600ms, visibility 600ms;
    transition: opacity 600ms, visibility 600ms;

    & li {
      flex: 0 1 100%;
      &:not(:last-child) {
        border-bottom: 0.1px solid var(--color-primary);
      }

      &:last-child {
        margin: 0.5rem auto;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      height: 0rem;
    }

    100% {
      opacity: 1;
      height: 39rem;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
      height: 39rem;
    }

    100% {
      opacity: 0;
      height: 0rem;
    }
  }
`;

const getNavMenuStyles = ({ clicked }) => {
  return clicked ? clickedNavMenu : notClickedNavMenu;
};

export const HeaderMenu = styled.ul`
  list-style: none;
  ${getNavMenuStyles}
`;

export const HeaderItem = styled.li`
  display: flex;
  align-self: stretch;
  align-items: center;

  position: relative;
`;

export const UserImage = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const HeaderLink = styled.div`
  font-family: ${tokens.fontPrimary};
  color: var(--color-primary);
  font-size: 2.5rem;
  font-weight: 400;
  text-decoration: none;
  width: 100%;
  transition: all 0.15s ease-in-out;

  &:hover,
  &.is-active {
    color: #333;
  }

  @media only screen and (max-width: 1200px) {
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 1200px) {
    font-size: ${({ scrollnav }) => (scrollnav ? '2.3rem' : '2.5rem')};
    color: ${({ scrollnav }) => (scrollnav ? '#333' : 'rgba(0,0,0,0.5)')};
    text-align: center;

    display: ${({ scrollnav }) => (scrollnav ? 'flex' : 'inline')};
    align-self: ${({ scrollnav }) => (scrollnav ? 'stretch' : 'auto')};
    align-items: center;

    padding: 0 2rem;

    &:hover {
      background-color: ${({ scrollnav }) =>
        scrollnav ? 'var(--color-grey-light-1)' : 'none'};
      color: ${({ scrollnav }) =>
        scrollnav ? 'var(--color-primary)' : 'var(--color-grey-dark-1)'};
    }

    &.is-active {
      background-color: ${({ scrollnav }) =>
        scrollnav ? 'var(--color-grey-light-1)' : 'none'};
      color: var(--color-primary);
    }
  }
`;

export const SessionBtn = styled.div`
  font-family: ${tokens.fontPrimary};
  text-decoration: none;
  color: #fff;
  background: var(--color-primary);
  border-radius: 100px;
  text-transform: uppercase;
  font-size: 2.2rem;
  font-weight: 400;

  padding: 0.8rem 2rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &.is-active {
    background-color: var(--color-primary-light);
  }

  @media screen and (min-width: 1200px) {
    font-size: 1.8rem;
    margin-left: 1.2rem;
    width: 100%;
    padding: 0.8rem 2rem;
    color: #fff;
    background: ${({ scrollnav }) =>
      scrollnav ? '#333' : 'var(--color-primary)'};
    &:hover {
      background-color: ${({ scrollnav }) =>
        scrollnav ? 'var(--color-primary)' : 'var(--color-primary-dark)'};
      /* color: ${({ scrollnav }) =>
        scrollnav ? '#fff' : 'var(--color-primary-light)'}; */
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const CloseSessionBtn = styled.button`
  font-family: ${tokens.fontPrimary};
  text-decoration: none;
  color: #fff;
  background: var(--color-primary);
  border-radius: 100px;
  text-transform: uppercase;
  font-size: 2.2rem;
  font-weight: 400;
  border: none;

  padding: 0.8rem 2rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-light);
  }

  @media screen and (min-width: 1200px) {
    font-size: 1.8rem;
    margin-left: 1.2rem;
    width: 100%;
    padding: 0.8rem 2rem;
    color: #fff;
    background: ${({ scrollnav }) =>
      scrollnav ? '#333' : 'var(--color-primary-light)'};
    &:hover {
      background-color: ${({ scrollnav }) =>
        scrollnav ? 'var(--color-primary)' : '#fff'};
      color: ${({ scrollnav }) =>
        scrollnav ? '#fff' : 'var(--color-primary-light)'};
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const HeaderLogoLink = styled(Link)`
  margin-right: auto;
  @media screen and (max-width: 1200px) {
    display: none;
    visibility: hidden;
  }
`;

export const HeaderLogo = styled.img`
  margin-top: ${({ scrollnav }) => (scrollnav ? '0' : '8rem')};
  height: ${({ scrollnav }) => (scrollnav ? '90%' : '13rem')};
  transition: all 0.15s ease-in-out;

  @media screen and (max-width: 1200px) {
    display: none;
    visibility: hidden;
  }
`;

export const HeaderLetterLogo = styled(Link)`
  text-decoration: none;
  font-family: ${tokens.fontPrimary};
  font-weight: 600;
  font-size: 4rem;
  color: var(--color-primary);

  @media screen and (min-width: 1200px) {
    display: none;
    visibility: hidden;
  }
`;
