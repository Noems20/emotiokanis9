import React from 'react';
import { InputContainer, InputLabel, Input } from './file-input.styles';

const FileInput = ({ id, error, selected, onChange, children }) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={id} error={error} className={selected}>
        {children}
      </InputLabel>
      <Input type='file' accept='image/*' id={id} onChange={onChange} />
    </InputContainer>
  );
};

export default FileInput;
