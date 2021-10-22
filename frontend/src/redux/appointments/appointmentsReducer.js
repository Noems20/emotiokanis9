import {
  CREATE_APPOINTMENT,
  SET_APPOINTMENTS,
  SET_ACTIVE_APPOINTMENT,
  DELETE_APPOINTMENT,
  CLEAR_APPOINTMENTS,
  COMPLETE_APPOINTMENT,
} from './appointmentsTypes';

import { deleteItem } from '../utils/reducerUtils';

const initialState = {
  activeAppointment: null,
  appointments: [],
};

const appointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_APPOINTMENT:
      return {
        ...state,
        activeAppointment: action.payload,
      };
    case SET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
      };
    case SET_ACTIVE_APPOINTMENT:
      return {
        ...state,
        activeAppointment: action.payload,
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        activeAppointment: null,
      };
    case COMPLETE_APPOINTMENT:
      return {
        ...state,
        appointments: deleteItem(action.payload, state.appointments),
      };
    case CLEAR_APPOINTMENTS:
      return initialState;
    default:
      return state;
  }
};

export default appointmentsReducer;
