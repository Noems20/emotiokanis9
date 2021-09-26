import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { updateMe, updateMyPassword } from '../../redux/user/userActions';
import { clearUiErrors } from '../../redux/ui/uiActions';

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
  ImageInputLabel,
  ImageInput,
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
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const { email, name, passwordCurrent, password, passwordConfirm } =
    credentials;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { uiErrors, loading } = useSelector((state) => state.ui);

  useEffect(() => {
    setCredentials({
      name: user.name,
      email: user.email,
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    });

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
      dispatch(clearUiErrors());
    };
  }, [setCredentials, user, dispatch]);

  const toggleOpen = () => {
    if (window.innerWidth <= 1200) {
      setOpen(!open);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMe(email, name, selectedFile));
    setSelectedFile('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyPassword(passwordCurrent, password, passwordConfirm));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    // console.log(e.target.files[0]);
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
            <form onSubmit={handleDetailsSubmit}>
              <FormInput
                name='name'
                type='text'
                handleChange={handleChange}
                value={name}
                label='Nombre'
                error={uiErrors.detailsChange.name}
              />
              <FormInput
                name='email'
                type='email'
                handleChange={handleChange}
                value={email}
                label='Email'
                error={uiErrors.detailsChange.email}
              />
              <ChangeImage>
                <UserImage
                  src={
                    require(`../../../../backend/data/img/users/${user.photo}`)
                      .default
                  }
                />
                <ImageInputLabel htmlFor='photo'>Cambiar foto</ImageInputLabel>
                <ImageInput
                  type='file'
                  accept='image/*'
                  // name='photo'
                  id='photo'
                  onChange={handleFile}
                />
              </ChangeImage>
              <Button
                type='submit'
                loading={loading.firstLoader}
                disabled={loading.firstLoader || loading.secondLoader}
                primary
              >
                {loading.firstLoader ? '' : 'Guardar configuración'}
              </Button>
            </form>
          </Settings>
          <Line />
          <Settings>
            <Title>Cambiar contraseña</Title>
            <form onSubmit={handlePasswordSubmit}>
              <FormInput
                name='passwordCurrent'
                type='password'
                handleChange={handleChange}
                value={passwordCurrent}
                label='Contraseña actual'
                error={uiErrors.passwordChange.passwordCurrent}
              />
              <FormInput
                name='password'
                type='password'
                handleChange={handleChange}
                value={password}
                label='Nueva contraseña'
                error={uiErrors.passwordChange.password}
              />
              <FormInput
                name='passwordConfirm'
                type='password'
                handleChange={handleChange}
                value={passwordConfirm}
                label='Confirmar contraseña'
                error={uiErrors.passwordChange.passwordConfirm}
              />
              <Button
                type='submit'
                loading={loading.secondLoader}
                disabled={loading.secondLoader || loading.firstLoader}
                primary
              >
                {loading.secondLoader ? '' : 'Cambiar contraseña'}
              </Button>
            </form>
          </Settings>
        </Content>
      </Container>
    </Grid>
  );
};

export default Profile;
