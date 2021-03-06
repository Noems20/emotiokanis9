import { combineReducers } from 'redux';

import appointmentsReducer from './appointments/appointmentsReducer';
import servicesReducer from './services/servicesReducer';
import awardsReducer from './awards/awardsReducer';
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
  appointments: appointmentsReducer,
  services: servicesReducer,
  awards: awardsReducer,
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
