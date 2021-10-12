import {
  SET_SERVICES,
  CLEAR_SERVICES,
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from './servicesTypes';
import { addItem, updateItem, deleteItem } from '../utils/reducerUtils';

const initialState = {
  servicesData: [],
};
const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICES:
      return {
        ...state,
        servicesData: action.payload,
      };
    case CLEAR_SERVICES:
      return initialState;
    case ADD_SERVICE:
      return {
        ...state,
        servicesData: addItem(action.payload, state.servicesData),
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        servicesData: updateItem(action.payload, state.servicesData),
      };
    case DELETE_SERVICE:
      return {
        ...state,
        servicesData: deleteItem(action.payload, state.servicesData),
      };

    default:
      return state;
  }
};

export default servicesReducer;
