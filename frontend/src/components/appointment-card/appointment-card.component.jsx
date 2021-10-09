import React, { useState } from 'react';
import Alert from '../alert/alert.component';
import Modal from '../modal/modal.component';

// STYLES
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

const AppointmentCard = ({ variants, active }) => {
  const [modalType, setModalType] = useState();

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

      {modalType === 'edit' && (
        <Modal>
          <Alert
            title='¡Exito!'
            text='Tu cuenta ha sido creada correctamente'
            button='Continuar'
            handleClose={() => setModalType(null)}
            type='success'
          />
        </Modal>
      )}
      {modalType === 'delete' && (
        <Modal>
          <Alert
            title='¡Cuidado!'
            text='¿Estas seguro de que deseas cancelar tu cita?'
            button='Cancelar cita'
            handleClose={() => setModalType(null)}
            type='error'
          />
        </Modal>
      )}
    </>
  );
};

export default AppointmentCard;
