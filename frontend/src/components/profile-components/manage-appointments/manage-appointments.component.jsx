import React, { useEffect } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAppointments,
  clearAppointments,
} from '../../../redux/appointments/appointmentsActions';
import HandleAppointment from '../../handle-appointment/handle-appointment.component';

// COMPONENTS
import TabLoader from '../../loaders/tab-loader/tab-loader.component';

// STYLES
import { ManageItems, Title } from '../managers.styles.js';
import { TabContainerModified } from './manage-appointments.styles';

const ManageAppointments = () => {
  // -------------------------- STATE AND CONSTANTS ---------------
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { appointments } = useSelector((state) => state.appointments);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
      },
    },
  };

  // ------------------------- USE EFFECT ---------------------
  useEffect(() => {
    dispatch(fetchAppointments());
    return () => {
      dispatch(clearAppointments());
    };
  }, [dispatch]);

  // ------------------------- HANDLERS ---------------------

  return (
    <TabContainerModified
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <ManageItems loading={loading.fetchLoader ? 'true' : 'false'}>
        <Title>Administrar citas</Title>
        {loading.fetchLoader ? (
          <TabLoader />
        ) : (
          appointments.map(({ _id, ...otherProps }) => (
            <HandleAppointment
              key={_id}
              id={_id}
              {...otherProps}
            ></HandleAppointment>
          ))
        )}
      </ManageItems>
    </TabContainerModified>
  );
};

export default ManageAppointments;
