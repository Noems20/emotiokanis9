import React from 'react';

// STYLES
import {
  CustomButtonContainer,
  GooogleChildrenContainer,
  ChildrenContainer,
  GoogleContainer,
  ButtonLoader,
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
          <GooogleChildrenContainer>{children}</GooogleChildrenContainer>,
        </>
      ) : (
        <ChildrenContainer>
          {loading ? <ButtonLoader /> : children}
        </ChildrenContainer>
      )}
    </CustomButtonContainer>
  );
};

export default CustomButton;
