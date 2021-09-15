import { SET_UI_LOADING } from './uiTypes';

const initialState = {
  loading: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
