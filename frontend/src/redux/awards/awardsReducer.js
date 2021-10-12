import {
  SET_AWARDS,
  CLEAR_AWARDS,
  ADD_AWARD,
  UPDATE_AWARD,
  DELETE_AWARD,
} from './awardsTypes';
import { addItem, updateItem, deleteItem } from '../utils/reducerUtils';

const initialState = {
  awardsData: [],
};
const awardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AWARDS:
      return {
        ...state,
        awardsData: action.payload,
      };
    case CLEAR_AWARDS:
      return initialState;
    case ADD_AWARD:
      return {
        ...state,
        awardsData: addItem(action.payload, state.awardsData),
      };
    case UPDATE_AWARD:
      return {
        ...state,
        awardsData: updateItem(action.payload, state.awardsData),
      };
    case DELETE_AWARD:
      return {
        ...state,
        awardsData: deleteItem(action.payload, state.awardsData),
      };

    default:
      return state;
  }
};

export default awardsReducer;
