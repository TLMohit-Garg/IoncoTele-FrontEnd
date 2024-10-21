import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./counterSlice";
import authDoctorReducer from './authDoctorSlice';
import userReducer from "./userSlice";
import authPatientReducer from "./authPatientSlice";
import selectedDoctorReducer from "./selectedDoctorSlice";

// const persistConfig = {
//   key: 'root',  // Key for storing in localStorage
//   storage,
//   whitelist: ['authPatient', 'authDoctor'] // only persist the authPatient and user slices
// }
const authPatientConfig = {
  key: 'authPatient',
  storage,
};

const authDoctorConfig = {
  key: 'authDoctor',
  storage,
};

const persistedDoctorReducer = persistReducer(authDoctorConfig, authDoctorReducer);
const persistedPatientReducer = persistReducer(authPatientConfig, authPatientReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authDoctor:persistedDoctorReducer,
    authPatient:persistedPatientReducer,
    user: userReducer,
    doctor:selectedDoctorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
 
export const persistor = persistStore(store); // Persistor to persist the store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
