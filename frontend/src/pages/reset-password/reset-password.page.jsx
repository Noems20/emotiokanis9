import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// REDUX
import { useDispatch, useSelector, batch } from 'react-redux';
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
  Message,
} from './reset-password.styles';

// ICONS
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { resetPassword } from '../../redux/user/userActions';

const ResetPassword = () => {
  const [userCredentials, SetUserCredentials] = useState({
    password: '',
    passwordConfirm: '',
  });

  const { password, passwordConfirm } = userCredentials;

  const { token } = useParams();
  const dispatch = useDispatch();
  const { uiErrors, loading, success } = useSelector((state) => state.ui);

  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(clearUiErrors());
        dispatch(clearSuccess());
      });
    };
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(password, passwordConfirm, token));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // [] -> To access variable not only plain text for name property
    SetUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Grid>
      <FormContainer>
        {success ? (
          <Container>
            <Title>Contraseña modificada correctamente </Title>
            <Text>Espere un momento, se iniciará sesión automáticamente.</Text>
            <IoMdCheckmarkCircleOutline />
          </Container>
        ) : (
          <Container as='form' onSubmit={handleSubmit}>
            <Title>Nueva contraseña</Title>
            {uiErrors.errorsOne.general && (
              <Message
                title='Error'
                text={uiErrors.errorsOne.general}
                type='error'
              />
            )}
            <Text>
              Escribe la nueva contraseña para tu cuenta de EmotioKanis9.
            </Text>
            <TextInput
              name='password'
              type='password'
              handleChange={handleChange}
              value={password}
              label='Contraseña'
              error={uiErrors.errorsOne.password}
            />
            <TextInput
              name='passwordConfirm'
              type='password'
              handleChange={handleChange}
              value={passwordConfirm}
              label='Confirmar contraseña'
              error={uiErrors.errorsOne.passwordConfirm}
            />
            <CustomButton
              type='submit'
              loading={loading.firstLoader}
              disabled={loading.firstLoader || loading.secondLoader}
              primary
            >
              Restablecer contraseña
            </CustomButton>
          </Container>
        )}
      </FormContainer>
    </Grid>
  );
};

export default ResetPassword;
