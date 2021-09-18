import { CLEAR_UI_ERRORS } from './uiTypes';

// ------------------------ CLEAR UI ERRORS -------------------
export const clearUiErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_UI_ERRORS,
  });
};
