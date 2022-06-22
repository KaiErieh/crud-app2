import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "bootstrap"
import { Grid, Paper, Avatar, TextField, Button, InputLabel, Select, MenuItem, FormControl } from "@mui/material"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { toast } from "react-toastify"
import { register, reset } from "../../features/auth/authSlice"
import Spinner from '../Spinner'


function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    role: "",
    email: "",
  })
  const { username, password, password2, role, email } = formData

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
        email,
        password,
        role,
      }
      dispatch(register(userData))
    }
  }

  const paperStyle = {
    minHeight: "25vw",
    padding: 20,
    height: "55vh",
    width: 280,
    margin: "20px auto",

  }

  const inputStyle = {
    margin: "5px auto",
    paddingBottom: "5px",
  }
  const selectStyle = {
    margin: "10px auto",
    paddingBottom: "2px",
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
              name="email"
              value={email}
              onChange={onChange}
              label="E-Mail"
              placeholder="Enter your e-mail" 
              type="text"
              fullWidth
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
              <FormControl fullWidth>
              <InputLabel id="role">
                Role
              </InputLabel>
              <Select name="role" style={selectStyle} fullWidth onChange={onChange} labelId="role" id="select" value={role} label="Role" >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="recruiter">Recruiter</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="hrbp">HR Business Partner</MenuItem>
              </Select>
              </FormControl>
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