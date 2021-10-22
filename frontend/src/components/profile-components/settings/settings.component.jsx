import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  updateMe,
  updateMyPassword,
  setUpdatedUser,
} from '../../../redux/user/userActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../form-inputs/text-input/text-input.component';

// STYLES
import {
  SettingsContainer,
  ChangeImage,
  UserImage,
  ImageInputLabel,
  ImageInput,
} from './settings.styles';

import { Title, Line, TabSubContainer, TabButton } from '../managers.styles.js';

const UserSettings = () => {
  // ---------------------- VARIABLES, CONSTANTS -------------------
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [imageHash, setImageHash] = useState(Date.now());
  const [selectedFile, setSelectedFile] = useState('');

  const { email, name, passwordCurrent, password, passwordConfirm } =
    credentials;

  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state) => state.user);
  const { uiErrors, loading } = useSelector((state) => state.ui);
  const userImageSrc = `/img/users/${user.photo}`;
  // console.log(userImageSrc);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
      },
    },
  };
  // -------------------------- USE EFFECTS --------------------
  useEffect(() => {
    // ----------- SET FORM VALUES AFTER SUBMIT -------
    setCredentials({
      name: user.name,
      email: user.email,
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    });

    // Clean up also runs after form submit because of
    // set credential dependency
    return () => {
      dispatch(clearUiErrors());
    };
  }, [setCredentials, user, dispatch]);

  useEffect(() => {
    // ---------- UPDATE USER PHOTO ---------
    if (userLoaded.updatedUser === true) {
      setImageHash(Date.now());
      dispatch(setUpdatedUser(false));
    }
  }, [dispatch, userLoaded]);

  // -------------------------- HANDLERS --------------------
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMe(email, name, selectedFile));
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
  };

  return (
    <SettingsContainer
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <TabSubContainer>
        <Title>Configuración de cuenta</Title>
        <form onSubmit={handleDetailsSubmit}>
          <TextInput
            name='name'
            type='text'
            handleChange={handleChange}
            value={name}
            label='Nombre'
            error={uiErrors.errorsOne.name}
          />
          <TextInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='Email'
            error={uiErrors.errorsOne.email}
            disabled
          />
          <ChangeImage>
            <UserImage src={`${userImageSrc}?${imageHash}`} />
            <ImageInputLabel
              htmlFor='photo'
              error={uiErrors.errorsOne.photo ? true : false}
              className={
                selectedFile ? !uiErrors.errorsOne.photo && 'selected' : ''
              }
            >
              {uiErrors.errorsOne.photo
                ? uiErrors.errorsOne.photo
                : selectedFile
                ? `${selectedFile.name}`
                : 'Seleccionar foto de usuario'}
            </ImageInputLabel>
            <ImageInput
              type='file'
              accept='image/*'
              // name='photo'
              id='photo'
              onChange={handleFile}
            />
          </ChangeImage>
          <TabButton
            type='submit'
            loading={loading.firstLoader}
            disabled={loading.firstLoader || loading.secondLoader}
            primary
          >
            Guardar configuración
          </TabButton>
        </form>
      </TabSubContainer>
      <Line />
      <TabSubContainer>
        <Title>Cambiar contraseña</Title>
        <form onSubmit={handlePasswordSubmit}>
          <TextInput
            name='passwordCurrent'
            type='password'
            handleChange={handleChange}
            value={passwordCurrent}
            label='Contraseña actual'
            error={uiErrors.errorsTwo.passwordCurrent}
          />
          <TextInput
            name='password'
            type='password'
            handleChange={handleChange}
            value={password}
            label='Nueva contraseña'
            error={uiErrors.errorsTwo.password}
          />
          <TextInput
            name='passwordConfirm'
            type='password'
            handleChange={handleChange}
            value={passwordConfirm}
            label='Confirmar contraseña'
            error={uiErrors.errorsTwo.passwordConfirm}
          />
          <TabButton
            type='submit'
            loading={loading.secondLoader}
            disabled={loading.secondLoader || loading.firstLoader}
            primary
          >
            Cambiar contraseña
          </TabButton>
        </form>
      </TabSubContainer>
    </SettingsContainer>
  );
};

export default UserSettings;
