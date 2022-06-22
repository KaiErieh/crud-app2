import { Grid, Paper } from "@mui/material";
import {NavLink as Link} from "react-router-dom"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tile from "./Tile";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function GuestDashboard() {

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
    <div><Paper style={paperStyle}>
    <h2>Onboarding</h2>
</Paper>
<Grid container spacing={2}>

  <Grid item md={1.2}>
    <Link to="/admin">
      <Tile
        title="Booking"
        content="Book your contract signing meeting"
        icon={<AccessTimeIcon />}
      />
    </Link>
  </Grid>


  <Grid item md={1.2}>
    <Link to="/users/admin">
      <Tile
        title="Attachments"
        content="Manage your Onboarding Forms"
        icon={<AttachFileIcon />}
      />
    </Link>
  </Grid>
  <Grid item md={1.2}>
    <Link to="/users/admin">
      <Tile
        title="Profile"
        content="Manage your Data"
        icon={<AccountBoxIcon />}
      />
    </Link>
  </Grid>
</Grid></div>
  )
}

export default GuestDashboard