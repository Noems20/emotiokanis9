import {
  CREATE_APPOINTMENT,
  SET_APPOINTMENTS,
  SET_ACTIVE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from './appointmentsTypes';

const initialState = {
  activeAppointment: null,
  appointments: null,
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
    default:
      return state;
  }
};

export default appointmentsReducer;
