/* eslint-disable react-hooks/exhaustive-deps */
import 'date-fns';
import React,{useState,useEffect} from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
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
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Checkbox,
  Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {GetAllClasses, GetSubjects, AddExam, ExtractEmails, ExtractTeacherEmail, GetRoomLocation} from '../firebase';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import firebase from "firebase/app";
import MuiAlert from '@material-ui/lab/Alert';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  
function getSteps() {
return ['Select Date', 'Select Subject', 'Select Classes', 'Review'];
}

function getStepContent(step) {
switch (step) {
    case 0:
    return 'Select the date and Time on which exam is required to be scheduled';
    case 1:
    return '';
    case 2:
    return '';
    case 3:
    return 'Review the Exam before confirmation';
    default:
    return 'Unknown step';
}
}

export default function NewExam() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectSession, setSelectSession] = React.useState(1);
  const [selectExam, setSelectExam]  = React.useState(1);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [selectedClasses, setSelectedClasses] = React.useState([]);
  let [subjectList,setSubjectList] = useState([]);
  let [classList, setClassList] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState("info");
  const [error, setError] = useState(null);


  useEffect(() => {
    const DisplayDetails = async () => {
      let details = await GetSubjects()
      let classDetails = await GetAllClasses();
      subjectList.push(...details);
      classList.push(...classDetails);
      HandleList(subjectList);
      HandleClassList(classList);
    }
    DisplayDetails();
  },[subjectList, classList]);

  // const sendValue = () => {
    
  // }

  const sendConfirmationEmail = (emailList, dates, sessions, rooms, roomLoc, faculty, classes, sub) => {
    let addMessage = firebase.functions().httpsCallable('sendExamBooked');
    addMessage({ 
      toEmail : emailList, // array of string or single string
      subject : sub, // string
      date : dates, // string
      time : sessions, //string
      room : rooms, // string
      Location: roomLoc, //string
      fac: faculty, //string
      classes: classes //string
     })
    .then((result) => {
      setSnackOpen(true)
      // Read result of the Cloud Function.
    });
  };
  
  const AddDataToDb = async() => {
    let sessionMapping = {
      '1' : "9:00 - 10:00",
      '2' : "10:00 - 11:00",
      '3' : "11:00 - 12:00",
      '4' : "12:00 - 13:00",
      '5' : "14:00 - 15:00",
      '6' : "15:00 - 16:00"
    }
    let dateSlot = `${selectedDate.getDate()}/${selectedDate.getMonth()+1}/${selectedDate.getFullYear()}-${selectSession}`;
    //console.log(selectExam);
    let ret = await AddExam(selectedClasses,dateSlot,selectExam);
    //console.log(ret);
    if(ret.type === 3){
      //console.log("success",ret.val); //ret.val = [teachername,roomAssigned,teacherID];
      let emailList = []
      for(let i=0;i<ret.classes.length;i++){
        let data = await ExtractEmails(ret.classes[i]);
        emailList.push(...data.data().students);
      }
      let roomLocPromise = await GetRoomLocation(ret.val[1]);
      let roomLoc = roomLocPromise.data().location;
      let selectedClassString = "";
      for(let i=0;i<selectedClasses.length;i++){
        selectedClassString = selectedClasses[i]+" ";
      }
      let date = `${selectedDate.getDate()}/${selectedDate.getMonth()+1}/${selectedDate.getFullYear()}`
      let teacherEmailData = await ExtractTeacherEmail(ret.val[2]);
      let teacherEmail = teacherEmailData.data().email;
      emailList.push(teacherEmail);
      //console.log(emailList,selectedClassString);
      setError("Faculty and Room found and mail is sent")
      setAlert("success")
      sendConfirmationEmail(emailList, date, sessionMapping[selectSession], ret.val[1], roomLoc, ret.val[0],selectedClassString, selectExam);
    }
    else{
      if(ret.type === 1){
        setError("Teacher Not Free");
        setAlert("warning")
        setSnackOpen(true)
      }
      else if(ret.type === 2){
        setError("Room Not Free");
        setAlert("warning")
        setSnackOpen(true)
      }
      else{
        setError("Date allocated for one of the classes already. choose another date");
        setAlert("warning")
        setSnackOpen(true)
      }
    }
    handleClose();
  }

  const HandleList = (temp) => {
    setSubjectList(temp);
  }

  const HandleClassList = (temp) => {
    setClassList(temp);
    //console.log(classList);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  const handleChange = (event) => {
    setSelectSession(event.target.value);
  };

  const handleChangeExam = (event) => {
    setSelectExam(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(new Date());
    setSelectSession(1);
    setSelectExam(1);
  };
  
  function getStep(step) {
    switch (step) {
        case 0:
        return (
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  value={selectedDate}  
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Session</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectSession}
                onChange={handleChange}
              >
                
                <MenuItem value={'1'}>9:00-10:00</MenuItem>
                <MenuItem value={'2'}>10:00-11:00</MenuItem>
                <MenuItem value={'3'}>11:00-12:00</MenuItem>
                <MenuItem value={'4'}>12:00-13:00</MenuItem>
                <MenuItem value={'5'}>14:00-15:00</MenuItem>
                <MenuItem value={'6'}>15:00-16:00</MenuItem>
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
                value={selectExam}
                onChange={handleChangeExam}
              >
                {subjectList.map((sub, index) =>
                  <MenuItem key={index} value={sub}>{sub}</MenuItem>
                )}
              </Select>
            </FormControl>
          </>
        );
        case 2:
        return (
          <>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={classList}
              onChange={(event, value) => setSelectedClasses(value)}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined"
                  label="Select Class"
                  placeholder="Class" />
              )}
            />
          </>);
        case 3:
        return (
          <>
            <br/>
            <Typography> 
              Entered details are : {`${selectedDate.getDate()}/${selectedDate.getMonth()+1}/${selectedDate.getFullYear()}-${selectSession}`} {selectExam} {selectedClasses}
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
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule Exam" />
      </ListItem>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              New Exam
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