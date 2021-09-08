import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const HeroContainer = styled.div`
  background-color: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  height: 80rem;
  position: relative;
  margin-top: -8rem;
  z-index: 1;

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.25) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  --o-object-fit: cover;
  object-fit: cover;
  background-color: #232a34;
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  color: #fff;
  z-index: 3;
`;

export const HeroH1 = styled.h1`
  margin-bottom: 4rem;
  font-family: 'Pacifico', cursive;
  font-size: 6rem;
  text-align: center;
  line-height: 6.5rem;
`;

export const HeroP = styled.p`
  font-size: ${({ large }) => (large ? '3rem' : '2rem')};
  font-weight: 400;
  text-align: center;
  margin-bottom: ${({ large }) => (large ? '2rem' : '0')};
  padding-bottom: 2.5rem;
`;

export const HeroButton = styled(CustomButton)`
  /* margin-top: 4rem; */
  border: none;
  &:hover {
    border: none;
    padding: 1rem 3rem;
  }
`;
