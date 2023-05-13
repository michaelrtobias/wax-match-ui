import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../common/navbar";
const App = () => {
  return (
    <>
      <Navbar />
      <Box id="detail">
        <Outlet />
      </Box>
    </>
  );
};

export default App;
