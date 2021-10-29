import React from 'react';

// COMPONENTS
import ButtonLink from '../button-link/button-link.component';

// STYLES
import {
  ServiceHeading,
  ServiceTitle,
  ContentContainer,
  ServiceDescription,
  Title,
  Description,
  ServicePrice,
  PriceLapse,
  Price,
} from './service.styles';

const Service = ({ name, description, priceLapse, price, image }) => {
  return (
    <>
      <ServiceHeading url={`/img/services/${image}`}>
        <ServiceTitle>{name}</ServiceTitle>
      </ServiceHeading>
      <ContentContainer>
        <ServiceDescription>
          <Title>Descripción</Title>
          <Description>{description}</Description>
        </ServiceDescription>
        <ServicePrice>
          <Title>Precio</Title>
          {priceLapse && <PriceLapse>{priceLapse}</PriceLapse>}

          <Price>${price}</Price>
          <ButtonLink to='/citas'>Agendar cita</ButtonLink>
        </ServicePrice>
      </ContentContainer>
    </>
  );
};

export default Service;
