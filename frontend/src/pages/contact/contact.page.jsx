import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { sendContactEmail } from '../../redux/user/userActions';
import { clearSuccess } from '../../redux/ui/uiActions';

// COMPONENTS
import ContactSection from '../../components/contact-section/contact-section.component';
import TextInput from '../../components/form-inputs/text-input/text-input.component';
import TextAreaInput from '../../components/form-inputs/textarea-input/textarea-input.component';
import { TitleSm } from '../../components/general.styles';

// STYLES
import {
  Grid,
  Heading,
  Title,
  MapContainer,
  Map,
  PopupLabel,
  PopupDescription,
  MapTitle,
  Button,
  Container,
  Text,
} from './contact.page.styles';

// ICONS
import { RiMailSendLine } from 'react-icons/ri';
import { SiGooglemaps } from 'react-icons/si';

const Contact = () => {
  // ---------------------- STATE AND CONSTANTS -------------
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const { name, subject, email, message } = userCredentials;
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    longitude: -102.55540879898437,
    latitude: 22.76889481968826,
    zoom: 13,
  });
  const [showPopup, togglePopup] = useState(true);

  const dispatch = useDispatch();
  const {
    success,
    uiErrors: { errorsOne },
    loading: { firstLoader },
  } = useSelector((state) => state.ui);

  // ---------------------- USE EFFECT'S -------------
  useEffect(() => {
    return () => {
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  // ---------------------- HANDLERS -------------
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendContactEmail(name, email, subject, message));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

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
      >
        <Heading>
          <Title>¿Tienes dudas?</Title>
        </Heading>
        {success ? (
          <Container
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ transition: { ease: 'easeInOut' } }}
          >
            <TitleSm>Correo enviado</TitleSm>
            <Text>
              Correo electrónico enviado correctamente, gracias por ponerte en
              contacto, responderemos a la brevedad.
            </Text>
            <RiMailSendLine />
          </Container>
        ) : (
          <ContactSection>
            <TextInput
              name='name'
              type='text'
              handleChange={handleChange}
              value={name}
              label='Nombre'
              error={errorsOne.name}
              required
            />
            <TextInput
              name='email'
              type='email'
              handleChange={handleChange}
              value={email}
              label='Email'
              error={errorsOne.email}
              required
            />
            <TextInput
              name='subject'
              type='text'
              handleChange={handleChange}
              value={subject}
              label='Asunto'
              error={errorsOne.subject}
              required
            />
            <TextAreaInput
              name='message'
              type='text'
              handleChange={handleChange}
              value={message}
              label='Mensaje'
              error={errorsOne.message}
              rows='1'
              required
            />
            <Button
              primary
              type='submit'
              onClick={handleSubmit}
              loading={firstLoader}
              disabled={firstLoader}
            >
              Enviar correo
            </Button>
          </ContactSection>
        )}
        {/* <GoogleMap /> */}
        <MapContainer>
          <MapTitle>Ubícanos</MapTitle>
          {/* <iframe
            title='Map'
            frameBorder='0'
            scrolling='no'
            src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Copias%20No%C3%A9+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
          ></iframe> */}
          <Map>
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              mapStyle='mapbox://styles/noeking/ckv4yy4bk4ms315qty2z0h6gu'
            >
              <Marker
                latitude={22.76889481968826}
                longitude={-102.55540879898437}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <SiGooglemaps
                  style={{
                    fontSize: viewport.zoom * 3,
                    color: 'var(--color-primary)',
                  }}
                />
              </Marker>
              {showPopup && (
                <Popup
                  latitude={22.76889481968826}
                  longitude={-102.55540879898437}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => togglePopup(false)}
                  anchor='left'
                >
                  <PopupLabel>Emotiokanis9</PopupLabel>
                  <PopupDescription>
                    Preparatoria #236 B, Agronoma II, <br /> 98068 Zacatecas,
                    Zac.
                  </PopupDescription>
                </Popup>
              )}
            </ReactMapGL>
          </Map>
        </MapContainer>
      </Grid>
    </>
  );
};

export default Contact;
