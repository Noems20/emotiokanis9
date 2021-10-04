import axios from 'axios';
import { SET_UI_ERRORS, SET_UI_LOADING, CLEAR_UI_ERRORS } from '../ui/uiTypes';
import { SET_SERVICES, ADD_SERVICE } from './servicesTypes';
import { batch } from 'react-redux';

// ---------------------------- FETCH SERVICES ----------------------------
export const fetchServices = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: true },
    });

    const { data } = await axios.get('/api/v1/services');

    batch(() => {
      dispatch({
        type: SET_SERVICES,
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

// ---------------------------- CREATE SERVICE ----------------------------
export const createService =
  (name, description, priceLapse, price, image) => async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: true },
      });

      const form = new FormData();

      form.append('name', name);
      form.append('description', description);
      form.append('priceLapse', priceLapse);
      form.append('price', price);
      form.append('image', image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/services', form, config);

      batch(() => {
        dispatch({
          type: ADD_SERVICE,
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
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsOne: error.response.data.uiErrors },
      });
    }
  };

// ---------------------------- UPDATE SERVICE ----------------------------
// export const updateService =
//   (id, name, description, priceLapse, price, image) => async (dispatch) => {
//     try {
//       dispatch({
//         type: SET_UI_LOADING,
//         payload: { firstLoader: true },
//       });

//       const form = new FormData();

//       form.append('name', name);
//       form.append('description', description);
//       form.append('priceLapse', priceLapse);
//       form.append('price', price);
//       form.append('image', image);

//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//       await axios.patch(`/api/v1/services/${id}`, form, config);

//       batch(() => {
//         dispatch({
//           type: SET_UI_LOADING,
//           payload: { firstLoader: false },
//         });
//         dispatch({
//           type: CLEAR_UI_ERRORS,
//         });
//       });
//     } catch (error) {
//       dispatch({
//         type: SET_UI_LOADING,
//         payload: { firstLoader: false },
//       });
//       dispatch({
//         type: SET_UI_ERRORS,
//         payload: { errorsOne: error.response.data.uiErrors },
//       });
//     }
//   };
