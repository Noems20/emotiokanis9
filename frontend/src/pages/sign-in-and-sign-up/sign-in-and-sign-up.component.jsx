import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { Grid, Container } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      <Grid
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <Container>
          <SignIn />
          <SignUp />
        </Container>
      </Grid>
    </>
  );
};

export default SignInAndSignUpPage;
