import React from 'react';

// STYLES
import { CustomButtonContainer, ChildrenContainer } from './button-link.styles';

const ButtonLink = ({ children, isGoogleSignIn, loading, ...props }) => {
  return (
    <CustomButtonContainer {...props}>
      <ChildrenContainer>{children}</ChildrenContainer>
    </CustomButtonContainer>
  );
};

export default ButtonLink;
