import { SET_MODAL } from './modalTypes';

export const setModalType = (modal) => ({
  type: SET_MODAL,
  payload: modal,
});
