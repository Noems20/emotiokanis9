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
      {isGoogleSignIn ? (
        <>
          <GoogleContainer>
            <FcGoogle />
          </GoogleContainer>
          <ChildrenContainer>{children}</ChildrenContainer>,
        </>
      ) : loading ? (
        <Loader />
      ) : (
        children
      )}
    </CustomButtonContainer>
  );
};

export default CustomButton;
