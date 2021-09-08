import { SET_MODAL } from './modal.types';

const INITIAL_STATE = {
  modalType: null,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        modalType: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
