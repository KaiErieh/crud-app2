import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "bootstrap"
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { toast } from "react-toastify"
import { register, reset } from "../../features/auth/authSlice"
import Spinner from '../Spinner'


function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  })
  const { username, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate("/dashboard")
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    
    if(password !== password2){
      toast.error("Passwords do not match")
    } else {
      const userData = {
        username,
        password,
      }
      dispatch(register(userData))
    }
  }

  const paperStyle = {
    minHeight: "40vw",
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto",

  }



  const iconStyle = {
    color: "#D40511",
  }

  const inputStyle = {
    margin: "5px auto",
    paddingBottom: "5px",
  }

  if(isLoading){
    return <Spinner />
  }
  
  return (
    <>
      <Grid>
        <form onSubmit={onSubmit}>
          <Paper elevation={1} style={paperStyle}>
            <Grid align="center">
              <Avatar><PersonAddAltIcon /></Avatar>
              <h2>Register</h2>
            </Grid>
            <TextField
              name="username"
              value={username}
              onChange={onChange}
              label="Username"
              placeholder="Enter username..." fullWidth
              required
              style={inputStyle} />
            <TextField
              name="password"
              value={password}
              onChange={onChange}
              label="Password"
              placeholder="Enter password..." type="password"
              fullWidth
              required
              style={inputStyle} />
            <TextField
              name="password2"
              value={password2}
              onChange={onChange}
              label="Confirm password"
              placeholder="Confirm password..." type="password"
              fullWidth
              required
              style={inputStyle} />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth >Register</Button>
          </Paper>
        </form>
      </Grid>
    </>
  )
}

export default RegisterForm