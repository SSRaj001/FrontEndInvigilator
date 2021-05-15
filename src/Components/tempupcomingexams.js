import React, { useContext,useState,useEffect } from 'react';
import Link from '@material-ui/core/Link';
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
import {GetAllExamDetails, GetClassRelatedExams, GetRoomLocation, GetTeachers} from '../firebase';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  addExam: {
    marginTop: theme.spacing(1),
  },
}));

export default function UpcomingExams() {

  const userDetails = useContext(UserContext);
  let temp = []
  let [examsList,setExamsList] = useState([]);
  useEffect(() => {
    const DisplayDetails = async () => {
      const {usertype} = userDetails;
      if(usertype == "S"){
        const {section} = userDetails;
        let details = await GetClassRelatedExams(section)
        for(let i=0;i<details.length;i++){
          // console.log(details[i].room)
          let loc = await GetRoomLocation(details[i].room);
          //console.log(loc.data());
          details[i].location = loc.data().location;
        }
        examsList.push(...details)
      }
      else{
        let details = await GetAllExamDetails();
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

  const classes = useStyles();  
  return (
    <React.Fragment>
      <Title>Upcoming Exams</Title>
      <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
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
        <div className={classes.seeMore}>
            <Link color="primary" href="#" onClick={preventDefault}>
            See more Exams
            </Link>
        </div>
        <div className={classes.addExam}>
            <RequestChange />
        </div>
      </div>
    </React.Fragment>
  );
}