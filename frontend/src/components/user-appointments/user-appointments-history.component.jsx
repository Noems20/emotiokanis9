import React from 'react';
import { useState } from 'react';
import AppointmentCard from '../appointment-card/appointment-card.component';

import {
  Container,
  AppointmentsContainer,
  Title,
  NotAppointments,
} from './user-appointments-history.styles';

const UserAppointments = () => {
  const [citas, setCitas] = useState(true);
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

  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: '100vw',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        // stiffness: 500,
        duration: 1,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,

      transition: {
        type: 'tween',
        // stiffness: 500,
        duration: 1,
      },
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
        <AppointmentsContainer variants={childVariants}>
          <Title variants={titleVariants}>Historial de citas</Title>
          {citas ? (
            <>
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
              <AppointmentCard variants={cardVariants} />
            </>
          ) : (
            <NotAppointments variants={cardVariants}>
              No tienes citas
            </NotAppointments>
          )}
        </AppointmentsContainer>
      </Container>
    </>
  );
};

export default UserAppointments;
