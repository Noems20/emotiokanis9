import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../../redux/user/userActions';

// COMPONENTS
import CreateAppointment from '../../components/create-appointment/create-appointment.component';
import UserAppointmentsHistory from '../../components/user-appointments/user-appointments-history.component';
import ContactSection from '../../components/contact-section/contact-section.component';
import TextInput from '../../components/form-inputs/text-input/text-input.component';
import TextAreaInput from '../../components/form-inputs/textarea-input/textarea-input.component';

// STYLES
import {
  Grid,
  SideBar,
  SideBarContainer,
  SideBarItem,
  SideBarContent,
  SideBarText,
  Button,
} from './appointments.page.styles';

// ICONS
import { BsFillCalendarFill, BsClockHistory } from 'react-icons/bs';
import { MdContactPhone } from 'react-icons/md';

const Appointments = () => {
  // ---------------------- STATE AND CONSTANTS -----------------------
  const [contactInfo, setContactInfo] = useState({
    subject: '',
    message: '',
  });

  const [tab, setTab] = useState('activeAppointments');
  const { subject, message } = contactInfo;

  const dispatch = useDispatch();
  const { userLoaded } = useSelector((state) => state.user);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  // ---------------------- USE EFFECT -----------------------

  useEffect(() => {
    dispatch(checkUser());
  }, [tab, dispatch]);

  // ---------------------- RENDER SWITCH -----------------------
  const renderSwitch = (tab) => {
    switch (tab) {
      case 'activeAppointments':
        return <CreateAppointment loading={userLoaded.tab} key={1} />;
      case 'myAppointments':
        return (
          <UserAppointmentsHistory loading={userLoaded.tab} setTab={setTab} />
        );
      case 'contact':
        return (
          <ContactSection
            key={4}
            loading={userLoaded.tab}
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ transition: { ease: 'easeInOut' } }}
          >
            <TextInput
              name='subject'
              type='text'
              handleChange={handleChange}
              value={subject}
              label='Asunto'
              required
            />
            <TextAreaInput
              name='message'
              type='text'
              handleChange={handleChange}
              value={message}
              label='Mensaje'
              rows='1'
              required
            />
            <Button primary type='submit' onClick={handleSubmit}>
              Enviar
            </Button>
          </ContactSection>
        );
      default:
        return (
          <UserAppointmentsHistory loading={userLoaded.tab} setTab={setTab} />
        );
    }
  };

  // ------------------------- HANDLERS ------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    setContactInfo({
      subject: '',
      message: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactInfo({ ...contactInfo, [name]: value });
  };

  return (
    <Grid
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <SideBar>
        <SideBarContainer>
          <SideBarItem
            onClick={() => setTab('activeAppointments')}
            className={tab === 'activeAppointments' ? 'active' : ''}
          >
            <SideBarContent>
              <BsFillCalendarFill />
              <SideBarText>Agendar</SideBarText>
            </SideBarContent>
          </SideBarItem>
          <SideBarItem
            onClick={() => setTab('myAppointments')}
            className={tab === 'myAppointments' ? 'active' : ''}
          >
            <SideBarContent>
              <BsClockHistory />
              <SideBarText>Historial</SideBarText>
            </SideBarContent>
          </SideBarItem>
          <SideBarItem
            onClick={() => setTab('contact')}
            className={tab === 'contact' ? 'active' : ''}
          >
            <SideBarContent>
              <MdContactPhone />
              <SideBarText>Contacto</SideBarText>
            </SideBarContent>
          </SideBarItem>
        </SideBarContainer>
      </SideBar>

      <AnimatePresence exitBeforeEnter>{renderSwitch(tab)}</AnimatePresence>
    </Grid>
  );
};

export default Appointments;
