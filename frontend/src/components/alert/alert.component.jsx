import React from 'react';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';

// REDUX
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';

// STYLES
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

const Alert = ({ title, text, button, type, className }) => {
  const dispatch = useDispatch();

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
    <Container type={type} className={className}>
      <Icon>{renderIcon(type)} </Icon>
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertText>{text}</AlertText>
        {button && <Button type={type}>{button}</Button>}
      </AlertContent>
      {button && <CloseIcon onClick={() => dispatch(setModalType(null))} />}
      <Decoration />
    </Container>
  );
};

export default Alert;
