import { Avatar, Button, Grid, Modal, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useDispatch, useSelector } from "react-redux";
import { addGuest, reset } from "../../features/guest/guestSlice";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

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

function CreateGuest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: "",
  });
  const { name, email, startDate } = formData;

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.guest
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Guest created");
      setTimeout(() => setOpen(false), 200);
      setTimeout(() => window.location.reload(false), 200);
    }
    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      startDate,
    };

    dispatch(addGuest(payload));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Add Guest &nbsp; 
        <PersonAddAltIcon fontSize="inherit" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={onSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar>
                <PersonAddAltIcon />
              </Avatar>
              <h2>Add New Guest</h2>
            </Grid>
            <TextField
              onChange={onChange}
              name="name"
              label="Name (Optional)"
              placeholder="Enter name..."
              type="text"
              value={name}
              style={inputStyle}
              fullWidth
            />
            <TextField
              onChange={onChange}
              name="email"
              label="Email"
              placeholder="Enter email..."
              style={inputStyle}
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              name="startDate"
              label="Start Date"
              placeholder="Enter start date..."
              type="text"
              style={inputStyle}
              fullWidth
              required
            />
            <Button variant="contained" type="submit" color="success">
              Add
            </Button>
            &nbsp;
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              style={{ alignSelf: "right" }}
            >
              Cancel
            </Button>
          </Paper>
        </form>
      </Modal>
    </div>
  );
}

export default CreateGuest;
