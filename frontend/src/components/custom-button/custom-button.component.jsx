import React from 'react';

// COMPONENTS
import Loader from '../loaders/loader/loader.component';

// STYLES
import {
  CustomButtonContainer,
  ChildrenContainer,
  GoogleContainer,
} from './custom-button.styles';

// ICONS
import { FcGoogle } from 'react-icons/fc';

const CustomButton = ({ children, isGoogleSignIn, loading, ...props }) => {
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
      {loading ? <Loader /> : null}
    </CustomButtonContainer>
  );
};

export default CustomButton;
