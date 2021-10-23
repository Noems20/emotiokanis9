import React from 'react';

// COMPONENTS
import { NavLink } from 'react-router-dom';

// STYLES
import { Title, Subtitle, Container, Text, Button } from './not-found.styles';

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>¡OOPS! Página no encontrada</Subtitle>
      <Text>
        Lo sentimos, pero la página que estas buscando no existe, ha sido
        eliminada, su nombre ha cambiado o no está disponible
      </Text>
      <Button as={NavLink} to='/' exact>
        Volver a inicio
      </Button>
    </Container>
  );
};

export default NotFound;
