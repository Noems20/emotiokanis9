import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import awardsReducer from './awards/awards.reducer';
import modalReducer from './modal/modal.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

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
  user: userReducer,
  awards: awardsReducer,
  modal: modalReducer,
});

export default persistReducer(persistConfig, rootReducer);
