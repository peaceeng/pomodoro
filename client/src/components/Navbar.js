// src/components/NavBar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pomodoro Timer
        </Typography>
        <Button color="inherit" onClick={() => navigate("/timer")}>
          Timer
        </Button>
        <Button color="inherit" onClick={() => navigate("/history")}>
          History
        </Button>
        <Button color="inherit" onClick={() => navigate("/analytics")}>
          Analytics
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
