import { combineReducers } from 'redux';

import awardsReducer from './awards/awards.reducer';
import modalReducer from './modal/modal.reducer';
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
  awards: awardsReducer,
  modal: modalReducer,
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
