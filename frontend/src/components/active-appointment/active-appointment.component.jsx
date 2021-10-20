import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/es-us';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  createAppointment,
  cancelAppointment,
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
  ContentWrapper,
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
  const [selectedDate, setSelectedDate] = useState(
    getHours(new Date()) >= 16
      ? setHours(addDays(new Date(), 1), 0)
      : setHours(new Date(), 0)
  );
  const [modalOpen, setModalOpen] = useState(false);

  // console.log(service);
  // console.log(getDay(selectedDate));
  // console.log(selectedDate.toISOString());

  const dispatch = useDispatch();
  const { servicesData } = useSelector((state) => state.services);
  const {
    uiErrors,
    loading: { secondLoader },
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
    setFormDescription(activeAppointment.description);
    setFormService(activeAppointment.service._id);

    return () => {
      dispatch(clearServices());
    };
  }, [dispatch, activeAppointment]);

  // --------------------------- HANDLERS ------------------------
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() + 120 * 60000 < selectedDate.getTime();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formService) {
      setFormService(servicesData[0]._id);
    }
    dispatch(
      createAppointment(
        formService || servicesData[0]._id,
        selectedDate.toISOString(),
        formDescription
      )
    );
  };

  const handleDelete = () => {
    setDeleteLoader(true);
    dispatch(cancelAppointment(activeAppointment.id));
  };

  const handleClose = () => {
    dispatch(clearUiErrors());
    //   setServiceData({
    //     formName: name,
    //     formDescription: description,
    //     formPriceLapse: priceLapse ? priceLapse : '',
    //     formPrice: price,
    //   });
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
        <ContentWrapper>
          {!loading ? (
            <LoaderContainer>
              <TabLoader className={className} />
            </LoaderContainer>
          ) : (
            <>
              <AppointmentContent>
                <AppointmentTitle>Cita actual</AppointmentTitle>
                <ServiceTitle>
                  <SubTitle>Servicio:</SubTitle> <br />
                  {activeAppointment.service.name}
                </ServiceTitle>
                <ServiceImage src={imageSrc} />
                <AppointmentDate>
                  <SubTitle>Fecha y ubicación:</SubTitle> <br />
                  {moment(activeAppointment.date).format('LLLL')}, <br />
                  Preparatoria #236 B, Agronoma II, 98068 Zacatecas, Zac.
                </AppointmentDate>
                <Description>
                  <SubTitle>Descripción:</SubTitle> <br />
                  {activeAppointment.description}
                </Description>
                <ButtonsContainer>
                  <Button
                    primary
                    type='submit'
                    loading={secondLoader}
                    disabled={secondLoader}
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
        </ContentWrapper>
      </Container>
      {/* ----------------------- MODAL --------------------------------- */}
      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={handleClose}>
            <FormContainer onSubmit={handleSubmit}>
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
                label='Descripción (Num. de mascotas, consideraciones especiales)'
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
                loading={loading.secondLoader}
                disabled={loading.secondLoader}
              >
                Actualizar servicio
              </Button>
            </FormContainer>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActiveAppointment;
