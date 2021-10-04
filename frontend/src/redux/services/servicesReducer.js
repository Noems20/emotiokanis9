import { SET_SERVICES, ADD_SERVICE } from './servicesTypes';
import { addService } from './servicesUtils';

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
    case ADD_SERVICE:
      return {
        ...state,
        servicesData: addService(action.payload, state.servicesData),
      };

    default:
      return state;
  }
};

export default servicesReducer;
