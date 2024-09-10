import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import styles from "./index.css";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, paddingTop: "50px" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default App;
