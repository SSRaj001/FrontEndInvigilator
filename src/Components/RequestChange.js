/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState, useEffect, useContext } from 'react';
import firebase from "firebase/app";
import {GetExamDetails, GetTeachersDetails, RequestChangeExam, GetUserInfo} from '../firebase';
import { UserContext } from "../providers/UserProvider";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  
function getSteps() {
return ['Select Exam', 'Select Faculty', 'Review'];
}

function getStepContent(step) {
switch (step) {
    case 0:
    return 'Select Exam that needs to be chaged';
    case 1:
    return 'Select faculty to replace';
    case 2:
    return 'Review the Exam before confirmation';
    default:
    return 'Unknown step';
}
}

export default function RequestChange() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [dateList, setDateList] = React.useState([]);
  const [examID, setExamId] = React.useState([]);
  const [teacherList, setTeacherList] = React.useState([]);
  const [teacherID, setTeacherID] = React.useState([]);
  const [dateSlot, setDateSlot] = React.useState(0);
  const [faculty, setFaculty] = React.useState(0);
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState("info");
  const [error, setError] = useState(null);

  const userDetails = useContext(UserContext);
  const {displayName, exams, uid} = userDetails;

  const sendConfirmationEmail = (emailList, dates, sessions, rooms, faculty, sub) => {
    let addMessage = firebase.functions().httpsCallable('newChangeRequest');
    addMessage({ 
      toEmail : emailList, // array of string or single string
      subject : sub, // string
      date : dates, // string
      time : sessions, //string
      room : rooms, // string
      fac: faculty, //string
      classes: classes //string
     })
    .then((result) => {
      setSnackOpen(true);
      // Read result of the Cloud Function.
    });
  };

  const AddDataToDb = async() => {
    //console.log(teacherID[faculty], teacherList[faculty])
    //console.log(uid) // From ID
    //console.log(dateList[dateSlot]) // dateslot
    //console.log(examID[dateSlot]) //examID
    
    let ret = await RequestChangeExam(uid, dateList[dateSlot], teacherID[faculty], examID[dateSlot]);
    if(ret.type === 0 || ret.type === 2){
      let teach = teacherID[faculty]
      if (ret.type === 0){ // details of requetsted teacher snack and mail
        setError("Requested teacher is free and Mail is sent ");
        setAlert("success");
      }
      else{
        setError("Assigned a alternate teacher and Mail is sent ");
        setAlert("success");
        teach = ret.val
      }
      let teacherPromise = await GetUserInfo(teach);
      let examDetails = await GetExamDetails(examID[dateSlot]);
      let examName = examDetails.data().course['name'];
      let requestedDateSlot = dateList[dateSlot];
      let teacherFromName = displayName;
      let teacherToEmail = teacherPromise.data().email;
      let room = examDetails.data().room
      let sessionMapping = {
        '1' : "9:00 - 10:00",
        '2' : "10:00 - 11:00",
        '3' : "11:00 - 12:00",
        '4' : "12:00 - 13:00",
        '5' : "14:00 - 15:00",
        '6' : "15:00 - 16:00"
      }
      sendConfirmationEmail(teacherToEmail, requestedDateSlot.substring(0,requestedDateSlot.length-2),sessionMapping[requestedDateSlot.substr(-1)], room ,teacherFromName, examName )
    }
    else if(ret.type === 1){ // add snack bar
      setError("No Teacher are free at the given DateSlot");
      setAlert("error");
      setSnackOpen(true);
    }
    handleClose()
  }

  useEffect(() => {
    const HandleList = (temp, temp1) => {
      setDateList(temp)
      setExamId(temp1)
      //console.log(dateList)
    }
    const HandleTeacherList = (temp, temp1) => {
      setTeacherList(temp);
      setTeacherID(temp1)
      //console.log(teacherList);
    }
    const DisplayDetails = async () => {
      for(let i=0;i<exams.length;i++){
        let details = await GetExamDetails(exams[i])
        let data = details.data();
        //console.log(data);
        let todayDate = new Date();
        let dateSlot = data.dateSlot;
        let [d,m,y] = dateSlot.split("/");// 2012-2
        y = y.split("-")[0]
        //console.log([d,m,y]);
        let examDate = new Date(parseInt(y),parseInt(m)-1,parseInt(d));
        //console.log(examDate);
        if(examDate >= todayDate){
          dateList.push(data.dateSlot);
          examID.push(exams[i]);
        }
      }
      HandleList(dateList, exams);
      let teacherDetails = await GetTeachersDetails();
      for(let i=0;i<teacherDetails.length;i++){
        if(teacherDetails[i].name !== displayName){
          teacherList.push(teacherDetails[i].name)
          teacherID.push(teacherDetails[i].tid)
        }
      }
      HandleTeacherList(teacherList, teacherID);
    }
    DisplayDetails();
  },[dateList, teacherList, teacherID]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    handleReset()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeDate= (event) => {
    setDateSlot(event.target.value);
  };

  const handleChangeFac= (event) => {
    setFaculty(event.target.value);
  };

  function getStep(step) {
    switch (step) {
        case 0:
        return (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dateSlot}
                onChange={handleChangeDate}
              >
                {dateList.map((sub, index) =>
                  <MenuItem key={index} value={index}>{sub}</MenuItem>
                )}
              </Select>
            </FormControl>
          </>
          );
        case 1:
        return (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={faculty}
                onChange={handleChangeFac}
              >
                {teacherList.map((sub, index) =>
                  <MenuItem key={index} value={index}>{sub}</MenuItem>
                )}
              </Select>
            </FormControl>
          </>
        );
        case 2:
        return (
          <>
            <br/>
            <Typography> 
              Entered details are : {dateList[dateSlot]} and {teacherList[faculty]}
            </Typography>
          </>);
        default:
        return 'Unknown step';
    }
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <SwapHorizIcon />
        </ListItemIcon>
        <ListItemText primary="Request Change" />
      </ListItem>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Change Exam
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div>{getStep(index)}</div>
                    <div className={classes.actionsContainer}>
                        <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>Confirm Again</Typography>
              <Button onClick={AddDataToDb} className={classes.button}>
                  Confirm
              </Button>
              </Paper>
            )}
        </div>
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={alert}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}