/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authDoctorSlice = createSlice({
  name: 'authDoctor',
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

export const { login, logout } = authDoctorSlice.actions;

export const selectIsDoctorAuthenticated = (state:any) => state.authDoctor.isAuthenticated;
export const selectToken = (state: { auth: { token: any; }; }) => state.auth.token;

export default authDoctorSlice.reducer;
