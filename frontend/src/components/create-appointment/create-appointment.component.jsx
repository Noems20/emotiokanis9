import React from 'react';
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import TextAreaInput from '../text-area-input/text-area-input.component';

import {
  Container,
  ContentWrapper,
  Title,
  FormContainer,
  ButtonContainer,
  Button,
} from './create-appointment.styles';

const CreateAppointment = () => {
  const [appointmentInfo, setAppointmentInfo] = useState({
    subject: '',
    date: '',
    description: '',
  });

  const { subject, date, description } = appointmentInfo;
  const handleSubmit = (event) => {
    event.preventDefault();

    setAppointmentInfo({
      subject: '',
      date: '',
      description: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAppointmentInfo({ ...appointmentInfo, [name]: value });
  };

  const containerVariants = {
    hidden: {
      x: '-100vw',
    },
    visible: {
      x: 0,
      transition: {
        ease: 'easeInOut',
        when: 'beforeChildren',
      },
    },
    exit: {
      x: '100vw',
    },
  };

  return (
    <>
      <Container
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <ContentWrapper>
          <Title>Agendar cita</Title>
          <FormContainer>
            <FormInput
              name='subject'
              type='text'
              handleChange={handleChange}
              value={subject}
              label='Asunto'
              required
            />
            <FormInput
              name='date'
              type='datetime-local'
              handleChange={handleChange}
              value={date}
              min='2017-06-01T08:30'
              max='2017-06-30T16:30'
              label='Fecha y hora'
              required
            />
            <TextAreaInput
              name='description'
              type='text'
              handleChange={handleChange}
              value={description}
              label='Descripción'
              rows={5}
              required
            />
          </FormContainer>
          <ButtonContainer>
            <Button primary type='submit' onClick={handleSubmit}>
              Agendar
            </Button>
          </ButtonContainer>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default CreateAppointment;
