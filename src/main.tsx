import { StrictMode } from "react";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/index.tsx";
import About from "./pages/about/index.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import PatientSignup from "./components/patientRegistartionForm/index.tsx";
import DoctorSignup from "./components/doctorRegistrationForm/index.tsx";
import Doctors from "./pages/doctors/index.tsx";
import Testing from "./pages/testing/index.tsx";
import Admin from "./pages/admin/index.tsx";
// import DashboardLayoutBasic from "./pages/testing/index.tsx";
import { store, persistor } from "./store/store.ts";
import { Provider } from "react-redux";
import Profile from "./pages/profile/index.tsx";
import DoctorBankingDetails from "./pages/doctorBankingDetails/index.tsx";
import Appointments from "./pages/appointment/index.tsx";
import SignIn from "./pages/adminSignIn/index.tsx";
import SuccessPage from "./pages/success/index.tsx";
import { PersistGate } from "redux-persist/integration/react";
// import CredentialsSignInPage from "./pages/adminSignIn/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/patientSignup" element={<PatientSignup />} />
      <Route path="/doctorSignup" element={<DoctorSignup />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/doctorBankingDetails" element={<DoctorBankingDetails />} />
      <Route path="/myAppointments" element={<Appointments />} />
      <Route path="/adminSignIn" element={<SignIn />} />
      <Route path="/success" element={<SuccessPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
