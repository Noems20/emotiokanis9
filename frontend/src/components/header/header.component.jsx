import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { RiMenu2Line } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

import logoB from './images/logoB.svg';
import logo from './images/logo.svg';

import { HeaderItems } from './header.items';

import {
  MobileIcon,
  Nav,
  NavContainer,
  NavMenu,
  NavItem,
  NavLogo,
  NavLogoLink,
  NavLinks,
  SessionBtn,
  CloseSessionBtn,
  NavLetterLogo,
} from './header.styles';

const Header = ({ history, currentUser }) => {
  const [clicked, setClicked] = useState(false);
  const [scrollNav, setScrollNav] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    // ------------------ DETECTAR PAGINA PARA FONDO TRANSPARENTE ------
    let listener = undefined;
    let currentLocation = history.location.pathname;
    // console.log(currentLocation);
    if (currentLocation === '/') {
      window.addEventListener('scroll', changeNav);
      listener = true;
      setImage(logoB);
    } else {
      setScrollNav(true);
      setImage(logo);
    }
    // console.log(currentLocation);
    history.listen((location) => {
      if (location.pathname === '/' && !listener) {
        window.addEventListener('scroll', changeNav);
        setScrollNav(false);
        setImage(logoB);
        listener = true;
        // console.log('Listener añadido');
      } else if (location.pathname !== '/') {
        window.removeEventListener('scroll', changeNav);
        listener = false;
        setScrollNav(true);
        setImage(logo);
      }
    });
  }, [history]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  // ------------------- CAMBIAR BARRA DE NAVEGACIÓN EN SCROLL ----------------
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
      setImage(logo);
    } else {
      setScrollNav(false);
      setImage(logoB);
    }
  };

  return (
    <Nav scrollnav={scrollNav ? 1 : 0}>
      <NavContainer>
        <NavLogoLink to='/'>
          <NavLogo src={image} scrollnav={scrollNav ? 1 : 0} />
        </NavLogoLink>
        <NavLetterLogo to='/'>K9</NavLetterLogo>
        <MobileIcon scrollnav={scrollNav ? 1 : 0} onClick={handleClick}>
          {clicked ? <AiOutlineClose /> : <RiMenu2Line />}
        </MobileIcon>
        <NavMenu clicked={clicked}>
          {HeaderItems.map((item, index) => {
            return (
              <NavItem key={index} onClick={handleClick}>
                <NavLinks
                  activeClassName='is-active'
                  to={item.url}
                  exact
                  scrollnav={scrollNav ? 1 : 0}
                >
                  {item.title}
                </NavLinks>
              </NavItem>
            );
          })}

          {/* Boton para iniciar sesión o cerrar dependiendo de usuario */}
          {currentUser ? (
            [
              <NavItem key={5} onClick={handleClick}>
                <NavLinks
                  activeClassName='is-active'
                  to='/citas'
                  exact
                  scrollnav={scrollNav ? 1 : 0}
                >
                  Citas
                </NavLinks>
              </NavItem>,
              <NavItem key={6}>
                <CloseSessionBtn
                  onClick={() => auth.signOut()}
                  scrollnav={scrollNav ? 1 : 0}
                >
                  Cerrar sesión
                </CloseSessionBtn>
              </NavItem>,
            ]
          ) : (
            <NavItem>
              <SessionBtn
                onClick={handleClick}
                activeClassName='is-active'
                to='/login'
                exact
                scrollnav={scrollNav ? 1 : 0}
              >
                Iniciar sesión
              </SessionBtn>
            </NavItem>
          )}
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // const mapStateToProps = (state) => ({
  // currentUser: selectCurrentUser(state), )}
});

export default withRouter(connect(mapStateToProps)(Header));
