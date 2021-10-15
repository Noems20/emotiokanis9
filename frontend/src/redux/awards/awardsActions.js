import axios from 'axios';
import { SET_UI_LOADING, CLEAR_UI_ERRORS, SET_SUCCESS } from '../ui/uiTypes';
import {
  SET_AWARDS,
  CLEAR_AWARDS,
  ADD_AWARD,
  UPDATE_AWARD,
  DELETE_AWARD,
} from './awardsTypes';
import { batch } from 'react-redux';
import { checkUserPermissions } from '../user/userActions';

// ---------------------------- FETCH AWARDS ----------------------------
export const fetchAwards = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: true },
    });

    const { data } = await axios.get('/api/v1/awards?sort=-date');

    batch(() => {
      dispatch({
        type: SET_AWARDS,
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

// ---------------------------- CLEAR AWARDS ----------------------------
export const clearAwards = () => async (dispatch) => {
  dispatch({
    type: CLEAR_AWARDS,
  });
};

// ---------------------------- CREATE AWARD ----------------------------
export const createAward =
  (name, description, date, image) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: true },
      });

      const form = new FormData();

      form.append('name', name);
      form.append('description', description);
      form.append('date', date);
      form.append('image', image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/awards', form, config);

      batch(() => {
        dispatch({
          type: ADD_AWARD,
          payload: data.data,
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
      checkUserPermissions(error, dispatch);
    }
  };

// ---------------------------- UPDATE AWARD ----------------------------
export const updateAward =
  (id, name, description, date, image) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: true },
      });
      dispatch({
        type: SET_SUCCESS,
        payload: false,
      });

      const form = new FormData();

      form.append('name', name);
      form.append('description', description);
      form.append('date', date);
      if (image) {
        form.append('image', image);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.patch(`/api/v1/awards/${id}`, form, config);

      batch(() => {
        dispatch({
          type: UPDATE_AWARD,
          payload: data.data,
        });
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { secondLoader: false },
        });
        dispatch({
          type: CLEAR_UI_ERRORS,
        });
      });
    } catch (error) {
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: false },
      });
      checkUserPermissions(error, dispatch);
    }
  };
// ---------------------------- DELETE AWARD ----------------------------
export const deleteAward = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/awards/${id}`);
    batch(() => {
      dispatch({
        type: DELETE_AWARD,
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
