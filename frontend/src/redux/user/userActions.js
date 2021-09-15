import { SET_USER, SET_USER_LOADED } from './userTypes';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    // dispatch({
    //   type: SET_UI_LOADING,
    //   payload: true,
    // });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/users/login',
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: SET_USER,
      payload: data.user,
    });
    // dispatch({
    //   type: SET_UI_LOADING,
    //   payload: false,
    // });
    // dispatch({
    //   type: UI_CLEAR_ERRORS,
    // });
    // localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    // dispatch({
    //   type: UI_SET_ERRORS,
    //   payload: error.response.data,
    // });
    console.error('UPS');
  }
};

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
