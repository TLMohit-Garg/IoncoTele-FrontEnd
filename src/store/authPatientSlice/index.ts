/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  email: null, 
};

const authPatientSlice = createSlice({
  name: 'authPatient',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.email; // Assuming 'email' is in the token payload
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
    },
  },
});

export const { login, logout } = authPatientSlice.actions;

export const selectIsPatientAuthenticated = (state:any) => state.authPatient.isAuthenticated;
export const selectToken = (state: { auth: { token: any; }; }) => state.auth.token;
export const selectPatientEmail = (state:any) => state.authPatient.email;

export default authPatientSlice.reducer;
