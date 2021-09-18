import { SET_USER, SET_USER_LOADED } from './userTypes';
import { SET_UI_ERRORS, SET_UI_LOADING } from '../ui/uiTypes';
import axios from 'axios';

// ------------------------ LOG IN ---------------------------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { login: true },
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(
      '/api/v1/users/login',
      {
        email,
        password,
      },
      config
    );
    window.location.reload();
  } catch (error) {
    dispatch({
      type: SET_UI_LOADING,
      payload: { login: false },
    });
    dispatch({
      type: SET_UI_ERRORS,
      payload: { login: error.response.data.uiErrors },
    });
  }
};

// ------------------------ SIGN UP ---------------------------
export const signUp =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { register: true },
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        '/api/v1/users',
        {
          name,
          email,
          password,
          passwordConfirm,
        },
        config
      );
      window.location.reload();
    } catch (error) {
      dispatch({
        type: SET_UI_LOADING,
        payload: { register: false },
      });
      dispatch({
        type: SET_UI_ERRORS,
        payload: { register: error.response.data.uiErrors },
      });
    }
  };

// ------------------------ LOG OUT ---------------------------
export const logout = () => async (dispatch) => {
  const { data } = await axios.get('/api/v1/users/logout');
  if ((data.status = 'success')) {
    window.location.reload();
  }
};

// ------------------------ CHECK LOGGED ---------------------------
export const checkLogged = () => async (dispatch) => {
  dispatch({
    type: SET_USER_LOADED,
    payload: false,
  });
  const { data } = await axios.get('/api/v1/users/logged');
  dispatch({
    type: SET_USER,
    payload: data.user,
  });
  dispatch({
    type: SET_USER_LOADED,
    payload: true,
  });
};
