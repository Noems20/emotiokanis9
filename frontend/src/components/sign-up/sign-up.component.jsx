import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/user/userActions';
import { clearSuccess } from '../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../form-inputs/text-input/text-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { TitleSm } from '../general.styles';

// STYLES
import {
  SignUpTitle,
  SignUpSubtitle,
  Container,
  FormContainer,
  ButtonsContainer,
  EmailContainer,
  Text,
} from './sign-up.styles';

// ICONS
import { RiMailSendLine } from 'react-icons/ri';

const SignUp = () => {
  // ------------------------ STATE AND CONSTANTS -----------------------
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = userCredentials;

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { uiErrors, loading, success } = ui;

  // ------------------------ USE EFFECT -----------------------

  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_UI_LOADING',
        payload: { secondLoader: false },
      });
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  // ------------------------ HANDLERS -----------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUp(name, email, password, passwordConfirm));
  };

  return (
    <>
      {success ? (
        <EmailContainer
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ transition: { ease: 'easeInOut' } }}
        >
          <TitleSm>Cuenta creada</TitleSm>
          <Text>
            Hemos enviado un correo electrónico a tu Email, por favor sigue las
            instrucciones para verificar tu cuenta.
          </Text>
          <RiMailSendLine />
        </EmailContainer>
      ) : (
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
            />
            <TextInput
              name='email'
              type='email'
              handleChange={handleChange}
              value={email}
              label='Email'
              error={uiErrors.errorsTwo.email}
            />
            <TextInput
              name='password'
              type='password'
              handleChange={handleChange}
              value={password}
              label='Contraseña'
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
      )}
    </>
  );
};

export default SignUp;
