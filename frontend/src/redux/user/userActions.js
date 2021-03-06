import {
  SET_USER,
  SET_USERS,
  CLEAR_USERS,
  SET_UPDATED_USER,
  SET_USER_LOADED,
  UPDATE_USER,
  DELETE_USER,
} from './userTypes';
import {
  SET_APPOINTMENTS,
  SET_ACTIVE_APPOINTMENT,
} from '../appointments/appointmentsTypes';
import {
  CLEAR_UI_ERRORS,
  SET_SUCCESS,
  SET_UI_ERRORS,
  SET_UI_LOADING,
} from '../ui/uiTypes';
import axios from 'axios';

import { batch } from 'react-redux';

// ---------------------------- CLEAR APPOINTMENTS ----------------------------
export const clearUsers = () => async (dispatch) => {
  dispatch({
    type: CLEAR_USERS,
  });
};

// ---------------------------- FETCH USERS ----------------------------
export const fetchUsers = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: true },
    });

    const { data } = await axios.get(`/api/v1/users?_id[ne]=${id}&sort=role`);

    batch(() => {
      dispatch({
        type: SET_USERS,
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
      dispatch({
        type: SET_SUCCESS,
        payload: true,
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: false },
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

// ------------------------ LOG OUT ---------------------------
export const logout = () => async () => {
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
  if (data.user) {
    let {
      data: { data },
    } = await axios.get('/api/v1/appointments/MyAppointments');

    if (data.length === 0) {
      dispatch({
        type: SET_APPOINTMENTS,
        payload: [],
      });
      dispatch({
        type: SET_ACTIVE_APPOINTMENT,
        payload: null,
      });
    } else {
      if (data[data.length - 1].active === true) {
        dispatch({
          type: SET_ACTIVE_APPOINTMENT,
          payload: data.pop(),
        });
      } else {
        dispatch({
          type: SET_ACTIVE_APPOINTMENT,
          payload: null,
        });
      }
      // Check after popping last appointment
      if (data.length === 0) {
        dispatch({
          type: SET_APPOINTMENTS,
          payload: [],
        });
      } else {
        dispatch({
          type: SET_APPOINTMENTS,
          payload: data,
        });
      }
    }
  }

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

    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'access-control-allow-origin': '*',
    //   },
    // };

    const { data } = await axios.patch('/api/v1/users/updateMe', form);

    batch(() => {
      dispatch({
        type: SET_USER,
        payload: data.user,
      });
      dispatch({
        type: SET_UPDATED_USER,
        payload: true,
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
      // CLEAN UP RUNS IN USE EFFECT OF SETTINGS COMPONENT
      // dispatch({
      //   type: CLEAR_UI_ERRORS,
      // });
    });
  } catch (error) {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: false },
    });
    if (error.message === 'Network Error') {
      console.log('There was a network error.');
      dispatch({
        type: CLEAR_UI_ERRORS,
      });
      window.location.reload();
    } else {
      if (checkUserAndPermissions(error) === true) {
        dispatch({
          type: SET_UI_ERRORS,
          payload: { errorsOne: error.response.data.uiErrors },
        });
      } else {
        window.location.reload();
      }
    }
  }
};

// ------------------------ CHANGE USER ROLE ---------------------------
export const changeUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: `user-${id}` },
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/v1/users/changeUserRole/${id}`,
      {
        role,
      },
      config
    );

    batch(() => {
      dispatch({
        type: UPDATE_USER,
        payload: data.data,
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
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
    }
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
      if (checkUserAndPermissions(error) === true) {
        dispatch({
          type: SET_UI_ERRORS,
          payload: { errorsTwo: error.response.data.uiErrors },
        });
      } else {
        dispatch({
          type: CLEAR_UI_ERRORS,
        });
        window.location.reload();
      }
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

// ------------------------ RESET PASSWORD ---------------------------
export const resetPassword =
  (password, passwordConfirm, token) => async (dispatch) => {
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

      await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        {
          password,
          passwordConfirm,
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
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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

// ------------------------ RESET PASSWORD ---------------------------
export const verifyAccount = (token) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: true },
    });

    await axios.patch(`/api/v1/users/verifyAccount/${token}`);
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
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
    });
  }
};

// ------------------------ SEND CONTACT MAIL ---------------------------
export const sendContactEmail =
  (name, email, subject, message) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: true },
      });
      dispatch({
        type: SET_SUCCESS,
        payload: false,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `/api/v1/users/sendContactMail`,
        {
          name,
          email,
          subject,
          message,
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
      });
    }
  };

// ---------------------------- DELETE USER --------------------
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/users/${id}`);
    batch(() => {
      dispatch({
        type: DELETE_USER,
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

// ------------------------------- UTILS --------------------
export const setUpdatedUser = (value) => (dispatch) => {
  dispatch({
    type: SET_UPDATED_USER,
    payload: value,
  });
};

export const checkUserAndPermissions = (error) => {
  // const { message } = error.response.data;
  if (
    error.response.data.message ===
      'You are not logged in! Please log in to get access' ||
    error.response.data.message ===
      'You do not have permission to perform this action' ||
    error.message === 'No user'
  ) {
    return false;
  }
  return true;
};

export const checkUserPermissions = (error, dispatch) => {
  if (error.message === 'Network Error') {
    console.log('There was a network error.');
    dispatch({
      type: CLEAR_UI_ERRORS,
    });
    window.location.reload();
  } else {
    if (checkUserAndPermissions(error) === true) {
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsOne: error.response.data.uiErrors },
      });
    } else if (
      error.response.data.message ===
      'You are not logged in! Please log in to get access'
    ) {
      dispatch({
        type: CLEAR_UI_ERRORS,
      });
      window.location.reload();
    }
  }
};
