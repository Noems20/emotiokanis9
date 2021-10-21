import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { sendContactEmail } from '../../redux/user/userActions';
import { clearSuccess } from '../../redux/ui/uiActions';

// COMPONENT
import ContactSection from '../../components/contact-section/contact-section.component';
import TextInput from '../../components/form-inputs/text-input/text-input.component';
import TextAreaInput from '../../components/form-inputs/textarea-input/textarea-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

// STYLES
import { TitleSm } from '../general.styles';
import { Container, Text } from './appointment-contact.styles';

// ICONS
import { RiMailSendLine } from 'react-icons/ri';

const AppointmentContact = ({ loading, user }) => {
  // ---------------------- STATE AND CONSTANTS -----------------------
  const [contactInfo, setContactInfo] = useState({
    subject: '',
    message: '',
  });
  const { subject, message } = contactInfo;

  const dispatch = useDispatch();
  const {
    success,
    uiErrors: { errorsOne },
    loading: { firstLoader },
  } = useSelector((state) => state.ui);

  // ---------------------- USE EFFECT -----------------------
  useEffect(() => {
    return () => {
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  // ------------------------- HANDLERS ------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendContactEmail(user.name, user.email, subject, message));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactInfo({ ...contactInfo, [name]: value });
  };

  return (
    <>
      {success ? (
        <Container
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ transition: { ease: 'easeInOut' } }}
        >
          <TitleSm>Correo enviado</TitleSm>
          <Text>
            Correo electrónico enviado correctamente, gracias por ponerte en
            contacto, responderemos a la brevedad.
          </Text>
          <RiMailSendLine />
        </Container>
      ) : (
        <ContactSection
          loading={loading}
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ transition: { ease: 'easeInOut' } }}
        >
          <TextInput
            name='subject'
            type='text'
            handleChange={handleChange}
            value={subject}
            label='Asunto'
            error={errorsOne.subject}
            required
          />
          <TextAreaInput
            name='message'
            type='text'
            handleChange={handleChange}
            value={message}
            label='Mensaje'
            error={errorsOne.message}
            rows='1'
            required
          />
          <CustomButton
            primary
            type='submit'
            onClick={handleSubmit}
            loading={firstLoader}
            disabled={firstLoader}
            style={{ justifySelf: 'start' }}
          >
            Enviar mensaje
          </CustomButton>
        </ContactSection>
      )}
    </>
  );
};

export default AppointmentContact;
