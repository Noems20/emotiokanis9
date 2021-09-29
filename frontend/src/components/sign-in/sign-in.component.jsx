import React, { useState, useEffect } from 'react';

// COMPONENTS
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user/userActions';

// STYLES
import {
  SignInTitle,
  SignInSubtitle,
  Message,
  Container,
  FormContainer,
  ForgotPasswordLink,
  ButtonsContainer,
} from './sign-in.styles';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { uiErrors, loading } = ui;

  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_UI_LOADING',
        payload: { firstLoader: false },
      });
    };
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(login(email, password));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Container>
      <SignInTitle>Ya tengo una cuenta</SignInTitle>
      <SignInSubtitle>Inicia sesión con tu email y contraseña.</SignInSubtitle>
      {uiErrors.errorsOne.general && (
        <Message
          title='Error'
          text='Email o contraseña incorrectos'
          type='error'
        />
      )}
      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='text'
          handleChange={handleChange}
          value={email}
          label='Email'
          error={uiErrors.errorsOne.email}
        />
        <FormInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='Contraseña'
          error={uiErrors.errorsOne.password}
        />
        <ButtonsContainer loading={loading.firstLoader ? 'true' : 'false'}>
          <CustomButton
            type='submit'
            loading={loading.firstLoader}
            disabled={loading.firstLoader || loading.secondLoader}
            primary
          >
            Iniciar Sesión
          </CustomButton>
          {/* <CustomButton type='button' isGoogleSignIn>
            Google
          </CustomButton> */}
        </ButtonsContainer>
        <ForgotPasswordLink to='/restablecerContraseña'>
          ¿Olvidaste tu contraseña?
        </ForgotPasswordLink>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
