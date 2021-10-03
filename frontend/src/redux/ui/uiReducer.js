import {
  SET_UI_LOADING,
  SET_UI_ERRORS,
  CLEAR_UI_ERRORS,
  SET_SUCCESS,
} from './uiTypes';

const initialState = {
  success: false,
  loading: {
    firstLoader: false,
    secondLoader: false,
    fetchLoader: false,
  },
  uiErrors: {
    errorsOne: {},
    errorsTwo: {},
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
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
