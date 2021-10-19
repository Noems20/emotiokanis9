import React, { useState } from 'react';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import getHours from 'date-fns/getHours';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';

// COMPONENTS
import DatePicker, { registerLocale } from 'react-datepicker';
import TextInput from '../form-inputs/text-input/text-input.component';
import TextAreaInput from '../form-inputs/textarea-input/textarea-input.component';
import TabLoader from '../loaders/tab-loader/tab-loader.component';
import {
  CalendarContainer,
  CustomMonthHeader,
} from '../calendar/calendar.components';

// STYLES
import {
  Container,
  ContentWrapper,
  Title,
  FormContainer,
  DateInputContainer,
  ButtonContainer,
  Button,
  LoaderContainer,
} from './create-appointment.styles';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const CreateAppointment = ({ loading, className }) => {
  // --------------------------- STATE AND CONSTANTS ------------------------
  const [appointmentInfo, setAppointmentInfo] = useState({
    subject: '',
    description: '',
  });

  const [selectedDate, setSelectedDate] = useState(
    getHours(new Date()) >= 19
      ? setHours(addDays(new Date(), 1), 0)
      : setHours(new Date(), 0)
  );
  // console.log(getDay(selectedDate));
  // console.log(selectedDate);
  const { subject, description } = appointmentInfo;

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

  // --------------------------- HANDLERS ------------------------
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() + 120 * 60000 < selectedDate.getTime();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setAppointmentInfo({
      subject: '',
      date: '',
      description: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAppointmentInfo({ ...appointmentInfo, [name]: value });
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
              <Title>Agendar cita</Title>
              <FormContainer>
                <TextInput
                  name='subject'
                  type='text'
                  handleChange={handleChange}
                  value={subject}
                  label='Asunto'
                  required
                />
                <DateInputContainer>
                  <DatePicker
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
                      getHours(new Date()) >= 19
                        ? addDays(new Date(), 1)
                        : new Date()
                    }
                    maxDate={addDays(new Date(), 29)}
                    minTime={
                      getDay(selectedDate) !== 6
                        ? setHours(setMinutes(new Date(), 0), 8)
                        : setHours(setMinutes(new Date(), 0), 9)
                    }
                    maxTime={
                      getDay(selectedDate) !== 6
                        ? setHours(setMinutes(new Date(), 0), 19)
                        : setHours(setMinutes(new Date(), 0), 14)
                    }
                    filterDate={(date) => date.getDay() !== 0}
                    filterTime={filterPassedTime}
                    dateFormat='MMMM d, yyyy h:mm aa'
                  />
                </DateInputContainer>
                <TextAreaInput
                  name='description'
                  type='text'
                  handleChange={handleChange}
                  value={description}
                  label='Descripción'
                  rows={1}
                  required
                />
              </FormContainer>
              <ButtonContainer>
                <Button primary type='submit' onClick={handleSubmit}>
                  Agendar
                </Button>
              </ButtonContainer>
            </>
          )}
        </ContentWrapper>
      </Container>
    </>
  );
};

export default CreateAppointment;
