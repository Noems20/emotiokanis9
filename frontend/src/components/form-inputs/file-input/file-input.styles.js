import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InputLabel = styled.label`
  color: ${({ error }) => (error ? 'red' : 'var(--color-primary)')};
  font-size: 1.5rem;
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

export const Input = styled.input`
  display: none;
`;
