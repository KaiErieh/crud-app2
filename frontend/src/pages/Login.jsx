import { Grid } from "@mui/material";
import React from "react";
import CodeLogin from "../components/forms/CodeLogin";
import LoginForm from "../components/forms/LoginForm";

function Login() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <LoginForm />
        </Grid>
        <Grid item md={2}>
          <CodeLogin />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
