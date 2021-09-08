import React from 'react';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';

import { connect } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';

import {
  Container,
  Icon,
  AlertContent,
  AlertTitle,
  AlertText,
  Button,
  Decoration,
  CloseIcon,
} from './alert.styles';

const Alert = ({ title, text, button, type, setModalType }) => {
  const renderIcon = (type) => {
    switch (type) {
      case 'error':
        return <RiCloseCircleFill />;
      case 'success':
        return <RiCheckboxCircleFill />;
      default:
        return <RiCloseCircleFill />;
    }
  };

  return (
    <>
      <Container type={type}>
        <Icon>{renderIcon(type)} </Icon>
        <AlertContent>
          <AlertTitle>{title}</AlertTitle>
          <AlertText>{text}</AlertText>
          <Button type={type}>{button}</Button>
        </AlertContent>
        <CloseIcon onClick={() => setModalType(null)} />
        <Decoration />
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setModalType: (modal) => dispatch(setModalType(modal)),
});

export default connect(null, mapDispatchToProps)(Alert);
