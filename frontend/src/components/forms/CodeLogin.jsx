import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { codeLogin, reset } from "../../features/guest/guestSlice";

function CodeLogin() {
  const [codeData, setCodeData] = useState({
    code: "",
  });
  const { code } = codeData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { guest, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.guest
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || guest) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [guest, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setCodeData({ code: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const guestData = {
      code,
    };

    dispatch(codeLogin(guestData));
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
                <QrCode2Icon />
              </Avatar>
              <h2>Enter with your code</h2>
            </Grid>
            <TextField
              name="code"
              value={code}
              onChange={onChange}
              label="Code"
              placeholder="Enter your code..."
              fullWidth
              required
              style={inputStyle}
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Enter
            </Button>
          </Paper>
        </form>
      </Grid>
    </>
  );
}

export default CodeLogin;
