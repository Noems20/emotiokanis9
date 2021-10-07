import { SET_USER, SET_USER_LOADED, SET_UPDATED_USER } from './userTypes';

const initialState = {
  user: null,
  userLoaded: {
    general: false,
    tab: false,
    updatedUser: false,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_LOADED:
      return {
        ...state,
        userLoaded: { ...state.userLoaded, ...action.payload },
      };
    case SET_UPDATED_USER:
      return {
        ...state,
        userLoaded: { ...state.userLoaded, updatedUser: action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
