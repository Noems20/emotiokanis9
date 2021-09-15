import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// REDUX
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, path, inverse }) => {
  const user = useSelector((state) => state.user);
  const ui = useSelector((state) => state.ui);

  const { loading } = ui;

  let ele;

  if (!user && loading) {
    console.log('Cargando...');
    return <h1>Cargando...</h1>;
  } else {
    // ele = user ? Component : <Redirect to='/login' />;
    if (user && !loading) {
      ele = Component;
    } else if (!user && !loading) {
      ele = <Redirect to='/login' />;
    }
  }

  return <Route path={path} render={() => ele} />;
};

export default ProtectedRoute;
