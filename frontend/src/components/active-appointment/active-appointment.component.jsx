import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/es-us';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAppointment,
  updateAppointment,
} from '../../redux/appointments/appointmentsActions';
import { clearUiErrors } from '../../redux/ui/uiActions';
import {
  fetchServices,
  clearServices,
} from '../../redux/services/servicesActions';

// COMPONENTS
import Calendar from '../calendar/calendar.component';
import Modal from '../modal/modal.component';
import SelectInput from '../form-inputs/select-input/select-input.component';
import TextAreaInput from '../form-inputs/textarea-input/textarea-input.component';
import TabLoader from '../loaders/tab-loader/tab-loader.component';
import {
  CalendarContainer,
  CustomMonthHeader,
} from '../calendar/calendar.components';

// DATEPICKER
import es from 'date-fns/locale/es';
import { registerLocale } from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import getHours from 'date-fns/getHours';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';

// STYLES
import {
  Container,
  LoaderContainer,
  AppointmentContent,
  ServiceImage,
  AppointmentTitle,
  SubTitle,
  ServiceTitle,
  Description,
  AppointmentDate,
  ButtonsContainer,
  Button,
  Title,
  FormContainer,
} from './active-appointment.styles';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const ActiveAppointment = ({ loading, className, activeAppointment }) => {
  // --------------------------- STATE AND CONSTANTS ------------------------
  const imageSrc = `/img/services/${activeAppointment.service.image}`;
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [formDescription, setFormDescription] = useState('');
  const [formService, setFormService] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  // getHours(new Date()) >= 16
  //   ? setHours(addDays(new Date(), 1), 0)
  //   : setHours(new Date(), 0)
  const [modalOpen, setModalOpen] = useState(false);

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
  console.log(selectedDate);

  // -------------------------- USE EFFECT'S ---------------------
  useEffect(() => {
    setFormDescription(activeAppointment.description);
    setFormService(activeAppointment.service._id);
    setSelectedDate(new Date(activeAppointment.date));
  }, [activeAppointment]);

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

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateAppointment(
        activeAppointment._id,
        formService,
        selectedDate.toISOString(),
        formDescription
      )
    );
  };

  const handleDelete = () => {
    setDeleteLoader(true);
    dispatch(deleteAppointment(activeAppointment.id));
  };

  const handleClose = () => {
    dispatch(clearUiErrors());
    setFormDescription(activeAppointment.description);
    setFormService(activeAppointment.service._id);
    setSelectedDate(new Date(activeAppointment.date));
    setModalOpen(false);
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
            <AppointmentContent>
              <AppointmentTitle className='animate__animated animate__fadeInDown'>
                Cita actual
              </AppointmentTitle>
              <ServiceTitle className='animate__animated animate__fadeInLeft animate__slow'>
                <SubTitle>Servicio:</SubTitle> <br />
                {activeAppointment.service.name}
              </ServiceTitle>
              <ServiceImage
                url={imageSrc}
                className='animate__animated animate__fadeInRight animate__slow'
              />
              <AppointmentDate className='animate__animated animate__fadeInLeft animate__slow'>
                <SubTitle>Fecha y ubicación:</SubTitle> <br />
                {moment(activeAppointment.date).format('LLLL')}, <br />
                Preparatoria #236 B, Agronoma II,
                <br /> 98068 Zacatecas, Zac.
              </AppointmentDate>
              <Description className='animate__animated animate__fadeInLeft animate__slow'>
                <SubTitle>Descripción:</SubTitle> <br />
                {activeAppointment.description}
              </Description>
              <ButtonsContainer>
                <Button
                  primary
                  type='submit'
                  onClick={() => setModalOpen(true)}
                >
                  Editar cita
                </Button>
                <Button
                  danger
                  loading={deleteLoader}
                  disabled={deleteLoader}
                  onClick={handleDelete}
                >
                  Cancelar cita
                </Button>
              </ButtonsContainer>
            </AppointmentContent>
          </>
        )}
      </Container>
      {/* ----------------------- MODAL --------------------------------- */}
      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={handleClose}>
            <FormContainer onSubmit={handleUpdateSubmit}>
              <Title>Actualizar cita</Title>
              <SelectInput
                label='Servicio'
                onChange={(e) => setFormService(e.target.value)}
                value={formService}
              >
                {servicesData.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </SelectInput>
              <TextAreaInput
                name='formDescription'
                type='text'
                handleChange={(e) => setFormDescription(e.target.value)}
                value={formDescription}
                label='Descripción (Mascotas, especificaciones)'
                error={uiErrors.errorsOne.description}
                rows={3}
                required
              />
              <Calendar
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

              <Button
                primary
                type='submit'
                loading={firstLoader}
                disabled={firstLoader}
              >
                Actualizar cita
              </Button>
            </FormContainer>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActiveAppointment;
