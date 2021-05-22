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
import NewExam from './NewExam';
import { UserContext } from "../providers/UserProvider";
import {GetAllExamDetails, GetClassRelatedExams, GetRoomLocation, GetTeacherName} from '../firebase';
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


export default function UpcomingExams() {
  const classes = useStyles(theme);

  const userDetails = useContext(UserContext);
  let [examsList,setExamsList] = useState([]);
  useEffect(() => {
    const DisplayDetails = async () => {
      const {usertype} = userDetails;
      if(usertype === "S"){
        const {section} = userDetails;
        let details = await GetClassRelatedExams(section)
        for(let i=0;i<details.length;i++){
          console.log(details[i].room);
          let loc = await GetRoomLocation(details[i].room);
          console.log(loc.data());
          details[i].location = loc.data().location;
        }
        examsList.push(...details)
      }
      else{
        let details = await GetAllExamDetails();
        for(let i=0;i<details.length;i++){
          let loc = await GetRoomLocation(details[i].room);
          let teacherDetails = await GetTeacherName(details[i].faculty);
          details[i].facName = teacherDetails.data().displayName;
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
    <React.Fragment>
      <div>       
        <Title>Upcoming Exams</Title> 
        <Link to = "/upcomingExams" style={{ textDecoration: 'none', color: "white" }}>
          <IconButton><RefreshIcon/></IconButton>
        </Link>
      </div>
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
            <TableCell>Date-Slot</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Room No</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Teacher</TableCell>
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
                <TableCell>{examDetail.facName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Box flex={1}/>
      <div className={classes.extra}>
        <div className={classes.addExam}>
            <NewExam />
        </div>
      </div>
  </React.Fragment>
  );
}