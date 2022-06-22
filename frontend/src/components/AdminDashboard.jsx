import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import { NavLink as Link} from "react-router-dom"
import Tile from "./Tile";
import GroupIcon from "@mui/icons-material/Group";
function AdminDashboard() {

  const paperStyle = { 
    marginTop: "2vh",
    width: "100%",
    height: "auto",
    backgroundColor: "#2196f3",
    textAlign: "center",
    color: "white",
    opacity: "90%"
    
  }

  return (
  <div>
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
          />
        </Link>
      </Grid>
    
    
      <Grid item md={2}>
        <Link to="/users">
          <Tile
            title="Users"
            content="Users Administration"
            icon={<GroupIcon />}
          />
        </Link>
      </Grid>
    </Grid>
    
  </div>
  )
}

export default AdminDashboard;
