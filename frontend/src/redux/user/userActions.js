import { SET_USER, SET_USER_LOADED } from './userTypes';
import { CLEAR_UI_ERRORS, SET_UI_ERRORS, SET_UI_LOADING } from '../ui/uiTypes';
import axios from 'axios';

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

// ------------------------ UPDATE USER (name, email) ---------------------------
export const updateMe = (email, name) => async (dispatch) => {
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
      '/api/v1/users/updateMe',
      {
        name,
        email,
      },
      config
    );
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
  } catch (error) {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: false },
    });
    dispatch({
      type: SET_UI_ERRORS,
      payload: { detailsChange: error.response.data.uiErrors },
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
    } catch (error) {
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: false },
      });
      dispatch({
        type: SET_UI_ERRORS,
        payload: { passwordChange: error.response.data.uiErrors },
      });
    }
  };
