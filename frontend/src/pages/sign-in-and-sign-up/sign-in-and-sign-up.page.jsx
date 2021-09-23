import React, { useEffect } from 'react';

// REDUX
import { useDispatch } from 'react-redux';
import { clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { Grid, Container } from './sign-in-and-sign-up.page.styles';

const SignInAndSignUpPage = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

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
