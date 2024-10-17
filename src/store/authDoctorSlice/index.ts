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

const authDoctorSlice = createSlice({
  name: 'authDoctor',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authDoctorSlice.actions;

export const selectIsDoctorAuthenticated = (state:any) => state.authDoctor.isAuthenticated;
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

const persistedReducer = persistReducer(persistConfig, authDoctorSlice.reducer);
export default persistedReducer;
// export default authDoctorSlice.reducer;
