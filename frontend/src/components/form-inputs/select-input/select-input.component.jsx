import React from 'react';

// Styles
import { Selector, SelectLabel, Container, Arrow } from './select-input.styles';

const SelectInput = ({ label, children, ...otherProps }) => {
  return (
    <Container>
      <SelectLabel>{label}</SelectLabel>
      <Selector {...otherProps}>{children}</Selector>
      <Arrow />
    </Container>
  );
};

export default SelectInput;
