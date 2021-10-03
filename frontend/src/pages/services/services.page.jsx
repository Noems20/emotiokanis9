import React, { useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../redux/services/servicesActions';

// COMPONENTS
import Service from '../../components/service/service.component';
import TabLoader from '../../components/loaders/tab-loader/tab-loader.component';

// STYLES
import { Grid } from './services.page.styles';

const Services = () => {
  const dispatch = useDispatch();
  const { servicesData } = useSelector((state) => state.services);
  const { loading } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

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
        loading={loading.fetchLoader}
      >
        {loading.fetchLoader ? (
          <TabLoader />
        ) : (
          servicesData.map(({ _id, ...otherProps }) => (
            <Service key={_id} {...otherProps}></Service>
          ))
        )}
      </Grid>
    </>
  );
};

export default Services;
