import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { reset, getUsers, deleteUser } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, Grid, IconButton, Modal } from "@mui/material";
import "./Forms.css";
import SendIcon from "@mui/icons-material/Send";

export default function UserList() {
  const paperStyle = {
    minHeight: "10vw",
    padding: 20,
    height: "25vh",
    width: 300,
    margin: "20px auto",
  };

  const { user, userList, isLoading, isError, message, isDeleted } = useSelector(
    (state) => state.auth
  );
  const [sendOpen, setSendOpen] = useState(false);
  const handleSend = () => {
    setSendOpen(true);
  };
  const handleSendClose = () => {
    setSendOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isDeleted) {
      toast.success("User deleted");
      setTimeout(() => window.location.reload(false), 1400);
    }

    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, isDeleted]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDate = (date) => {
    const d = new Date(date).toLocaleDateString("cs-CZ")
    return d
  }

  if (!user) {
    navigate("/");
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ backgroundColor: "black", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Username</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Role
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                E-Mail
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Joined
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((u, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {u.username}
                </TableCell>
                <TableCell align="center">
                  {u.role} &nbsp;
                </TableCell>
                <TableCell align="center">
                  {u.email} &nbsp;
                  <IconButton color="primary" component="span">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  &nbsp;
                  <IconButton
                    onClick={handleSend}
                    color="primary"
                    component="span"
                  >
                    <SendIcon color="primary" fontSize="small" />
                  </IconButton>
                  <Modal
                    open={sendOpen}
                    onClose={handleSendClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Paper elevation={10} style={paperStyle}>
                      <Grid align="center"> Send code to {u.name}?</Grid>
                      <Grid spacing={4}>
                        <Button
                          md={2}
                          variant="contained"
                          color="success"
                          type="submit"
                        >
                          Send E-Mail
                        </Button>
                        &nbsp;
                        <Button
                          style={{ margin: "20px 12%" }}
                          variant="contained"
                          color="primary"
                          onClick={() => setSendOpen(false)}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Paper>
                  </Modal>
                </TableCell>
                <TableCell align="center">{handleDate(u.createdAt)}</TableCell>
                <TableCell align="center">
                  <button>
                    <EditIcon fontSize="small" />
                  </button>
                  &nbsp;
                  <button onClick={() => dispatch(deleteUser(u._id))}>
                    <DeleteForeverIcon fontSize="small" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
