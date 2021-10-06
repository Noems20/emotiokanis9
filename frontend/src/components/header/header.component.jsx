import React, { useState, useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { HeaderItems } from './header.items';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userActions';

// COMPONENTS
import DropDown from '../dropdown/dropdown.component';

// STYLES
import {
  MobileIcon,
  HeaderNav,
  HeaderContainer,
  HeaderMenu,
  HeaderItem,
  UserImage,
  HeaderLogo,
  HeaderLogoLink,
  HeaderLink,
  SessionBtn,
  HeaderLetterLogo,
} from './header.styles';

import { DropDownItem } from '../dropdown/dropdown.styles';

import logoB from './images/logo.svg';
import logo from './images/logo.svg';

// ICONS
import { RiMenu2Line } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const Header = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [scrollNav, setScrollNav] = useState();
  const [image, setImage] = useState();
  const [userPhoto, setUserPhoto] = useState('');

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { user, userLoaded } = userData;

  useEffect(() => {
    // ------------------ CHECK USER IMAGE ------
    try {
      setUserPhoto(
        require(`../../../../backend/public/img/users/${user.photo}`).default
      );
    } catch {
      setUserPhoto(require(`../../public/img/users/default.jpg`).default);
    }

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
  }, [history, user]);

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
    <HeaderNav scrollnav={scrollNav ? 1 : 0}>
      <HeaderContainer>
        <HeaderLogoLink to='/'>
          <HeaderLogo src={image} scrollnav={scrollNav ? 1 : 0} />
        </HeaderLogoLink>
        <HeaderLetterLogo to='/'>K9</HeaderLetterLogo>
        <MobileIcon scrollnav={scrollNav ? 1 : 0} onClick={handleClick}>
          {clicked ? <AiOutlineClose /> : <RiMenu2Line />}
        </MobileIcon>
        {userLoaded.general && (
          <HeaderMenu clicked={clicked}>
            {HeaderItems.map((item, index) => {
              return (
                <HeaderItem key={index} onClick={handleClick}>
                  <HeaderLink
                    as={NavLink}
                    to={item.url}
                    exact
                    activeClassName='is-active'
                    scrollnav={scrollNav ? 1 : 0}
                  >
                    {item.title}
                  </HeaderLink>
                </HeaderItem>
              );
            })}

            {/* Boton para iniciar sesión o cerrar dependiendo de usuario */}
            {user ? (
              <>
                <HeaderItem onClick={handleClick}>
                  <HeaderLink
                    as={NavLink}
                    to='/citas'
                    exact
                    activeClassName='is-active'
                    scrollnav={scrollNav ? 1 : 0}
                  >
                    Citas
                  </HeaderLink>
                </HeaderItem>
                <HeaderItem>
                  <HeaderLink
                    scrollnav={scrollNav ? 1 : 0}
                    onClick={() => setOpen(!open)}
                  >
                    {scrollNav && <UserImage src={userPhoto} />}
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
                        <FiLogOut />
                        <p>Cerrar Sesión</p>
                      </DropDownItem>
                    </DropDown>
                  </HeaderLink>
                </HeaderItem>
                ,
              </>
            ) : (
              <HeaderItem>
                <SessionBtn
                  onClick={handleClick}
                  as={NavLink}
                  to='/login'
                  exact
                  activeClassName='is-active'
                  scrollnav={scrollNav ? 1 : 0}
                >
                  Iniciar sesión
                </SessionBtn>
              </HeaderItem>
            )}
          </HeaderMenu>
        )}
      </HeaderContainer>
    </HeaderNav>
  );
};

export default withRouter(Header);
