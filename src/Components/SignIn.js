import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LocalLibrary';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { auth } from "../firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  export default function SignIn() {

    const [email, setEmail] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState("info")

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).then(result =>{
        setError("Welcome")
        setAlert("success")
        setSnackOpen(true)
      }).catch(err => {
        setError("Incorrect Credentials")
        setAlert("error")
        setSnackOpen(true)
      });
    };

    const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;

      if(name === 'userEmail') {
          setEmail(value);
      }
      if(name ===  'resetEmail') {
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
          setOpen(false);
          setError("Check you inbox for further details")
          setAlert("info")
          setSnackOpen(true)
        })
        .catch((error) => {
          setError("Email doesn't Exist");
          setAlert("error")
          setSnackOpen(true)
        });
        setResetEmail("")
    };

    const classes = useStyles(theme);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setResetEmail("")
    };

    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackOpen(false);
    };
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            The Invigilator
          </Typography>
          <Typography component="h2" variant="h6">
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
        <Snackbar open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity={alert}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    );
  }