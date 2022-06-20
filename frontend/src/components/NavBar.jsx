import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice"
import {useNavigate} from "react-router-dom"


function NavBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div style={{textDecoration: "none"}}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
          <IconButton size="large" edge="start" color='inherit'>
            <DashboardIcon />
          </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Onboarding Self-Service
          </Typography>
          <Stack direction="row" spacing={2}>
          <Link to="/dashboard">
            <Button color="inherit">Dashboard</Button>
            </Link>
            <Link to="/admin">
            <Button color="inherit">Administration</Button>
            </Link>
            {user ? (<Button onClick={onLogout} color="inherit"><LogoutIcon/> Log Out ({user.username})</Button>) : (null)}
          </Stack>
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default NavBar