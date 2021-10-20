import axios from 'axios';
import { SET_UI_LOADING, SET_UI_ERRORS, CLEAR_UI_ERRORS } from '../ui/uiTypes';
import { CREATE_APPOINTMENT, DELETE_APPOINTMENT } from './appointmentsTypes';
import { batch } from 'react-redux';

// ---------------------------- CLEAR APPOINTMENTS ----------------------------
// export const clearAppointments = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_SERVICES,
//   });
// };

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

// ---------------------------- UPDATE SERVICE ----------------------------
// export const updateService =
//   (id, name, description, priceLapse, price, image) => async (dispatch) => {
//     try {
//       dispatch({
//         type: SET_UI_LOADING,
//         payload: { secondLoader: true },
//       });
//       dispatch({
//         type: SET_SUCCESS,
//         payload: false,
//       });

//       const form = new FormData();

//       form.append('name', name);
//       form.append('description', description);
//       form.append('priceLapse', priceLapse);
//       form.append('price', price);
//       if (image) {
//         form.append('image', image);
//       }

//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//       const { data } = await axios.patch(
//         `/api/v1/appointments/${id}`,
//         form,
//         config
//       );

//       batch(() => {
//         dispatch({
//           type: UPDATE_SERVICE,
//           payload: data.data,
//         });
//         dispatch({
//           type: SET_SUCCESS,
//           payload: true,
//         });
//         dispatch({
//           type: SET_UI_LOADING,
//           payload: { secondLoader: false },
//         });
//         dispatch({
//           type: CLEAR_UI_ERRORS,
//         });
//       });
//     } catch (error) {
//       dispatch({
//         type: SET_UI_LOADING,
//         payload: { secondLoader: false },
//       });
//       checkUserPermissions(error, dispatch);
//     }
//   };
// ---------------------------- CANCEL APPOINTMENT ----------------------------
export const cancelAppointment = (id) => async (dispatch) => {
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
