import { SET_SERVICES } from './servicesTypes';

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

    default:
      return state;
  }
};

export default servicesReducer;
