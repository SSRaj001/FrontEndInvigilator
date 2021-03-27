import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "@reach/router";
import {signInWithGoogle} from "../firebase";
import {auth} from "../firebase";
import Application from "./Application";
import { UserContext } from "../providers/UserProvider";

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  export default function SignIn() {

    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [email, setEmail] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
      console.log(email,password)
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
    };

    const onChangeHandler = (event) => {
      console.log(event.currentTarget+"here")
      const {name, value} = event.currentTarget;

      if(name === 'userEmail') {
          setEmail(value);
      }
      if(name ==  'resetEmail') {
        setResetEmail(value);
      }
      else if(name === 'userPassword'){
      setPassword(value);
      }
    };

    const sendResetEmail = event => {
      event.preventDefault();
      auth.sendPasswordResetEmail(resetEmail)
        .then(() => {
          console.log("inside reset");
          setOpen(false);
          setEmailHasBeenSent(true);
          setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        })
        .catch((error) => {
          console.log(error);
          setError("Error resetting password");
        });
    };

    const classes = useStyles(theme);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="Email Address"
              name="userEmail"
              value = {email}
              autoComplete="userEmail"
              onChange = {(event) => onChangeHandler(event)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="Password"
              type="password"
              id="userPassword"
              value = {password}
              onChange = {(event) => onChangeHandler(event)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
            >
              Sign In
            </Button>
                <div>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Forgot Password
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Reset Password
                      </DialogContentText>
                       <TextField
                        margin="dense"
                        id="resetEmail"
                        label="Enter Email"
                        type="email"
                        value = {resetEmail}
                        name = "resetEmail"
                        onChange = {(event) => onChangeHandler(event)}
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Close
                      </Button>
                      <Button onClick = {sendResetEmail} color="primary">
                        Reset
                      </Button>
                    </DialogActions>
                  </Dialog>
              </div>
          </form>
        </div>
      </Container>
    );
  }