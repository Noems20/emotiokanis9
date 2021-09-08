import React from 'react';

import {
  GroupContainer,
  MagicBox,
  FormInputContainer,
  FormInputLabel,
} from './text-area-input.styles';

const TextAreaInput = ({ handleChange, label, ...props }) => (
  <GroupContainer>
    <MagicBox>
      <FormInputContainer onChange={handleChange} {...props} />
    </MagicBox>
    {label ? (
      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default TextAreaInput;
