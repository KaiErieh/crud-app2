import { Grid } from "@mui/material";
import React from "react";
import GuestList from "../components/forms/GuestList";
import CreateGuest from "../components/forms/CreateGuest";

function Administration() {
  return (
    <div>
      <br />
      <Grid container spacing={2}>
        <Grid item md={2}>
          <CreateGuest />
        </Grid>
      </Grid>
      <br />
      <GuestList />
    </div>
  );
}

export default Administration;
