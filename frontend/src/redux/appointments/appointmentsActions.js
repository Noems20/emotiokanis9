import axios from 'axios';
import { SET_UI_LOADING, SET_UI_ERRORS, CLEAR_UI_ERRORS } from '../ui/uiTypes';
import {
  CREATE_APPOINTMENT,
  CLEAR_APPOINTMENTS,
  DELETE_APPOINTMENT,
  SET_ACTIVE_APPOINTMENT,
  SET_APPOINTMENTS,
  COMPLETE_APPOINTMENT,
} from './appointmentsTypes';
import { batch } from 'react-redux';

// ---------------------------- CLEAR APPOINTMENTS ----------------------------
export const clearAppointments = () => async (dispatch) => {
  dispatch({
    type: CLEAR_APPOINTMENTS,
  });
};

// ---------------------------- FETCH APPOINTMENTS ----------------------------
export const fetchAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: true },
    });

    const { data } = await axios.get(
      '/api/v1/appointments?sort=-date&active=true'
    );

    batch(() => {
      dispatch({
        type: SET_APPOINTMENTS,
        payload: data.data,
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { fetchLoader: false },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------- CREATE APPOINTMENT ----------------------------
export const createAppointment =
  (service, date, description) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: true },
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        '/api/v1/appointments',
        {
          service,
          date,
          description,
        },
        config
      );

      let {
        data: { data },
      } = await axios.get('/api/v1/appointments/MyAppointments');

      batch(() => {
        dispatch({
          type: CREATE_APPOINTMENT,
          payload: data[data.length - 1],
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { firstLoader: false },
        });
        dispatch({
          type: CLEAR_UI_ERRORS,
        });
      });
    } catch (error) {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
      if (
        error.response.data.message ===
        'You are not logged in! Please log in to get access'
      ) {
        window.location.reload();
      } else if (
        error.response.data.message !== 'You already have an active appointment'
      ) {
        dispatch({
          type: SET_UI_ERRORS,
          payload: { errorsOne: error.response.data.uiErrors },
        });
      }
    }
  };

// ---------------------------- UPDATE APPOINTMENT ----------------------------
export const updateAppointment =
  (id, service, date, description) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: true },
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        `/api/v1/appointments/${id}`,
        {
          service,
          date,
          description,
        },
        config
      );

      batch(() => {
        dispatch({
          type: SET_ACTIVE_APPOINTMENT,
          payload: data.appointment,
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { firstLoader: false },
        });
        dispatch({
          type: CLEAR_UI_ERRORS,
        });
      });
    } catch (error) {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
      if (
        error.response.data.message ===
        'You are not logged in! Please log in to get access'
      ) {
        window.location.reload();
      } else {
        dispatch({
          type: SET_UI_ERRORS,
          payload: { errorsOne: error.response.data.uiErrors },
        });
      }
    }
  };

// ---------------------------- COMPLETE APPOINTMENT ----------------------------
export const completeAppointment = (id) => async (dispatch) => {
  try {
    await axios.patch(`/api/v1/appointments/completeAppointment/${id}`);
    batch(() => {
      dispatch({
        type: COMPLETE_APPOINTMENT,
        payload: id,
      });
    });
  } catch (error) {
    if (
      error.response.data.message ===
      'You are not logged in! Please log in to get access'
    ) {
      window.location.reload();
    }
  }
};

// ---------------------------- CANCEL APPOINTMENT ----------------------------
export const deleteAppointment = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/appointments/${id}`);
    batch(() => {
      dispatch({
        type: DELETE_APPOINTMENT,
      });
    });
  } catch (error) {
    if (
      error.response.data.message ===
      'You are not logged in! Please log in to get access'
    ) {
      window.location.reload();
    }
  }
};
