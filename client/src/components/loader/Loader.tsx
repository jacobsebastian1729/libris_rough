import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Loader.css";
export default function loader() {
  return (
    <div>
      <div className="loader">
        <Box sx={{ ml: 0, mt: 0, width: "80%" }}>
          <CircularProgress />
        </Box>
      </div>
    </div>
  );
}
