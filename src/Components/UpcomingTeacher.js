/* eslint-disable react-hooks/exhaustive-deps */
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
import {GetExamDetails, GetRoomLocation} from '../firebase';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Link} from '@reach/router'


const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  addExam: {
    marginTop: theme.spacing(1),
  },
}));

export default function UpcomingTeacher() {

  const classes = useStyles(theme);

  const userDetails = useContext(UserContext);
  let [examsList,setExamsList] = useState([]);
  useEffect(() => {
    const DisplayDetails = async () => {
      const {exams} = userDetails;
      for(let i=0;i<exams.length;i++){
        let details = await GetExamDetails(exams[i])
        let data = details.data()
        let todayDate = new Date();
        let dateSlot = data.dateSlot;
        let [d,m,y] = dateSlot.split("/");// 2012-2
        y = y.split("-")[0]
        console.log([d,m,y]);
        let examDate = new Date(parseInt(y),parseInt(m)-1,parseInt(d));
        console.log(examDate)
        if(examDate >= todayDate){
          let room = data.room
          let loc = await GetRoomLocation(room)
          console.log(loc.data().location)
          data.location = loc.data().location
          data.id = exams[i]
          examsList.push(data)
        }
      }
      HandleList(examsList)
    }
    DisplayDetails();
  },[examsList]);
  
  const HandleList = (temp) => {
    setExamsList(temp)
    console.log(examsList)
  }
  return (
    <React.Fragment>
      <div>       
        <Title>Upcoming Exams</Title> 
        <Link to = "/upcomingTeacher" style={{ textDecoration: 'none', color: "white" }}>
          <IconButton><RefreshIcon/></IconButton>
        </Link>
      </div>
      <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Classes</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Room No</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(examsList).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dateSlot}</TableCell>
              <TableCell>{row.classes}</TableCell>
              <TableCell>{row.course['name']}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell>{row.location}</TableCell>
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
  );
}