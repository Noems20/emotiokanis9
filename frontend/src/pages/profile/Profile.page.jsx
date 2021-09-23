import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import FormInput from '../../components/form-input/form-input.component';

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
  Settings,
  Title,
  Line,
  ChangeImage,
  UserImage,
  ImageButton,
  Button,
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
  const [tab, setTab] = useState(null);
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const { email, name, currentPassword, password, confirmPassword } =
    credentials;

  const userData = useSelector((state) => state.user);
  const { user } = userData;

  useEffect(() => {
    setCredentials({
      name: user.name,
      email: user.email,
      currentPassword: '',
      password: '',
      confirmPassword: '',
    });

    if (window.innerWidth <= 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }

    function handleResize() {
      if (window.innerWidth > 1200) {
        setOpen(true);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setCredentials, user]);

  const toggleOpen = () => {
    if (window.innerWidth <= 1200) {
      setOpen(!open);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
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
        <Content>
          <Settings>
            <Title>Configuración de cuenta</Title>
            <form>
              <FormInput
                name='name'
                type='text'
                handleChange={handleChange}
                value={name}
                label='Nombre'
                // error={uiErrors.login.name}
              />
              <FormInput
                name='email'
                type='email'
                handleChange={handleChange}
                value={email}
                label='Email'
                // error={uiErrors.login.email}
              />
              <ChangeImage>
                <UserImage
                  src={
                    require(`../../../../backend/data/img/users/${user.photo}`)
                      .default
                  }
                />
                <ImageButton>Elige una nueva foto</ImageButton>
              </ChangeImage>
              <Button primary>Guardar configuración</Button>
            </form>
          </Settings>
          <Line />
          <Settings>
            <Title>Cambiar contraseña</Title>
            <form>
              <FormInput
                name='currentPassword'
                type='password'
                handleChange={handleChange}
                value={currentPassword}
                label='Contraseña actual'
                // error={uiErrors.login.name}
              />
              <FormInput
                name='password'
                type='password'
                handleChange={handleChange}
                value={password}
                label='Nueva contraseña'
                // error={uiErrors.login.name}
              />
              <FormInput
                name='confirmPassword'
                type='password'
                handleChange={handleChange}
                value={confirmPassword}
                label='Confirmar contraseña'
                // error={uiErrors.login.email}
              />
              <Button primary>Cambiar contraseña</Button>
            </form>
          </Settings>
        </Content>
      </Container>
    </Grid>
  );
};

export default Profile;
