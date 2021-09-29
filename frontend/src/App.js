import { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { checkLogged } from './redux/user/userActions';

// PAGES
import Home from './pages/homepage/homepage.page';
import Services from './pages/services/services.page';
import About from './pages/about/about.page';
import Contact from './pages/contact/contact.page';
import Appointments from './pages/appointments/appointments.page';
import Profile from './pages/profile/profile.page';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.page';
import ResetPasswordEmail from './pages/reset-password/reset-password-email.page';
import NotFound from './pages/NotFound/not-found.component';

//  COMPONENTS
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import FullScreenLoader from './components/loaders/full-screen-loader/full-screen-loader.component';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import BackToTop from './components/scroll-to-top/back-to-top.component';
// import ProtectedRoute from './components/protectedRoute';

import './App.scss';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user, userLoaded } = userData;

  useEffect(() => {
    dispatch(checkLogged());
  }, [dispatch]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(checkLogged());
    });
    return function cleanup() {
      unlisten();
    };
  }, [dispatch, history]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <BackToTop />
      {userLoaded.general ? (
        <>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path='/' component={Home} />
              <Route exact path='/servicios' component={Services} />
              <Route exact path='/nosotros' component={About} />
              <Route exact path='/contacto' component={Contact} />
              <Route
                exact
                path='/perfil'
                render={() => (user ? <Profile /> : <Redirect to='/login' />)}
              />
              <Route
                exact
                path='/citas'
                render={() =>
                  user ? <Appointments /> : <Redirect to='/login' />
                }
              />
              <Route
                exact
                path='/login'
                render={() =>
                  user ? <Redirect to='/citas' /> : <SignInAndSignUpPage />
                }
              />
              <Route
                exact
                path='/restablecerContraseña'
                render={() =>
                  user ? <Redirect to='/perfil' /> : <ResetPasswordEmail />
                }
              />
              <Route path='/' component={NotFound} />
            </Switch>
          </AnimatePresence>
        </>
      ) : (
        <FullScreenLoader />
      )}
      <Footer />
    </>
  );
};

export default App;
