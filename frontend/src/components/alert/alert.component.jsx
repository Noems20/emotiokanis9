import React from 'react';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';

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

const Alert = ({ title, text, button, type, handleClose, className }) => {
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
      {button && <CloseIcon onClick={handleClose} />}
      <Decoration />
    </Container>
  );
};

export default Alert;
