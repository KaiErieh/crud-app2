import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";

function Tile(props) {


    const paperStyle = {
        minHeight: "18vh",
        padding: 20,
        height: "auto",
        width: 120,
        margin: "16px 16px",
        backgroundColor: "#cfd8dc",
        
      };

    const iconStyle = {
        backgroundColor: "#546e7a",
    }

  return (
    <>
        <Paper style={paperStyle}>
            <Grid align="center">
                <Avatar style={iconStyle}>
                    {props.icon}
                </Avatar>
                <h3>{props.title}</h3>
            </Grid>
            <Grid align="center">
                    {props.content}
            </Grid>
        </Paper>
    </>
  )
}

export default Tile