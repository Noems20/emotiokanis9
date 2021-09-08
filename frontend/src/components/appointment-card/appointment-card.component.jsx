import React from 'react';
import { connect } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';

import {
  Container,
  CardHeading,
  CardHeadingTitle,
  CardHeadingDate,
  CardIcons,
  CloseIcon,
  EditIcon,
  FinishedText,
  CardBody,
  CardBodyTitle,
  CardBodyDescription,
} from './appointment-card.styles';

const AppointmentCard = ({ setModalType, variants, active }) => {
  return (
    <>
      <Container variants={variants}>
        <CardHeading>
          <CardHeadingTitle>Soy el titulo</CardHeadingTitle>
          <CardHeadingDate>
            Dia: 11/02/2000
            <br />
            Hora: 7:00pm
          </CardHeadingDate>

          {active ? (
            <CardIcons>
              <EditIcon key={1} onClick={() => setModalType('edit')} />
              <CloseIcon key={2} onClick={() => setModalType('delete')} />
            </CardIcons>
          ) : (
            <FinishedText key={3}>Finalizada</FinishedText>
          )}
        </CardHeading>
        <CardBody>
          <CardBodyTitle>Descripción</CardBodyTitle>
          <CardBodyDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            quibusdam repellendus eum fugiat quia esse iure quaerat fugit
            impedit dolore, voluptatem, quae ad assumenda expedita sint unde ea
            a at.
          </CardBodyDescription>
        </CardBody>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setModalType: (modal) => dispatch(setModalType(modal)),
});

export default connect(null, mapDispatchToProps)(AppointmentCard);
