import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authDoctorReducer from './authDoctorSlice';
import userReducer from "./userSlice";
import authPatientReducer from "./authPatientSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authDoctor:authDoctorReducer,
    authPatient:authPatientReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
