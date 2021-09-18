import React from 'react';

import { HeaderItems } from './footer.items';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userActions';

// STYLES
import {
  FooterContainer,
  FooterWrapper,
  FooterTitle,
  LinksContainer,
  FooterLinks,
  FooterLink,
  CloseSessionButton,
  SocialLinksContainer,
  FooterSocialLinks,
  FooterSocialLink,
  WebsiteRights,
} from './footer.styles';
import './waves.css';

// ICONS
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user, userLoaded } = userData;

  return (
    <>
      <FooterContainer>
        <svg
          className='hero-waves'
          xmlns='http://www.w3.org/2000/svg'
          xlink='http://www.w3.org/1999/xlink'
          viewBox='0 24 150 28 '
          preserveAspectRatio='none'
        >
          <defs>
            <path
              id='wave-path'
              d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
            />
          </defs>
          <g className='wave1'>
            <use href='#wave-path' x='50' y='3' fill='rgba(255,255,255, .1)' />
          </g>
          <g className='wave2'>
            <use href='#wave-path' x='50' y='0' fill='rgba(255,255,255, .2)' />
          </g>
          <g className='wave3'>
            <use href='#wave-path' x='50' y='9' fill='#fff' />
          </g>
        </svg>
        <FooterWrapper>
          <FooterTitle>EmotioKanis9</FooterTitle>
          <LinksContainer>
            {HeaderItems.map((item, index) => {
              return (
                <FooterLinks key={index}>
                  <FooterLink to={item.url}>{item.title}</FooterLink>
                </FooterLinks>
              );
            })}
            {userLoaded ? (
              user ? (
                <>
                  <FooterLinks>
                    <FooterLink to='/citas'>Citas</FooterLink>
                  </FooterLinks>
                  ,
                  <FooterLinks>
                    <CloseSessionButton onClick={() => dispatch(logout())}>
                      Cerrar Sesión
                    </CloseSessionButton>
                  </FooterLinks>
                  ,
                </>
              ) : (
                <FooterLinks>
                  <FooterLink to='/login'>Iniciar sesión</FooterLink>
                </FooterLinks>
              )
            ) : null}
          </LinksContainer>
          <SocialLinksContainer>
            <FooterSocialLinks>
              <FooterSocialLink
                to={{ pathname: 'https://www.facebook.com/Emotiokanis9' }}
                target='_blank'
              >
                <FaFacebook />
              </FooterSocialLink>
              <FooterSocialLink
                to={{ pathname: 'https://www.facebook.com/Emotiokanis9' }}
                target='_blank'
              >
                <FaInstagram />
              </FooterSocialLink>
              <FooterSocialLink
                to={{ pathname: 'https://www.facebook.com/Emotiokanis9' }}
                target='_blank'
              >
                <FaTwitter />
              </FooterSocialLink>
              <FooterSocialLink
                to={{ pathname: 'https://www.facebook.com/Emotiokanis9' }}
                target='_blank'
              >
                <FaYoutube />
              </FooterSocialLink>
            </FooterSocialLinks>
          </SocialLinksContainer>
          <WebsiteRights>
            EmotioKanis9 &copy; {new Date().getFullYear()} Todos los derechos
            reservados.
          </WebsiteRights>
        </FooterWrapper>
      </FooterContainer>
    </>
  );
};

export default Footer;
