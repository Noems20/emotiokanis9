import {
  SET_SERVICES,
  CLEAR_SERVICES,
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from './servicesTypes';
import { addService, updateService, deleteService } from './servicesUtils';

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
        servicesData: addService(action.payload, state.servicesData),
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        servicesData: updateService(action.payload, state.servicesData),
      };
    case DELETE_SERVICE:
      return {
        ...state,
        servicesData: deleteService(action.payload, state.servicesData),
      };

    default:
      return state;
  }
};

export default servicesReducer;
