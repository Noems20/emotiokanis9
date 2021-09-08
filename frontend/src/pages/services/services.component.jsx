import React from 'react';
import { Grid } from './services.styles';

import Service from '../../components/service/service.component';

import { servicesData } from './services-data';

const Services = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      <Grid
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {servicesData.map(({ id, ...otherProps }) => (
          <Service key={id} {...otherProps}></Service>
        ))}
      </Grid>
    </>
  );
};

export default Services;
