import React from 'react';

import {
  GroupContainer,
  InputGroup,
  MagicBox,
  FormInputContainer,
  FormInputLabel,
  ErrorText,
} from './text-input.styles';

const TextInput = ({ handleChange, label, error, ...props }) => (
  <GroupContainer>
    <InputGroup>
      <MagicBox
        error={error ? true : false}
        className={props.value.length ? 'active' : ''}
      >
        <FormInputContainer
          error={error ? true : false}
          onChange={handleChange}
          {...props}
        />
      </MagicBox>
    </InputGroup>
    {label ? (
      <FormInputLabel
        error={error ? true : false}
        className={props.value.length ? 'shrink' : ''}
      >
        {label}
      </FormInputLabel>
    ) : null}
    {error ? <ErrorText>{error}</ErrorText> : null}
  </GroupContainer>
);

export default TextInput;
