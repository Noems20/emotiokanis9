import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// COMPONENTS
import CreateAppointment from '../../components/create-appointment/create-appointment.component';
import UserAppointmentsHistory from '../../components/user-appointments/user-appointments-history.component';
import ContactSection from '../../components/contact-section/contact-section.component';
import FormInput from '../../components/form-input/form-input.component';
import TextAreaInput from '../../components/text-area-input/text-area-input.component';
import Modal from '../../components/modal/modal.component';
import Alert from '../../components/alert/alert.component';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modal.actions';
import { checkUser } from '../../redux/user/userActions';

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
  const [contactInfo, setContactInfo] = useState({
    subject: '',
    message: '',
  });

  const [tab, setTab] = useState('activeAppointments');
  const { subject, message } = contactInfo;

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { userLoaded } = useSelector((state) => state.user);
  const { modalType } = modal;

  useEffect(() => {
    dispatch(checkUser());
    return function cleanup() {
      dispatch(setModalType(null));
    };
  }, [tab, dispatch]);

  const renderSwitch = (tab) => {
    switch (tab) {
      case 'activeAppointments':
        return <CreateAppointment loading={userLoaded.tab} key={1} />;
      case 'myAppointments':
        return (
          <UserAppointmentsHistory
            loading={userLoaded.tab}
            setTab={setTab}
            key={2}
          />
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
            <FormInput
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
          <UserAppointmentsHistory
            loading={userLoaded.tab}
            setTab={setTab}
            key={1}
          />
        );
    }
  };

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

  return (
    <>
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

      {modalType === 'edit' && (
        <Modal>
          <Alert
            title='¡Exito!'
            text='Tu cuenta ha sido creada correctamente'
            button='Continuar'
            type='success'
          />
        </Modal>
      )}
      {modalType === 'delete' && (
        <Modal>
          <Alert
            title='¡Cuidado!'
            text='¿Estas seguro de que deseas cancelar tu cita?'
            button='Cancelar cita'
            type='error'
          />
        </Modal>
      )}
    </>
  );
};

export default Appointments;
