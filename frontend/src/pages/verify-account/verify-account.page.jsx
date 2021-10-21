import React, { useEffect } from 'react';
import { useParams } from 'react-router';

// REDUX
import { useDispatch, useSelector, batch } from 'react-redux';
import { clearUiErrors, clearSuccess } from '../../redux/ui/uiActions';

// COMPONENTS
import CustomButton from '../../components/custom-button/custom-button.component';

// STYLES
import {
  Grid,
  FormContainer,
  Container,
  Title,
  Text,
  Message,
} from './verify-account.styles';

// ICONS
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { verifyAccount } from '../../redux/user/userActions';

const VerifyAccount = () => {
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
    dispatch(verifyAccount(token));
  };

  return (
    <Grid>
      <FormContainer>
        {success ? (
          <Container>
            <Title>Cuenta verificada correctamente</Title>
            <Text>Espere un momento, se iniciará sesión automáticamente.</Text>
            <IoMdCheckmarkCircleOutline />
          </Container>
        ) : (
          <Container as='form' onSubmit={handleSubmit}>
            <Title>Verificar cuenta</Title>
            {uiErrors.errorsOne.general && (
              <Message
                title='Error'
                text={uiErrors.errorsOne.general}
                type='error'
              />
            )}
            <Text>
              Da click en el botón para verificar tu cuenta de EmotioKanis9.
            </Text>
            <CustomButton
              type='submit'
              loading={loading.firstLoader}
              disabled={loading.firstLoader}
              primary
            >
              Verificar cuenta
            </CustomButton>
          </Container>
        )}
      </FormContainer>
    </Grid>
  );
};

export default VerifyAccount;
