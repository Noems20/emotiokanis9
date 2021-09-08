import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser //Parametros son la salida de nuestros "input-selectors", state.user da como salida (user)
);
