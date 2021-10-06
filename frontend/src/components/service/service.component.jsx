import React from 'react';

import {
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
  Button,
} from './service.styles';

const Service = ({ name, description, priceLapse, price, image }) => {
  return (
    <>
      <ServiceHeading url={`/img/services/${image}`}>
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
          <Button primary>Agendar cita</Button>
        </ServicePrice>
      </ContentContainer>
    </>
  );
};

export default Service;
