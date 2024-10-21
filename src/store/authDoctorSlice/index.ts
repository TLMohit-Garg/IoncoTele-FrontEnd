/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface AuthDoctorState {
  isAuthenticated: boolean;
  token: string | null;
  email: any | null;
  userId: string | null;
  userData: any | null;
}

const initialState: AuthDoctorState = {
  isAuthenticated: false,
  token: null,
  email: null, 
  userId: null,
  userData: null,
};

const authDoctorSlice = createSlice({
  name: 'authDoctor',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; email: any; userId: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    setDoctorUserData:(state, action: any)=> {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      state.userId = null;
    },
  },
});

export const { login, setDoctorUserData, logout } = authDoctorSlice.actions;

export const selectIsDoctorAuthenticated = (state: { authDoctor: AuthDoctorState }) =>
  state.authDoctor.isAuthenticated;
export const selectDoctorToken = (state: { authDoctor: AuthDoctorState }) => state.authDoctor.token;
export const selectDoctorEmail = (state: { authDoctor: AuthDoctorState }) => state.authDoctor.email;
export const selectDoctorUserId = (state: { authDoctor: AuthDoctorState }) => state.authDoctor.userId;
export const selectDoctorUserData  = (state: { authDoctor: AuthDoctorState }) => state.authDoctor.userData;

// Configuration for redux-persist
const persistConfig = {
  key: 'authDoctor',
  storage,
  whitelist: ['token', 'email', 'userId', 'isAuthenticated'], // Fields to persist
};

const persistedReducer = persistReducer(persistConfig, authDoctorSlice.reducer);
export default persistedReducer;
// export default authDoctorSlice.reducer;
