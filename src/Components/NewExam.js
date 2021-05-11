import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    return 'Select the date on which exam is required to be scheduled';
    case 1:
    return '';
    case 2:
    return 'Select Classes'
    case 3:
    return 'Review the Exam before confirmation';
    default:
    return 'Unknown step';
}
}

export default function NewExam() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-08-18T21:11:54'));
  const [selectSession, setSelectSession] = React.useState(1);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

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

  const handleClose = () => {
    setOpen(false);
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
                <MenuItem value={1}>9:00-10:00</MenuItem>
                <MenuItem value={2}>10:00-11:00</MenuItem>
                <MenuItem value={3}>11:00-12:00</MenuItem>
                <MenuItem value={4}>12:00-13:00</MenuItem>
                <MenuItem value={5}>14:00-15:00</MenuItem>
                <MenuItem value={6}>15:00-16:00</MenuItem>
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
                value={selectSession}
                onChange={handleChange}
              >
                <MenuItem value={1}>Algorithms</MenuItem>
                <MenuItem value={2}>Operating Systems</MenuItem>
                <MenuItem value={3}>Embedded Systems</MenuItem>
                <MenuItem value={4}>DBMS</MenuItem>
                <MenuItem value={5}>Compiler</MenuItem>
                <MenuItem value={6}>Networks</MenuItem>
              </Select>
            </FormControl>
          </>
        );
        case 2:
        return (<></>);
        case 3:
        return "Review";
        default:
        return 'Unknown step';
    }
    }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Schedule Exam
      </Button>
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
                <Button onClick={handleClose} className={classes.button}>
                    Confirm
                </Button>
                </Paper>
            )}
        </div>
      </Dialog>
    </div>
  );
}