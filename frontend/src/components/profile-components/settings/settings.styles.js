import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TitleSm } from '../../general.styles';

export const SettingsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, min-content);

  @media only screen and (max-width: 1200px) {
    overflow: hidden;
  }
`;

export const Title = styled(TitleSm)`
  justify-self: start;
  font-size: 2.6rem;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    justify-self: center;
  }
`;

export const ChangeImage = styled.div`
  display: flex;
  align-items: center;
`;

export const UserImage = styled.img`
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 50%;
  margin-right: 2rem;
`;

export const ImageInputLabel = styled.label`
  color: ${({ error }) => (error ? 'red' : 'var(--color-primary)')};
  font-size: 1.5rem;
  /* display: inline-block; */
  text-decoration: none;
  padding: 5px;
  background-color: transparent;
  border: 0px;
  border-bottom: ${({ error }) =>
    error ? '1px solid red' : '1px solid var(--color-primary)'};
  cursor: pointer;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;

  &.selected,
  &:hover {
    color: white;
    background-color: var(--color-primary);
    border-bottom: 1px solid var(--color-primary);
    -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
  }

  &:active,
  &:focus {
    -webkit-box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.15);
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
`;

export const ImageInput = styled.input`
  display: none;
`;
