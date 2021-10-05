import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/user/userActions';
import { clearUiErrors, clearSuccess } from '../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../components/form-inputs/text-input/text-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

// STYLES
import {
  Grid,
  FormContainer,
  Container,
  Title,
  Text,
} from './forgot-password.styles';

// ICONS
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { uiErrors, loading, success } = useSelector((state) => state.ui);

  useEffect(() => {
    return () => {
      dispatch(clearUiErrors());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Grid>
      <FormContainer>
        {success ? (
          <Container>
            <Title>Correo enviado</Title>
            <Text>
              Revisa tu correo electrónico y sigue las instrucciones para
              recuperar tu contraseña.
            </Text>
            <IoMdCheckmarkCircleOutline />
          </Container>
        ) : (
          <Container as='form' onSubmit={handleSubmit}>
            <Title>Ayuda con la contraseña</Title>
            <Text>
              Escribe la dirección de correo electrónico asociado a tu cuenta de
              EmotioKanis9.
            </Text>
            <TextInput
              name='email'
              type='text'
              handleChange={handleChange}
              value={email}
              label='Email'
              error={uiErrors.errorsOne.email}
            />
            <CustomButton
              type='submit'
              loading={loading.firstLoader}
              disabled={loading.firstLoader || loading.secondLoader}
              primary
            >
              Enviar correo
            </CustomButton>
          </Container>
        )}
      </FormContainer>
    </Grid>
  );
};

export default ForgotPassword;
