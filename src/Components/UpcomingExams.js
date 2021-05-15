import React, { useContext,useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'
import Title from './Title';
import RequestChange from './RequestChange';
import { UserContext } from "../providers/UserProvider";
import {GetAllExamDetails, GetClassRelatedExams, GetRoomLocation} from '../firebase';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createMuiTheme } from '@material-ui/core/styles';
import {auth} from "../firebase"
import { mainListItems } from './ListItemsAdmin';


const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    paddingRight: 24, 
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 700,
  },
}));

export default function UpcomingExams() {
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const userDetails = useContext(UserContext);
  let [examsList,setExamsList] = useState([]);
  useEffect(() => {
    const DisplayDetails = async () => {
      const {usertype} = userDetails;
      if(usertype === "S"){
        const {section} = userDetails;
        let details = await GetClassRelatedExams(section)
        for(let i=0;i<details.length;i++){
          console.log(details[i].room)
          let loc = await GetRoomLocation(details[i].room);
          console.log(loc.data());
          details[i].location = loc.data().location;
        }
        examsList.push(...details)
      }
      else{
        let details = await GetAllExamDetails();
        for(let i=0;i<details.length;i++){
          console.log(details[i].room)
          let loc = await GetRoomLocation(details[i].room);
          console.log(loc.data());
          details[i].location = loc.data().location;
        }
        examsList.push(...details)
      }
      HandleList(examsList);
    }
    DisplayDetails();
  },[examsList]);
  
  const HandleList = (temp) => {
    setExamsList(temp)
    console.log(examsList)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Exams
          </Typography>
          <IconButton color="inherit" onClick = {() => {auth.signOut()}}>
              <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
              <React.Fragment>
                <Title>Upcoming Exams</Title>
                <div>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                    <TableCell>Date-Slot</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Room No</TableCell>
                    <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {console.log(examsList[0].dateSlot)} */}
                    {(examsList).map((examDetail) => (
                      <TableRow key={examDetail.id}>
                        <TableCell>{examDetail.dateSlot}</TableCell>
                        <TableCell>{examDetail.course['name']}</TableCell>
                        <TableCell>{examDetail.room}</TableCell>
                        <TableCell>{examDetail.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
                <Box flex={1}/>
                <div className={classes.extra}>
                  <div className={classes.addExam}>
                      <RequestChange />
                  </div>
                </div>
              </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}