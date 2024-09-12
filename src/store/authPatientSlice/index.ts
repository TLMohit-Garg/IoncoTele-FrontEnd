/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authPatientSlice = createSlice({
  name: 'authPatient',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authPatientSlice.actions;

export const selectIsPatientAuthenticated = (state:any) => state.authPatient.isAuthenticated;
export const selectToken = (state: { auth: { token: any; }; }) => state.auth.token;

export default authPatientSlice.reducer;
