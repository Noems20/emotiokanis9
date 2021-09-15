import React, { useState } from 'react';

// COMPONENTS
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// REDUX
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user/userActions';

// STYLES
import {
  SignInTitle,
  SignInSubtitle,
  Container,
  FormContainer,
  ButtonsContainer,
} from './sign-in.styles';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const dispatch = useDispatch();

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
      <SignInSubtitle>Inicia sesión con tu correo y contraseña.</SignInSubtitle>
      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='text'
          handleChange={handleChange}
          value={email}
          label='Email'
          required
        />
        <FormInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='Contraseña'
          required
        />
        <ButtonsContainer>
          <CustomButton type='submit' primary>
            Iniciar Sesión
          </CustomButton>
          <CustomButton type='button' isGoogleSignIn>
            Google
          </CustomButton>
        </ButtonsContainer>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
