import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import tokens from '../../tokens';

export const FooterContainer = styled.div`
  background: linear-gradient(
    0deg,
    var(--color-primary-light) 0%,
    var(--color-primary) 100%
  );
  height: 40rem;

  @media screen and (max-width: 992px) {
    height: 45rem;
  }

  @media screen and (max-width: 430px) {
    height: 47rem;
  }

  & .hero-waves {
    transform: rotate(180deg);
  }
`;

export const FooterWrapper = styled.div`
  height: 70%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const FooterTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-size: 5rem;
  color: #fff;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 0.1px solid #fff;
`;

export const LinksContainer = styled.ul`
  list-style: none;
  display: flex;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const FooterLinks = styled.li``;

const FooterLinksStyles = css`
  display: inline-block;
  font-family: ${tokens.fontPrimary};
  font-size: 2rem;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;

  margin: 0 2rem;
  @media screen and (min-width: 992px) {
    &:after {
      display: block;
      content: '';
      border-bottom: solid 3px #fff;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }

    &:hover:after {
      transform: scaleX(1);
    }
  }

  @media screen and (max-width: 992px) {
    margin-bottom: 0.5rem;
  }
`;

export const FooterLink = styled(Link)`
  ${FooterLinksStyles}
`;
export const CloseSessionButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${FooterLinksStyles}
`;

export const SocialLinksContainer = styled.ul`
  list-style: none;
  display: flex;

  margin-bottom: 1.5rem;
`;

export const FooterSocialLinks = styled.li``;

export const FooterSocialLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  margin: 0 2rem;

  & svg {
    font-size: 3.5rem;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.5);
      transition: transform 0.2s ease;
    }
  }
`;

export const WebsiteRights = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
`;
