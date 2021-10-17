import React, { useState, useEffect, useRef } from 'react';
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

// import logoB from './images/logo.svg';
import logo from './images/logo.svg';

// ICONS
import { RiMenu2Line } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

function useOutsideAlerter(ref, closer) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert('You clicked outside of me!');
        closer(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, closer]);
}

const Header = ({ history }) => {
  // ----------------------- STATE AND VARIABLES ----------------
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  useOutsideAlerter(dropdownRef, setOpen, 'dropdown');
  useOutsideAlerter(headerRef, setClicked, 'header');
  const [showDropdown, setShowDropdown] = useState(true);
  const [scrollNav, setScrollNav] = useState();
  const [photoHash, setPhotoHash] = useState(Date.now());

  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state) => state.user);

  // ----------------------------- USE EFFECTS --------------------------
  useEffect(() => {
    // ------ DETECT PAGE FOR TRANSPARENT BACKGROUND ------
    let listener = undefined;
    let currentLocation = history.location.pathname;
    // console.log(currentLocation);
    if (currentLocation === '/') {
      window.addEventListener('scroll', changeNav);
      listener = true;
    } else {
      setScrollNav(true);
    }
    // console.log(currentLocation);
    history.listen((location) => {
      if (location.pathname === '/' && !listener) {
        window.addEventListener('scroll', changeNav);
        setScrollNav(false);

        listener = true;
        // console.log('Listener añadido');
      } else if (location.pathname !== '/') {
        window.removeEventListener('scroll', changeNav);
        listener = false;
        setScrollNav(true);
      }
    });

    return function cleanup() {
      setOpen(false);
    };
  }, [history]);

  useEffect(() => {
    // ----------- CHECK SCREEN WIDTH ----------
    if (window.innerWidth <= 1200) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
    function handleResize() {
      if (window.innerWidth > 1200) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // -------------------- UPDATE PHOTO -----------
    if (userLoaded.updatedUser === true) {
      setPhotoHash(Date.now());
    }
  }, [userLoaded]);

  // ----------------------------- HANDLERS --------------------------
  const handleClick = () => {
    setClicked(!clicked);
  };

  // ------------------- CAMBIAR BARRA DE NAVEGACIÓN EN SCROLL ----------------
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  return (
    <HeaderNav scrollnav={scrollNav ? 1 : 0}>
      <HeaderContainer ref={headerRef}>
        <HeaderLogoLink to='/'>
          <HeaderLogo src={logo} scrollnav={scrollNav ? 1 : 0} />
        </HeaderLogoLink>
        <HeaderLetterLogo to='/' onClick={handleClick}>
          K9
        </HeaderLetterLogo>
        <MobileIcon scrollnav={scrollNav ? 1 : 0} onClick={handleClick}>
          {clicked ? <AiOutlineClose /> : <RiMenu2Line />}
        </MobileIcon>
        {/* ------------------- CHECK IF USER LOADED------------------ */}
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

            {/* ------------------- CHECK IF THERE IS USER LOGGED------------------ */}
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
                {/* ------------------- SHOULD SHOW DROPDOWN ------------------ */}
                {showDropdown ? (
                  <HeaderItem>
                    <HeaderLink
                      scrollnav={scrollNav ? 1 : 0}
                      ref={dropdownRef}
                      onClick={() => setOpen(!open)}
                    >
                      {scrollNav && (
                        <UserImage
                          src={`/img/users/${user.photo}?${photoHash}`}
                        />
                      )}
                      {user.name.split(' ')[0]}
                      <DropDown open={open} setOpen={setOpen}>
                        <DropDownItem
                          as={NavLink}
                          to='/perfil'
                          exact
                          activeClassName='is-active'
                          onClick={handleClick}
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
                ) : (
                  <>
                    <HeaderItem onClick={handleClick}>
                      <HeaderLink
                        as={NavLink}
                        to='/perfil'
                        exact
                        activeClassName='is-active'
                        scrollnav={scrollNav ? 1 : 0}
                      >
                        Perfil
                      </HeaderLink>
                    </HeaderItem>
                    <HeaderItem>
                      <SessionBtn
                        onClick={() => dispatch(logout())}
                        scrollnav={scrollNav ? 1 : 0}
                      >
                        Cerrar sesión
                      </SessionBtn>
                    </HeaderItem>
                  </>
                )}
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
