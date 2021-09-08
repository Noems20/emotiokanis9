import { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setModalType } from './redux/modal/modal.actions';

import Home from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import Services from './pages/services/services.component';
import About from './pages/about/about.component';
import Contact from './pages/contact/contact.component';
import Appointments from './pages/appointments/appointments.component';
import NotFound from './pages/NotFound/not-found.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Footer from './components/footer/footer.component';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import BackToTop from './components/scroll-to-top/back-to-top.component';

import './App.scss';
import { AnimatePresence } from 'framer-motion';

function App({ setCurrentUser, currentUser, setModalType }) {
  const location = useLocation();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  // console.log(currentUser);
  return (
    <>
      <Header />
      <ScrollToTop />
      <BackToTop />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => setModalType(null)}
      >
        <Switch location={location} key={location.key}>
          <Route exact path='/' component={Home} />
          <Route exact path='/servicios' component={Services} />
          <Route exact path='/nosotros' component={About} />
          <Route exact path='/contacto' component={Contact} />
          <Route
            exact
            path='/login'
            render={() =>
              currentUser ? <Redirect to='/citas' /> : <SignInAndSignUpPage />
            }
          />
          <Route
            exact
            path='/citas'
            component={Appointments}
            // render={() =>
            //   currentUser ? <Appointments /> : <Redirect to='/' />
            // }
          />
          <Route path='/' component={NotFound} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setModalType: (modal) => dispatch(setModalType(modal)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // currentUser = state.user.currentUser(), -> Ya que destructuramos state, recuerda que state es el root-reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
