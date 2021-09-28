import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../../redux/user/userActions';

// COMPONENTS
import TabLoader from '../../components/loaders/tab-loader/tab-loader.component';
import UserSettings from '../../components/profille-components/settings/settings.component';

// STYLES
import {
  Grid,
  Container,
  SideBar,
  SideBarContainer,
  SideBarAdmin,
  SideBarAdminItems,
  SideBarAdminText,
  SideBarItem,
  SideBarContent,
  SideBarText,
  Content,
} from './profile.page.styles';

// ICONS
import {
  IoSettingsSharp,
  IoWallet,
  IoPawSharp,
  IoPeople,
  IoStorefront,
  IoCalendar,
} from 'react-icons/io5';
import { BsAwardFill } from 'react-icons/bs';

const containerVariants = {
  hidden: {
    height: '0',
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    height: 'auto',
    transition: {
      ease: 'easeInOut',
    },
  },
};

const containerVariants2 = {
  hidden: {
    height: 'auto',
  },
  visible: {
    height: 'auto',
  },
};

const Profile = () => {
  const [tab, setTab] = useState('settings');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state) => state.user);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }

    function handleResize() {
      if (window.innerWidth > 1200) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(checkUser());
  }, [tab, dispatch]);

  const toggleOpen = () => {
    if (window.innerWidth <= 1200) {
      setOpen(!open);
    }
  };

  return (
    <Grid>
      <Container>
        {/* -------------------- SIDEBAR ------------------- */}
        <SideBar>
          <SideBarContainer>
            <SideBarItem
              onClick={() => setTab('settings')}
              className={tab === 'settings' ? 'active' : ''}
            >
              <SideBarContent>
                <IoSettingsSharp />
                <SideBarText>Configuración</SideBarText>
              </SideBarContent>
            </SideBarItem>
            <SideBarItem
              onClick={() => setTab('pets')}
              className={tab === 'pets' ? 'active' : ''}
            >
              <SideBarContent>
                <IoPawSharp />
                <SideBarText>Mascotas</SideBarText>
              </SideBarContent>
            </SideBarItem>
            <SideBarItem
              onClick={() => setTab('makeAppointment')}
              className={tab === 'makeAppointment' ? 'active' : ''}
            >
              <SideBarContent>
                <IoWallet />
                <SideBarText>Pago</SideBarText>
              </SideBarContent>
            </SideBarItem>
            {/* -------------------- ADMIN SIDEBAR ------------------- */}
            {user.role === 'admin' && (
              <SideBarAdmin className={open ? 'active' : ''}>
                <SideBarAdminText open={open} onClick={toggleOpen}>
                  Admin
                </SideBarAdminText>
                <AnimatePresence exitBeforeEnter>
                  {open && (
                    <SideBarAdminItems
                      onClick={toggleOpen}
                      variants={
                        window.innerWidth <= 1200
                          ? containerVariants
                          : containerVariants2
                      }
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                    >
                      <SideBarItem
                        onClick={() => setTab('billing')}
                        className={tab === 'billing' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <IoPeople />
                          <SideBarText>Administrar usuarios</SideBarText>
                        </SideBarContent>
                      </SideBarItem>
                      <SideBarItem
                        onClick={() => setTab('manageUsers')}
                        className={tab === 'manageUsers' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <BsAwardFill />
                          <SideBarText>Administrar premios</SideBarText>
                        </SideBarContent>
                      </SideBarItem>
                      <SideBarItem
                        onClick={() => setTab('manageAwards')}
                        className={tab === 'manageAwards' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <IoStorefront />
                          <SideBarText>Administrar servicios</SideBarText>
                        </SideBarContent>
                      </SideBarItem>

                      <SideBarItem
                        onClick={() => setTab('manageAppointments')}
                        className={tab === 'manageAppointments' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <IoCalendar />
                          <SideBarText>Administrar citas</SideBarText>
                        </SideBarContent>
                      </SideBarItem>
                    </SideBarAdminItems>
                  )}
                </AnimatePresence>
              </SideBarAdmin>
            )}
          </SideBarContainer>
        </SideBar>
        {/* -------------------- CONTENT ------------------- */}
        <Content>{!userLoaded.tab ? <TabLoader /> : <UserSettings />}</Content>
      </Container>
    </Grid>
  );
};

export default Profile;
