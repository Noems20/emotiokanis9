import React from 'react';
import moment from 'moment';
import 'moment/locale/es-us';

// STYLES
import {
  Container,
  CardHeading,
  CardHeadingTitle,
  CardHeadingDate,
  StatusHeader,
  // CloseIcon,
  FinishedText,
  CardBody,
  CardBodyTitle,
  CardBodyDescription,
} from './appointment-card.styles';

const AppointmentCard = ({ variants, appointment }) => {
  return (
    <>
      <Container variants={variants}>
        <CardHeading>
          <CardHeadingTitle>{appointment.service.name}</CardHeadingTitle>
          <CardHeadingDate>
            {moment(appointment.date).format('LLL')}
          </CardHeadingDate>
          <StatusHeader>
            <FinishedText>Finalizada</FinishedText>
            {/* <CloseIcon /> */}
          </StatusHeader>
        </CardHeading>
        <CardBody>
          <CardBodyTitle>Descripción</CardBodyTitle>
          <CardBodyDescription>{appointment.description}</CardBodyDescription>
        </CardBody>
      </Container>
    </>
  );
};

export default AppointmentCard;
