/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface AuthPatientState {
  isAuthenticated: boolean;
  token: string | null;
  email: any | null;
  userId: string | null;
  userData: any | null;
}

const initialState: AuthPatientState = {
  isAuthenticated: false,
  token: null,
  email: null, 
  userId: null,
  userData: null,
};

const authPatientSlice = createSlice({
  name: 'authPatient',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; email: any; userId: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.email; // Assuming 'email' is in the token payload
      state.userId = action.payload.userId; // Storing userId from payload
    },
    setUserData: (state, action: any) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      state.userId = null;
      state.userData = null;
    },
  },
});

export const { login,setUserData, logout } = authPatientSlice.actions;

export const selectIsPatientAuthenticated = (state: { authPatient: AuthPatientState }) => state.authPatient.isAuthenticated;
export const selectPatientToken = (state: { authPatient: AuthPatientState }) => state.authPatient.token; 
export const selectPatientEmail = (state: { authPatient: AuthPatientState }) => state.authPatient.email;
export const selectPatientUserId = (state: { authPatient: AuthPatientState }) => state.authPatient.userId;
export const selectPatientUserData  = (state: { authPatient: AuthPatientState }) => state.authPatient.userData;
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
