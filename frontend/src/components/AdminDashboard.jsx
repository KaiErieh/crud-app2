import React from "react";
import {
  Grid,
  Paper,
} from "@mui/material";
import { NavLink as Link } from "react-router-dom";
import Tile from "./Tile";
import GroupIcon from "@mui/icons-material/Group";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGuests, reset } from "../features/guest/guestSlice"
import { getUsers, reset as userReset } from "../features/auth/authSlice"


function AdminDashboard() {
  const dispatch = useDispatch()
  const { user, userList } = useSelector(
    (state) => state.auth
  );

  const { guest, guestList } = useSelector(
    (state) => state.guest)

    useEffect(() => {
      
  
      if (user && user.role === "admin") {
        dispatch(getGuests())
        dispatch(getUsers())
      }
  
      dispatch(reset());
    }, [user, dispatch, guest, userList, guestList]);
   






  const paperStyle = {
    marginTop: "2vh",
    width: "100%",
    height: "auto",
    backgroundColor: "#2196f3",
    textAlign: "center",
    color: "white",
    opacity: "90%",
  };

  const containerStyle = {
    justifyContent: "center",
  };

  return (
    <>
      <Paper style={paperStyle}>
        <h2>Administration</h2>
      </Paper>

      <Grid container spacing={2}>
        <Grid item md={1.2}>
          <Link to="/guests">
            <Tile
              title="Guests"
              content="Guests Administration"
              icon={<GroupIcon />}
              data={guestList.length ?  `Current guests: ${guestList.length}` : "..."}
            />
          </Link>
        </Grid>

        <Grid item md={2}>
          <Link to="/users">
            <Tile
              title="Users"
              content="Users Administration"
              icon={<GroupIcon />}
              data={userList.length ?  `Current users: ${userList.length}` : "..."}
            />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminDashboard;
