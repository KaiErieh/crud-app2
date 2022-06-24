import { Grid, Paper, Avatar, Container, Badge } from "@mui/material";

function Tile(props) {
  const paperStyle = {
    minHeight: "20vh",
    height: "auto",
    width: 150,
    backgroundColor: "#cfd8dc",
    padding: 15,
    margin: "15px auto",
    borderRadius: "20px",


  };

  const iconStyle = {
    backgroundColor: "#546e7a",
  };

  const dataStyle={
    color: "#ab003c",
    marginTop: "15px ",
    textDecoration: "underline",
  }


  return (
    <>
      
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={iconStyle}>{props.icon}</Avatar>
            <h3>{props.title}</h3>
          </Grid>
          <Grid align="center">{props.content}</Grid>
          <Grid style={dataStyle} align="center">{props.data}</Grid>
        </Paper>
  
    </>
  );
}

export const TileInfo = (props) => {
  const paperStyle = {
    minHeight: "20vh",
    height: "auto",
    width: 150,
    backgroundColor: "#cfd8dc",
    padding: 15,
    borderRadius: "20px",


  };

  const iconStyle = {
    backgroundColor: "#546e7a",
  };

  const badgeStyle = {
   transform: "translate",
  }

  return (
    <>
       <Badge elementType="span" style={badgeStyle} badgeContent={4} color="secondary" anchorOrigin={{
    vertical: 'bottom',
    horizontal: "center",

  }}>
        <Paper style={paperStyle}>
        
          <Grid align="center">
            <Avatar style={iconStyle}>{props.icon}</Avatar>
            <h3>{props.title}</h3>
          </Grid>
          <Grid align="center">{props.content}</Grid>
          <Grid>{props.data}</Grid>
        </Paper>
      </Badge>
    </>
  );
}


export default Tile;
