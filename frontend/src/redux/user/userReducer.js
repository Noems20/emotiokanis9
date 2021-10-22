import { updateItem, deleteItem } from '../utils/reducerUtils';
import {
  SET_USER,
  SET_USERS,
  CLEAR_USERS,
  SET_USER_LOADED,
  SET_UPDATED_USER,
  UPDATE_USER,
  DELETE_USER,
} from './userTypes';

const initialState = {
  user: null,
  userLoaded: {
    general: false,
    tab: false,
    updatedUser: false,
  },
  users: [],
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
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: updateItem(action.payload, state.users),
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case DELETE_USER:
      return {
        ...state,
        users: deleteItem(action.payload, state.users),
      };
    default:
      return state;
  }
};

export default userReducer;
