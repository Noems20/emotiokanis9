import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { HeaderItems } from './header.items';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userActions';

// COMPONENTS
import DropDown from '../dropdown/dropdown.component';

// STYLES
import {
  MobileIcon,
  Nav,
  NavContainer,
  NavMenu,
  NavItem,
  UserImage,
  NavLogo,
  NavLogoLink,
  NavLinks,
  SessionBtn,
  CloseSessionBtn,
  NavLetterLogo,
} from './header.styles';

import { NoLinkContainer, DropDownItem } from '../dropdown/dropdown.styles';

import logoB from './images/logoB.svg';
import logo from './images/logo.svg';

// ICONS
import { RiMenu2Line, RiLogoutCircleLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const Header = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [scrollNav, setScrollNav] = useState();
  const [image, setImage] = useState();

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { user, userLoaded } = userData;

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

    return function cleanup() {
      setOpen(false);
    };
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
        {userLoaded && (
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
            {user ? (
              <>
                <NavItem onClick={handleClick}>
                  <NavLinks
                    activeClassName='is-active'
                    to='/citas'
                    exact
                    scrollnav={scrollNav ? 1 : 0}
                  >
                    Citas
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NoLinkContainer
                    scrollnav={scrollNav ? 1 : 0}
                    onClick={() => setOpen(!open)}
                  >
                    {scrollNav && (
                      <UserImage
                        src={
                          require(`../../../../backend/data/img/users/${user.photo}`)
                            .default
                        }
                      />
                    )}
                    {user.name.split(' ')[0]}
                    <DropDown open={open}>
                      <DropDownItem
                        onClick={() => {
                          history.push('/perfil');
                        }}
                      >
                        <FaUser />
                        <p>Perfil</p>
                      </DropDownItem>
                      <DropDownItem onClick={() => dispatch(logout())}>
                        <RiLogoutCircleLine />
                        <p>Cerrar Sesión</p>
                      </DropDownItem>
                    </DropDown>
                  </NoLinkContainer>
                </NavItem>
                ,
              </>
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
        )}
      </NavContainer>
    </Nav>
  );
};

export default withRouter(Header);
