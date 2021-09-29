import { SET_USER, SET_USER_LOADED } from './userTypes';
import {
  CLEAR_UI_ERRORS,
  SET_SUCCESS,
  SET_UI_ERRORS,
  SET_UI_LOADING,
} from '../ui/uiTypes';
import axios from 'axios';

import { batch } from 'react-redux';

// ------------------------ LOG IN ---------------------------
export const login = (email, password) => async (dispatch) => {
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
      payload: { firstLoader: false },
    });
    dispatch({
      type: SET_UI_ERRORS,
      payload: { errorsOne: error.response.data.uiErrors },
    });
  }
};

// ------------------------ SIGN UP ---------------------------
export const signUp =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: true },
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        '/api/v1/users/signup',
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
        payload: { secondLoader: false },
      });
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsTwo: error.response.data.uiErrors },
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
    payload: { general: false },
  });
  const { data } = await axios.get('/api/v1/users/logged');
  dispatch({
    type: SET_USER,
    payload: data.user,
  });
  dispatch({
    type: SET_USER_LOADED,
    payload: { general: true },
  });
};

// ------------------------ CHECK USER ---------------------------
export const checkUser = () => async (dispatch) => {
  dispatch({
    type: SET_USER_LOADED,
    payload: { tab: false },
  });
  const { data } = await axios.get('/api/v1/users/logged');
  dispatch({
    type: SET_USER,
    payload: data.user,
  });
  dispatch({
    type: SET_USER_LOADED,
    payload: { tab: true },
  });
};

// ------------------------ UPDATE USER (name, email) ---------------------------
export const updateMe = (email, name, photo) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: true },
    });

    const form = new FormData();

    form.append('email', email);
    form.append('name', name);
    form.append('photo', photo);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.patch('/api/v1/users/updateMe', form, config);

    batch(() => {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
      dispatch({
        type: CLEAR_UI_ERRORS,
      });
      dispatch({
        type: SET_USER,
        payload: data.user,
      });
    });
  } catch (error) {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: false },
    });
    dispatch({
      type: SET_UI_ERRORS,
      payload: { errorsOne: error.response.data.uiErrors },
    });
  }
};

// ------------------------ CHANGE PASSWORD ---------------------------
export const updateMyPassword =
  (passwordCurrent, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: true },
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        '/api/v1/users/updateMyPassword',
        {
          passwordCurrent,
          password,
          passwordConfirm,
        },
        config
      );
      batch(() => {
        dispatch({
          type: SET_UI_LOADING,
          payload: { secondLoader: false },
        });
        dispatch({
          type: CLEAR_UI_ERRORS,
        });
        dispatch({
          type: SET_USER,
          payload: data.user,
        });
      });
    } catch (error) {
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: false },
      });
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsTwo: error.response.data.uiErrors },
      });
    }
  };

// ------------------------ FORGOT PASSWORD ---------------------------
export const forgotPassword = (email) => async (dispatch) => {
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
      '/api/v1/users/forgotPassword',
      {
        email,
      },
      config
    );
    batch(() => {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
      dispatch({
        type: CLEAR_UI_ERRORS,
      });
      dispatch({
        type: SET_SUCCESS,
        payload: true,
      });
    });
  } catch (error) {
    batch(() => {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsOne: error.response.data.uiErrors },
      });
      dispatch({
        type: SET_SUCCESS,
        payload: false,
      });
    });
  }
};
