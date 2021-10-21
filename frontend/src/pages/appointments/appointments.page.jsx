import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../../redux/user/userActions';
import { clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import CreateAppointment from '../../components/create-appointment/create-appointment.component';
import ActiveAppointment from '../../components/active-appointment/active-appointment.component';
import UserAppointmentsHistory from '../../components/user-appointments/user-appointments-history.component';

// STYLES
import {
  Grid,
  SideBar,
  SideBarContainer,
  SideBarItem,
  SideBarContent,
  SideBarText,
} from './appointments.page.styles';

// ICONS
import { BsFillCalendarFill, BsClockHistory } from 'react-icons/bs';
import { MdContactPhone } from 'react-icons/md';
import AppointmentContact from '../../components/appointment-contact/appointment-contact.component';

const Appointments = () => {
  // ---------------------- STATE AND CONSTANTS -----------------------

  const [tab, setTab] = useState('activeAppointments');

  const dispatch = useDispatch();
  const { userLoaded, user } = useSelector((state) => state.user);
  const { activeAppointment, appointments } = useSelector(
    (state) => state.appointments
  );

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
    dispatch(clearUiErrors());
  }, [tab, dispatch]);

  // ---------------------- RENDER SWITCH -----------------------
  const renderSwitch = (tab) => {
    switch (tab) {
      case 'activeAppointments':
        if (activeAppointment) {
          return (
            <ActiveAppointment
              key={1}
              loading={userLoaded.tab}
              activeAppointment={activeAppointment}
            />
          );
        }
        return (
          <CreateAppointment key={2} loading={userLoaded.tab} setTab={setTab} />
        );
      case 'myAppointments':
        return (
          <UserAppointmentsHistory
            key={3}
            appointments={appointments}
            loading={userLoaded.tab}
            setTab={setTab}
          />
        );
      case 'contact':
        return (
          <AppointmentContact key={4} user={user} loading={userLoaded.tab} />
        );
      default:
        return (
          <UserAppointmentsHistory
            key={3}
            appointments={appointments}
            loading={userLoaded.tab}
            setTab={setTab}
          />
        );
    }
  };

  // ------------------------- HANDLERS ------------------------

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
              <SideBarText>Cita</SideBarText>
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
