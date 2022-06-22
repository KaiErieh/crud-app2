import { Grid } from "@mui/material";
import React from "react";
import UserList from "../components/forms/UserList";
import CreateGuest from "../components/forms/CreateGuest";

function UserAdmin() {
  return (
    <div>
      <br />
      <Grid container spacing={2}>
        <Grid item md={2}>
          <CreateGuest />
        </Grid>
      </Grid>
      <br />
      <UserList />
    </div>
  );
}

export default UserAdmin;
