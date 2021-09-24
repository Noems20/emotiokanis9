import { SET_UI_LOADING, SET_UI_ERRORS, CLEAR_UI_ERRORS } from './uiTypes';

const initialState = {
  loading: {
    firstLoader: false,
    secondLoader: false,
  },
  uiErrors: {
    login: {},
    register: {},
    detailsChange: {},
    passwordChange: {},
  },
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    case SET_UI_ERRORS:
      return {
        ...state,
        uiErrors: { ...state.uiErrors, ...action.payload },
      };
    case CLEAR_UI_ERRORS:
      return {
        ...state,
        uiErrors: initialState.uiErrors,
      };
    default:
      return state;
  }
};

export default uiReducer;
