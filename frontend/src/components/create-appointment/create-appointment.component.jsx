import React, { useState, useEffect } from 'react';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import getHours from 'date-fns/getHours';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../../redux/appointments/appointmentsActions';
import {
  fetchServices,
  clearServices,
} from '../../redux/services/servicesActions';

// COMPONENTS
import Calendar from '../calendar/calendar.component';
import { registerLocale } from 'react-datepicker';
import SelectInput from '../form-inputs/select-input/select-input.component';
import TextAreaInput from '../form-inputs/textarea-input/textarea-input.component';
import TabLoader from '../loaders/tab-loader/tab-loader.component';
import {
  CalendarContainer,
  CustomMonthHeader,
} from '../calendar/calendar.components';

// STYLES
import {
  Container,
  Title,
  FormContainer,
  ButtonContainer,
  Button,
  LoaderContainer,
} from './create-appointment.styles';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const CreateAppointment = ({ loading, className }) => {
  // --------------------------- STATE AND CONSTANTS ------------------------
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    getHours(new Date()) >= 16
      ? setHours(addDays(new Date(), 1), 0)
      : setHours(new Date(), 0)
  );

  // console.log(service);
  // console.log(getDay(selectedDate));
  // console.log(selectedDate.toISOString());

  const dispatch = useDispatch();
  const { servicesData } = useSelector((state) => state.services);
  const {
    uiErrors,
    loading: { firstLoader },
  } = useSelector((state) => state.ui);

  const containerVariants = {
    hidden: {
      x: '-100vw',
    },
    visible: {
      x: 0,
      transition: {
        ease: 'easeInOut',
        when: 'beforeChildren',
      },
    },
    exit: {
      x: '100vw',
    },
  };

  // -------------------------- USE EFFECT'S ---------------------
  useEffect(() => {
    dispatch(fetchServices());

    return () => {
      dispatch(clearServices());
    };
  }, [dispatch]);

  // --------------------------- HANDLERS ------------------------
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() + 120 * 60000 < selectedDate.getTime();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!service) {
      setService(servicesData[0]._id);
    }
    dispatch(
      createAppointment(
        service || servicesData[0]._id,
        selectedDate.toISOString(),
        description
      )
    );
  };

  return (
    <>
      <Container
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {!loading ? (
          <LoaderContainer>
            <TabLoader className={className} />
          </LoaderContainer>
        ) : (
          <>
            <FormContainer>
              <Title className='animate__animated animate__fadeInDown'>
                Agendar cita
              </Title>
              <SelectInput
                label='Servicio'
                onChange={(e) => setService(e.target.value)}
                value={service}
              >
                {servicesData.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </SelectInput>
              <TextAreaInput
                name='description'
                type='text'
                handleChange={(e) => setDescription(e.target.value)}
                value={description}
                label='Descripción (Mascotas, especificaciones)'
                error={uiErrors.errorsOne.description}
                rows={2}
                required
              />
              <Calendar
                className='animate__animated animate__zoomIn'
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => {
                  return CustomMonthHeader(
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                  );
                }}
                calendarContainer={CalendarContainer}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                showTimeSelect
                locale='es'
                timeFormat='h:mm aaa'
                timeCaption={'Horario'}
                timeIntervals={60}
                minDate={
                  getHours(new Date()) >= 16
                    ? addDays(new Date(), 1)
                    : new Date()
                }
                maxDate={addDays(new Date(), 29)}
                minTime={
                  getDay(selectedDate) !== 6
                    ? setHours(setMinutes(new Date(), 0), 9)
                    : setHours(setMinutes(new Date(), 0), 10)
                }
                maxTime={
                  getDay(selectedDate) !== 6
                    ? setHours(setMinutes(new Date(), 0), 18)
                    : setHours(setMinutes(new Date(), 0), 14)
                }
                filterDate={(date) => date.getDay() !== 0}
                filterTime={filterPassedTime}
                dateFormat='MMMM d, yyyy h:mm aa'
                error={uiErrors.errorsOne.date}
              />
              <ButtonContainer>
                <Button
                  primary
                  type='submit'
                  loading={firstLoader}
                  disabled={firstLoader}
                  onClick={handleSubmit}
                >
                  Agendar
                </Button>
              </ButtonContainer>
            </FormContainer>
          </>
        )}
      </Container>
    </>
  );
};

export default CreateAppointment;
