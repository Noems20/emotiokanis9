import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { updateMe, updateMyPassword } from '../../../redux/user/userActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import FormInput from '../../form-input/form-input.component';

// STYLES
import {
  SettingsContainer,
  Settings,
  Title,
  Line,
  ChangeImage,
  UserImage,
  ImageInputLabel,
  ImageInput,
  Button,
} from './settings.styles';

const UserSettings = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [userPhoto, setUserPhoto] = useState('');
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

    try {
      setUserPhoto(
        require(`../../../../../backend/public/img/users/${user.photo}`).default
      );
    } catch {
      setUserPhoto(require(`../../../public/img/users/default.jpg`).default);
    }

    return () => {
      dispatch(clearUiErrors());
    };
  }, [setCredentials, user, dispatch]);

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
  };

  return (
    <SettingsContainer>
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
            <UserImage src={userPhoto} />
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
    </SettingsContainer>
  );
};

export default UserSettings;
