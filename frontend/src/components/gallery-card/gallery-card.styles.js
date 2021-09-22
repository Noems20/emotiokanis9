import styled from 'styled-components';
import tokens from '../../tokens';

export const CardContainer = styled.div`
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.32);
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.32);

  margin-bottom: 3rem;

  display: grid;
  grid-template-rows: repeat(2, min-content);

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    transition: all 0.2s;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  border-radius: 10px 10px 0 0;
`;

export const CardDescription = styled.div`
  margin: 2rem;
`;

export const CardTitle = styled.h1`
  color: var(--color-primary);
  font-family: ${tokens.fontPrimary};
  font-weight: 100;
  font-size: 2.7rem;
  margin-bottom: 1rem;
`;
export const CardText = styled.p`
  font-size: 1.6rem;
`;
