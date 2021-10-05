import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/user/userActions';

// COMPONENTS
import TextInput from '../form-inputs/text-input/text-input.component';
import CustomButton from '../custom-button/custom-button.component';

// STYLES
import {
  SignUpTitle,
  SignUpSubtitle,
  Container,
  FormContainer,
  ButtonsContainer,
} from './sign-up.styles';

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = userCredentials;

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { uiErrors, loading } = ui;

  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_UI_LOADING',
        payload: { secondLoader: false },
      });
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(signUp(name, email, password, passwordConfirm));
  };

  return (
    <Container>
      <SignUpTitle>No tengo una cuenta</SignUpTitle>
      <SignUpSubtitle>Registrate con tu email y contraseña.</SignUpSubtitle>
      <FormContainer onSubmit={handleSubmit}>
        <TextInput
          name='name'
          type='text'
          handleChange={handleChange}
          value={name}
          label='Nombre'
          error={uiErrors.errorsTwo.name}
        />{' '}
        <TextInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='Email'
          error={uiErrors.errorsTwo.email}
        />{' '}
        <TextInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='Contraseña'
          error={uiErrors.errorsTwo.password}
        />{' '}
        <TextInput
          name='passwordConfirm'
          type='password'
          handleChange={handleChange}
          value={passwordConfirm}
          label='Confirmar contraseña'
          error={uiErrors.errorsTwo.passwordConfirm}
        />
        <ButtonsContainer loading={loading.secondLoader ? 'true' : 'false'}>
          <CustomButton
            type='submit'
            loading={loading.secondLoader}
            disabled={loading.firstLoader || loading.secondLoader}
            primary
          >
            Crear cuenta
          </CustomButton>
        </ButtonsContainer>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
