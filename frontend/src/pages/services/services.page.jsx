import React, { useState, useEffect } from 'react';
import axios from 'axios';

// DATA
// import { servicesData } from './services-data';

// COMPONENTS
import Service from '../../components/service/service.component';

// STYLES
import { Grid } from './services.page.styles';

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`/api/v1/services`);
    setServicesData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {servicesData.map(({ _id, ...otherProps }) => (
          <Service key={_id} {...otherProps}></Service>
        ))}
      </Grid>
    </>
  );
};

export default Services;
