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
  Price,
  Button,
} from './service.styles';

const Service = ({ title, description, price, url }) => {
  return (
    <>
      <ServiceHeading url={url}>
        <ServiceTitle>{title}</ServiceTitle>
      </ServiceHeading>
      <ContentContainer>
        <ServiceDescription>
          <DescriptionTitle>Descripción</DescriptionTitle>
          <Description>{description}</Description>
        </ServiceDescription>
        <ServicePrice>
          <PriceTitle>Precio</PriceTitle>
          <Price>{price}</Price>
          <Button primary>Agendar cita</Button>
        </ServicePrice>
      </ContentContainer>
    </>
  );
};

export default Service;
