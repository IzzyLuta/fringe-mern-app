import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      isLoggedIn: false,
      isAdmin: false,
      userId: null,
    },
  },
});

console.log('Store:', store.getState());

export default store;

