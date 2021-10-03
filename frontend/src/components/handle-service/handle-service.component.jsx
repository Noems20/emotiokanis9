import React from 'react';

import {
  Container,
  ServiceHeading,
  ServiceTitle,
  ContentContainer,
  ServiceDescription,
  DescriptionTitle,
  Description,
  ServicePrice,
  PriceTitle,
  PriceLapse,
  Price,
  ButtonsContainer,
  Button,
} from './handle-service.styles';

const HandleService = ({ name, description, priceLapse, price, image }) => {
  return (
    <Container>
      <ServiceHeading
        url={
          require(`../../../../backend/public/img/services/${image}`).default
        }
      >
        <ServiceTitle>{name}</ServiceTitle>
      </ServiceHeading>
      <ContentContainer>
        <ServiceDescription>
          <DescriptionTitle>Descripción</DescriptionTitle>
          <Description>{description}</Description>
        </ServiceDescription>
        <ServicePrice>
          <PriceTitle>Precio</PriceTitle>
          {priceLapse && <PriceLapse>{priceLapse}</PriceLapse>}

          <Price>${price}</Price>
          <ButtonsContainer>
            <Button primary>Editar servicio</Button>
            <Button primary danger={true}>
              Eliminar servicio
            </Button>
          </ButtonsContainer>
        </ServicePrice>
      </ContentContainer>
    </Container>
  );
};

export default HandleService;
