import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es-us';

// REDUX
import { useDispatch } from 'react-redux';
import { completeAppointment } from '../../redux/appointments/appointmentsActions';

// COMPONENTS
import CustomButton from '../custom-button/custom-button.component';

// STYLES
import {
  Container,
  ServiceHeading,
  ServiceTitle,
  ContentContainer,
  ServiceDescription,
  DetailsTitle,
  Description,
  Date,
  UserDetails,
  UserImage,
  Username,
} from './handle-appointment.styles';

const HandleAppointment = ({ id, service, date, description, user }) => {
  // -------------------------------------- STATE AND CONSTANTS ----------------------
  const [completeLoader, setCompleteLoader] = useState(false);

  const dispatch = useDispatch();

  // -------------------------------------- USE EFFECT  ----------------------
  // -------------------------------------- HANDLERS ----------------------
  const handleComplete = () => {
    setCompleteLoader(true);
    dispatch(completeAppointment(id));
  };

  return (
    <>
      <Container>
        <ServiceHeading url={`/img/services/${service.image}`}>
          <ServiceTitle>{service.name}</ServiceTitle>
        </ServiceHeading>
        <ContentContainer>
          <ServiceDescription>
            <DetailsTitle>Descripción</DetailsTitle>
            <Description>{description}</Description>
            <DetailsTitle>Fecha</DetailsTitle>
            <Date>{moment(date).format('LLLL')}</Date>
          </ServiceDescription>
          <UserDetails>
            <DetailsTitle>Usuario</DetailsTitle>
            <UserImage url={`/img/users/${user.photo}`} />
            <Username>{user.name}</Username>
            <CustomButton
              primary
              onClick={handleComplete}
              loading={completeLoader}
              disabled={completeLoader}
            >
              Completar cita
            </CustomButton>
          </UserDetails>
        </ContentContainer>
      </Container>
    </>
  );
};

export default HandleAppointment;
