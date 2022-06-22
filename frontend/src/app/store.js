import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import guestReducer from "../features/guest/guestSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestReducer,
  },
});
