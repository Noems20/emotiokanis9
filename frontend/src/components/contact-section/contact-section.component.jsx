import React from 'react';

import { MdLocationOn, MdPhoneInTalk, MdMail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';

import {
  ContactContainer,
  ContactInfoContainer,
  InfoContainerTitle,
  InfoContainer,
  Info,
  InfoImgContainer,
  InfoText,
  ContactFormContainer,
  ContactFormTitle,
  ContactForm,
} from './contact-section.styles';
import TabLoader from '../loaders/tab-loader/tab-loader.component';

const ContactSection = ({ children, loading = true, ...otherProps }) => {
  return (
    <>
      <ContactContainer {...otherProps}>
        <ContactInfoContainer>
          <InfoContainer>
            <InfoContainerTitle>Información</InfoContainerTitle>
            <Info>
              <InfoImgContainer>
                <MdLocationOn />
              </InfoImgContainer>
              <InfoText>
                Address: 198 West 21th Street, Suite 721 New York NY 10016
              </InfoText>
              <InfoImgContainer>
                <MdPhoneInTalk />
              </InfoImgContainer>
              <InfoText>
                Teléfono:
                <br /> +52 (492) 123 4567
              </InfoText>
              <InfoImgContainer>
                <MdMail />
              </InfoImgContainer>
              <InfoText>
                Email: <br />
                contacto@emotiokanis9.com
              </InfoText>
              {/* <InfoImgContainer>
                <BiWorld />
              </InfoImgContainer>
              <InfoText>
                Sitio web: <br />
                emotiokanis9.com
              </InfoText> */}
              <InfoImgContainer>
                <FaFacebook />
              </InfoImgContainer>
              <InfoText>
                Página: <br />
                EmotioKanis9
              </InfoText>
            </Info>
          </InfoContainer>
        </ContactInfoContainer>
        <ContactFormContainer>
          {!loading ? (
            <TabLoader />
          ) : (
            <>
              <ContactFormTitle>Contáctanos</ContactFormTitle>
              <ContactForm>{children}</ContactForm>
            </>
          )}
        </ContactFormContainer>
      </ContactContainer>
    </>
  );
};

export default ContactSection;
