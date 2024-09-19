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
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import Profile from "./pages/profile/index.tsx";
import DoctorBankingDetails from "./pages/doctorBankingDetails/index.tsx";

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
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
