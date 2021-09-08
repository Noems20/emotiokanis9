import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import {
  CustomButtonContainer,
  ChildrenContainer,
  GoogleContainer,
} from './custom-button.styles';

const CustomButton = ({ children, isGoogleSignIn, ...props }) => {
  return (
    <CustomButtonContainer isGoogleSignIn={isGoogleSignIn} {...props}>
      {isGoogleSignIn
        ? [
            <GoogleContainer key={1}>
              <FcGoogle />
            </GoogleContainer>,
            <ChildrenContainer key={2}>{children}</ChildrenContainer>,
          ]
        : children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
