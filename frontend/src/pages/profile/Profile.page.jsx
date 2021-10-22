import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../../redux/user/userActions';

// COMPONENTS
import TabLoader from '../../components/loaders/tab-loader/tab-loader.component';
import UserSettings from '../../components/profile-components/settings/settings.component';
import ManageUsers from '../../components/profile-components/manage-users/manage-users.component';
import ManageAwards from '../../components/profile-components/manage-awards/manage-awards.component';
import ManageServices from '../../components/profile-components/manage-services/manage-services.component';
import ManageAppointments from '../../components/profile-components/manage-appointments/manage-appointments.component';

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
  // ------------------------------- STATE AND CONSTANTS ----------------------
  const [tab, setTab] = useState('settings');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state) => state.user);

  // ----------------------------- RENDER TAB ----------------------
  const renderSwitch = (tab) => {
    switch (tab) {
      case 'settings':
        return <UserSettings />;
      case 'manageServices':
        return <ManageServices />;
      case 'manageAwards':
        return <ManageAwards />;
      case 'manageAppointments':
        return <ManageAppointments />;
      case 'manageUsers':
        return <ManageUsers id={user._id} />;
      default:
        return <UserSettings />;
    }
  };

  // ---------------------- EXTRA CONFIGURATION ------------

  useEffect(() => {
    dispatch(checkUser());
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
  }, [dispatch]);

  const toggleOpen = () => {
    if (window.innerWidth <= 1200) {
      setOpen(!open);
    }
  };

  const handleTabChange = (tab) => {
    dispatch(checkUser());
    setTab(tab);
  };

  return (
    <Grid>
      <Container>
        {/* -------------------- SIDEBAR ------------------- */}
        <SideBar>
          <SideBarContainer>
            <SideBarItem
              onClick={() => handleTabChange('settings')}
              className={tab === 'settings' ? 'active' : ''}
            >
              <SideBarContent>
                <IoSettingsSharp />
                <SideBarText>Configuración</SideBarText>
              </SideBarContent>
            </SideBarItem>
            <SideBarItem
              onClick={() => handleTabChange('pets')}
              className={tab === 'pets' ? 'active' : ''}
            >
              <SideBarContent>
                <IoPawSharp />
                <SideBarText>Mascotas</SideBarText>
              </SideBarContent>
            </SideBarItem>
            <SideBarItem
              onClick={() => handleTabChange('billing')}
              className={tab === 'billing' ? 'active' : ''}
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
                        onClick={() => handleTabChange('manageUsers')}
                        className={tab === 'manageUsers' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <IoPeople />
                          <SideBarText>Administrar usuarios</SideBarText>
                        </SideBarContent>
                      </SideBarItem>
                      <SideBarItem
                        onClick={() => handleTabChange('manageAwards')}
                        className={tab === 'manageAwards' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <BsAwardFill />
                          <SideBarText>Administrar premios</SideBarText>
                        </SideBarContent>
                      </SideBarItem>
                      <SideBarItem
                        onClick={() => handleTabChange('manageServices')}
                        className={tab === 'manageServices' ? 'active' : ''}
                      >
                        <SideBarContent>
                          <IoStorefront />
                          <SideBarText>Administrar servicios</SideBarText>
                        </SideBarContent>
                      </SideBarItem>

                      <SideBarItem
                        onClick={() => handleTabChange('manageAppointments')}
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
        <Content>
          {!userLoaded.tab ? (
            <TabLoader />
          ) : (
            <AnimatePresence exitBeforeEnter>
              {renderSwitch(tab)}
            </AnimatePresence>
          )}
        </Content>
      </Container>
    </Grid>
  );
};

export default Profile;
