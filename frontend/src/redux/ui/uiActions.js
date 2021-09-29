import { CLEAR_UI_ERRORS, SET_SUCCESS } from './uiTypes';

// ------------------------ CLEAR UI ERRORS -------------------
export const clearUiErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_UI_ERRORS,
  });
};

// ------------------------ CLEAR SUCCESS -------------------
export const clearSuccess = () => (dispatch) => {
  dispatch({
    type: SET_SUCCESS,
    payload: false,
  });
};
