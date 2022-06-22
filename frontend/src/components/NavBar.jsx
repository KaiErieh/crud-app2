import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  logout as guestLogout,
  reset as guestReset,
} from "../features/guest/guestSlice";
import "./Comps.css";

function NavBar() {

  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { guest } = useSelector((state) => state.guest);

  const onLogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
    navigate("/");
  };

  const onGuestLogout = async () => {
    await dispatch(guestLogout());
    await dispatch(guestReset());
    navigate("/");
  };

  const logOutHandler = () => {
    if (user) {
      return (
        <Button onClick={onLogout} color="inherit">
          <LogoutIcon /> Log Out ({user.username})
        </Button>
      );
    } else if (guest) {
      return (
        <Button onClick={onGuestLogout} color="inherit">
          <LogoutIcon /> Log Out ({guest.email})
        </Button>
      );
    } else {
      return null;
    }
  };

  const roleHandler = () => {
    if (user) {
      return(
        <Link to="/dashboard">
              <Button color="inherit"> Dashboard</Button>
        </Link>)
      
    } else if (guest) {
      return (
        <Link to="/dashboard">
              <Button color="inherit">Onboarding Dashboard</Button>
        </Link>
      );
    } else {
      return null;
    }
  };

  const administrationHandler = () => {
    if (user && user.role === "admin") {
      return (
        <Link to="/admin">
              <Button color="inherit">Administration</Button>
        </Link>
      );
    } else {
      return null;
    }
  };

  const handleRole = (userRole) => {
    switch(userRole){
      case "recruiter":
        return {"backgroundColor": "#9c27b0"};
      case "admin":
        return {"backgroundColor": "#e91e63"};
      case "hrbp":
        return {"backgroundColor": "#618833"};
      case "manager":
        return {"backgroundColor": "#ff9800"};
      case undefined:
        return {"backgroundColor": "#2196f3"};
      default:
        return {"backgroundColor": "#2196f3"};
    }
  }

  return (
    <div style={{ textDecoration: "none" }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton size="large" edge="start" color="inherit">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Onboarding Self-Service
          </Typography>
          <Stack direction="row" spacing={2}>   
            {roleHandler()}
            {administrationHandler()}
            {logOutHandler()}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
