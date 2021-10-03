import { combineReducers } from 'redux';

import servicesReducer from './services/servicesReducer';
import awardsReducer from './awards/awards.reducer';
import modalReducer from './modal/modalReducer';
import userReducer from './user/userReducer';
import uiReducer from './ui/uiReducer';

// Eso hace combine reducers
// {
//     user: {
//         currentUser
//     }
//     cart: {
//         cartItems
//     }
// }

const rootReducer = combineReducers({
  services: servicesReducer,
  awards: awardsReducer,
  modal: modalReducer,
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
