import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QrCode2Icon from '@mui/icons-material/QrCode2';



function CodeLogin() {
  const [codeData, setCodeData] = useState("")
  const { code } = codeData

  const onChange = (e) => {
    e.preventDefault()

    setCodeData({
      [e.target.name]: [e.target.value]
    })
  }
  const onSubmit = () => {
    console.log(codeData)
  }

  const paperStyle = {
    minHeight: "40vw",
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto",

  }


  const inputStyle = {
    margin: "5px auto",
    paddingBottom: "5px",
  }



  return (
    <>
      <Grid>
        <form onSubmit={onSubmit}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar><QrCode2Icon/></Avatar>
            <h2>Enter with your code</h2>
          </Grid>
          <TextField
            name="code"
            value={code}
            onChange={onChange}
            label="Code"
            placeholder="Enter your code..." fullWidth
            required
            style={inputStyle} />
          <Button 
          variant="contained" 
          type="submit" 
          color="primary" 
          fullWidth >Enter</Button>
        </Paper>
        </form>
      </Grid>
    </>
  )
}

export default CodeLogin