import styled from 'styled-components';
import zac from './images/zac.jpg';
import { motion } from 'framer-motion';

export const ContactContainer = styled(motion.div)`
  grid-column: center-start / center-end;
  border-radius: 5px;
  margin: 4rem 0;

  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.73);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.73);
  overflow: hidden;

  display: grid;
  grid-template-columns: [info-start] min-content [info-end form-start] 1fr [form-end];
  grid-template-rows: 1fr;

  @media only screen and (min-width: 1200px) {
    margin: 0;
    align-self: center;
    min-height: 55rem;
    max-height: 65rem;
  }

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media only screen and (max-width: 370px) {
    grid-column: full-start / full-end;
  }
`;

export const ContactInfoContainer = styled.div`
  grid-column: info-start / info-end;
  background-image: linear-gradient(
      rgba(14, 121, 187, 0.93),
      rgba(30, 152, 228, 0.93)
    ),
    url(${zac});
  background-size: cover;
  background-position: center;

  display: grid;
  grid-template-rows: 1fr;

  @media only screen and (max-width: 1200px) {
    grid-column: 1;
  }
`;

export const InfoContainer = styled.div`
  margin: 5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  grid-row-gap: 2rem;
`;

export const InfoContainerTitle = styled.h1`
  text-transform: uppercase;

  color: #fff;
`;

export const Info = styled.div`
  display: grid;
  align-items: center;
  align-content: space-between;
  grid-template-columns: max-content 1fr;

  grid-column-gap: 2rem;
  @media only screen and (max-width: 1200px) {
    grid-gap: 4rem;
  }
`;
export const InfoImgContainer = styled.div`
  color: #fff;
  border: 3px solid rgba(204, 204, 204, 0.4);
  border-radius: 50%;
  padding: 15px;

  display: grid;
  justify-content: center;
  align-content: center;

  & svg {
    font-size: 2.5rem;
  }

  @media only screen and (max-width: 470px) {
    & svg {
      font-size: 3rem;
    }
  }
`;
export const InfoText = styled.p`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.5;

  @media only screen and (max-width: 1200px) {
    font-size: 2rem;
  }
`;

export const ContactFormContainer = styled.div`
  grid-column: form-start / form-end;
  margin: 5rem;

  display: grid;
  align-content: center;
  justify-content: center;

  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;

  @media only screen and (max-width: 1200px) {
    grid-column: 1;
    grid-row: 1 /2;
  }
`;

export const ContactFormTitle = styled.h1`
  text-transform: uppercase;

  @media only screen and (max-width: 700px) {
    margin-bottom: 2rem;
  }
  @media only screen and (max-width: 476px) {
    margin-bottom: 3rem;
  }
`;

export const ContactForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-column-gap: 10rem;

  @media only screen and (max-width: 748px) {
    grid-gap: 4rem;
  }
`;
