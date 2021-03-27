import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { auth } from "../firebase";
import firebase from "firebase/app";
import { UserContext } from "../providers/UserProvider";

export default function ChangePw() {
  const [open, setOpen] = React.useState(false);
  const [newPass, setNewPass] = useState('');
  const [cnfPass, setCnfPass] = useState('');

  const onChangeHandler = (event) => {
    console.log(event.currentTarget+"here")
    const {name, value} = event.currentTarget;

    if(name === 'newPW') {
        setNewPass(value);
    }
    else if(name ===  'cnfPW') {
      setCnfPass(value);
    }
  };

  const updatePassword = () =>{
    var user = firebase.auth().currentUser;
    user.updatePassword(newPass).then(() => {
      console.log("Password updated!");
    }).catch((error) => { console.log(error); });
    if(newPass === cnfPass){
      console.log(user);
      user.updatePassword(newPass).then(() => {
        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    }
    else{
      console.log("newPass and confirmed pass dont match");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updatePassword} color="primary">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}