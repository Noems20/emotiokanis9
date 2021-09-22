import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import FormInput from '../../components/form-input/form-input.component';

// STYLES
import {
  Grid,
  Container,
  SideBar,
  SideBarContainer,
  SideBarItem,
  SideBarContent,
  SideBarText,
  Content,
  AccountSettings,
  Title,
  Line,
  ChangeImage,
  UserImage,
  ImageButton,
} from './Profile.page.styles';

// ICONS
import { BsFillCalendarFill, BsGear } from 'react-icons/bs';
import { MdContactPhone } from 'react-icons/md';

const Profile = () => {
  const [tab, setTab] = useState(null);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
  });

  const { email, name } = credentials;
  const userData = useSelector((state) => state.user);
  const { user } = userData;

  useEffect(() => {
    setCredentials({
      name: user.name,
      email: user.email,
    });
  }, [setCredentials, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Grid>
      <Container>
        <SideBar>
          <SideBarContainer>
            <SideBarItem
              onClick={() => setTab('makeAppointment')}
              className={tab === 'makeAppointment' ? 'active' : ''}
            >
              <SideBarContent>
                <BsFillCalendarFill />
                <SideBarText>Agendar cita</SideBarText>
              </SideBarContent>
            </SideBarItem>
            <SideBarItem
              onClick={() => setTab('myAppointments')}
              className={tab === 'myAppointments' ? 'active' : ''}
            >
              <SideBarContent>
                <BsGear />
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
        <Content>
          <AccountSettings>
            <Title>Configuración de cuenta</Title>
            <form>
              <FormInput
                name='name'
                type='text'
                handleChange={handleChange}
                value={name}
                label='Nombre'
                // error={uiErrors.login.name}
              />
              <FormInput
                name='email'
                type='email'
                handleChange={handleChange}
                value={email}
                label='Email'
                // error={uiErrors.login.email}
              />
              <ChangeImage>
                <UserImage
                  src={
                    require(`../../../../backend/data/img/users/${user.photo}`)
                      .default
                  }
                />
                <ImageButton>Elige una nueva foto</ImageButton>
              </ChangeImage>
            </form>
          </AccountSettings>
          <Line />
          <div>Hola</div>
        </Content>
      </Container>
    </Grid>
  );
};

export default Profile;
