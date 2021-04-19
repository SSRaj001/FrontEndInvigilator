import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/functions';
import { UserContext } from "../providers/UserProvider";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ChangePw() {
  const user = useContext(UserContext);
  const {email} = user;
  const [open, setOpen] = React.useState(false);
  const [newPass, setNewPass] = useState('');
  const [cnfPass, setCnfPass] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState("info");
  const [error, setError] = useState(null);
  //const db=firebase.firestore();

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if(name === 'newPW') {
        setNewPass(value);
    }
    else if(name ===  'cnfPW') {
      setCnfPass(value);
    }
  };

  const sendConfirmationEmail = () => {
    let addMessage = firebase.functions().httpsCallable('sendPassChangeEmail');
    addMessage({ toEmail : email })
    .then((result) => {
      // Read result of the Cloud Function.
    });
  };

  const updatePassword = () =>{
    let user = firebase.auth().currentUser;
    if(newPass.length < 6){
      setError("Minimum Password Length : 6");
      setAlert("warning");
      setSnackOpen(true);
    }
    else if(newPass === cnfPass){
      user.updatePassword(newPass).then(() => {
        sendConfirmationEmail();
        setError("Password Updated and Email Sent");
        setAlert("success");
        setSnackOpen(true);
        handleClose();
      }).catch((error) => {
        setError("Error pls try again later");
        setAlert("error");
        setSnackOpen(true);
      });
    }
    else{
      setError("Password and confirm Password doesnt Match");
      setAlert("warning");
      setSnackOpen(true);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewPass("");
    setCnfPass("");
    setOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} id="pwChange">
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will Change your Password
          </DialogContentText>
          <TextField
            margin="dense"
            id="newPW"
            label="New Password"
            type="password"
            value = {newPass}
            name = "newPW"
            fullWidth
            onChange = {(event) => onChangeHandler(event)}
          />
          <TextField
            margin="dense"
            id="cnfPW"
            label="Confirm Password"
            type="password"
            value = {cnfPass}
            name = "cnfPW"
            fullWidth
            onChange = {(event) => onChangeHandler(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" id="closeComponent">
            Cancel
          </Button>
          <Button onClick={updatePassword} color="primary" id="pwUpdate">
            Change
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={alert}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}