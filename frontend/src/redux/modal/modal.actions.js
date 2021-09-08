import { SET_MODAL } from './modal.types';

export const setModalType = (modal) => ({
  type: SET_MODAL,
  payload: modal,
});
