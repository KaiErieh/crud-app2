import { useState, useEffect } from "react";
import "bootstrap";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  const paperStyle = {
    minHeight: "40vw",
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto",
  };

  const inputStyle = {
    margin: "5px auto",
    paddingBottom: "5px",
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Grid>
        <form onSubmit={onSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar>
                <VerifiedUserIcon />
              </Avatar>
              <h2>Log In</h2>
            </Grid>
            <TextField
              name="username"
              value={username}
              onChange={onChange}
              label="Username"
              placeholder="Enter username..."
              fullWidth
              required
              style={inputStyle}
            />
            <TextField
              name="password"
              value={password}
              onChange={onChange}
              label="Password"
              placeholder="Enter password..."
              type="password"
              fullWidth
              required
              style={inputStyle}
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Log in
            </Button>
          </Paper>
        </form>
      </Grid>
    </>
  );
}

export default LoginForm;
