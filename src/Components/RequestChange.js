import React,{ useEffect, useContext } from 'react';
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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import {GetExamDetails, GetTeachersDetails} from '../firebase';
import { UserContext } from "../providers/UserProvider";

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
  const [teacherList, setTeacherList] = React.useState([]);

  const userDetails = useContext(UserContext);
  const {displayName,exams} = userDetails;
  useEffect(() => {
    const HandleList = (temp) => {
      setDateList(temp)
      console.log(dateList)
    }
    const HandleTeacherList = (temp) => {
      setTeacherList(temp)
      console.log(teacherList)
    }
    const DisplayDetails = async () => {
      for(let i=0;i<exams.length;i++){
        let details = await GetExamDetails(exams[i])
        let data = details.data();
        console.log(data)
        dateList.push(data.dateSlot);
      }
      HandleList(dateList);
      let teacherDetails = await GetTeachersDetails();
      for(let i=0;i<teacherDetails.length;i++){
        if(teacherDetails[i].name !== displayName){
          teacherList.push(teacherDetails[i].name)
        }
      }
      HandleTeacherList(teacherList);
    }
    DisplayDetails();
  },[dateList, teacherList]);

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