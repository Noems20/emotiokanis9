import React from 'react';

// REDUX
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';

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
  const dispatch = useDispatch();

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
              <EditIcon
                key={1}
                onClick={() => dispatch(setModalType('edit'))}
              />
              <CloseIcon
                key={2}
                onClick={() => dispatch(setModalType('delete'))}
              />
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

export default AppointmentCard;
