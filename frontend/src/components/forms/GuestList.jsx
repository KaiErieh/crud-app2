import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { reset, getGuests, deleteGuest } from "../../features/guest/guestSlice";
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

export default function GuestList() {
  const paperStyle = {
    minHeight: "10vw",
    padding: 20,
    height: "25vh",
    width: 300,
    margin: "20px auto",
  };

  const { guestList, isLoading, isError, message, isDeleted } = useSelector(
    (state) => state.guest
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
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isDeleted) {
      toast.success("Guest deleted");
      setTimeout(() => window.location.reload(false), 1400);
    }

    dispatch(getGuests());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, isDeleted]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    navigate("/");
  }

   const handleDate = (date) => {
    const d = new Date(date).toLocaleDateString("cs-CZ")
    return d
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ backgroundColor: "black", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                E-mail
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Code
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Created at
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Start Date
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guestList.map((g, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {g.name}
                </TableCell>
                <TableCell align="center">
                  {g.email} &nbsp;
                  <IconButton color="primary" component="span">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {g.code} &nbsp;
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
                      <Grid align="center"> Send code to {g.name}?</Grid>
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
                <TableCell align="center">{handleDate(g.createdAt)}</TableCell>
                <TableCell align="center">{g.startDate}</TableCell>
                <TableCell align="center">
                  <button>
                    <EditIcon fontSize="small" />
                  </button>
                  &nbsp;
                  <button onClick={() => dispatch(deleteGuest(g._id))}>
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
