import { SET_USER, SET_USER_LOADED } from './userTypes';

const initialState = {
  user: null,
  userLoaded: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_LOADED:
      return { ...state, userLoaded: action.payload };
    default:
      return state;
  }
};

export default userReducer;
