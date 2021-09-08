import React, { useState } from 'react';

import {
  Grid,
  Heading,
  Title,
  MapContainer,
  MapTitle,
  Button,
} from './contact.styles';
import ContactSection from '../../components/contact-section/contact-section.component';
import FormInput from '../../components/form-input/form-input.component';
import TextAreaInput from '../../components/text-area-input/text-area-input.component';
// import GoogleMap from '../../components/map/map.component';

const Contact = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    lastname: '',
    email: '',
    message: '',
  });
  const { displayName, lastname, email, message } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserCredentials({
      displayName: '',
      lastname: '',
      email: '',
      message: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <Grid
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <Heading>
          <Title>¿Tienes dudas?</Title>
        </Heading>
        <ContactSection>
          <FormInput
            name='displayName'
            type='text'
            handleChange={handleChange}
            value={displayName}
            label='Nombre'
            required
          />
          <FormInput
            name='lastname'
            type='text'
            handleChange={handleChange}
            value={lastname}
            label='Apellidos'
            required
          />
          <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='Email'
            required
          />
          <TextAreaInput
            name='message'
            type='text'
            handleChange={handleChange}
            value={message}
            label='Mensaje'
            rows='1'
            required
          />
          <Button primary type='submit' onClick={handleSubmit}>
            Enviar
          </Button>
        </ContactSection>
        {/* <GoogleMap /> */}
        <MapContainer>
          <MapTitle>Ubícanos</MapTitle>
          <iframe
            title='Map'
            frameBorder='0'
            scrolling='no'
            src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Copias%20No%C3%A9+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
          ></iframe>
        </MapContainer>
      </Grid>
    </>
  );
};

export default Contact;
