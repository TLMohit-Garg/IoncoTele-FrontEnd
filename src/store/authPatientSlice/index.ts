/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  isAuthenticated: false,
  token: null,
  email: null, 
  userId: null,
};

const authPatientSlice = createSlice({
  name: 'authPatient',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.email; // Assuming 'email' is in the token payload
      state.userId = action.payload.userId; // Storing userId from payload
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authPatientSlice.actions;

export const selectIsPatientAuthenticated = (state:any) => state.authPatient.isAuthenticated;
export const selectPatientToken = (state: any) => state.authPatient.token; 
export const selectPatientEmail = (state: any) => state.authPatient.email;
export const selectPatientUserId = (state: any) => state.authPatient.userId;
// export const selectToken = (state: { auth: { token: any; }; }) => state.auth.token;

// Configuration for redux-persist
const persistConfig = {
  key: 'authPatient',
  storage,
  whitelist: ['token', 'email', 'userId', 'isAuthenticated'], // Fields to persist
};

const persistedReducer = persistReducer(persistConfig, authPatientSlice.reducer);
export default persistedReducer;
// export default authPatientSlice.reducer;
