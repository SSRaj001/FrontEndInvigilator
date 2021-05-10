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
import {GetClassRelatedExams, GetTeachers} from '../firebase';


function createData(id, date, fac, subject, room) {
  return { id, date, fac, subject, room };
}

const rows = [
  createData(0, '16 Mar, 2020', 'Teacher 1', 'Software', 'A-101'),
  createData(1, '17 Mar, 2020', 'Teacher 2', 'Compiler', 'A-101'),
  createData(2, '18 Mar, 2020', 'Teacher 3', 'Comp Intelligence', 'A-101'),
  createData(3, '19 Mar, 2020', 'Teacher 4', 'Networks', 'A-101'),
  createData(4, '20 Mar, 2020', 'Teacher 5', 'Machine Learning', 'A-101'),
];

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
  const [exam,setExam] = useState(null);
  useEffect(() => {
    const DisplayDetails = async () => {
      const {section} = userDetails;
      let details = await GetClassRelatedExams(section)
      //temp.push(details.data())
      examsList.push(...details)
      //examsList = temp
      HandleList(examsList)
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
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(examsList[0].dateSlot)} */}
          {(examsList).map((examDetail) => (
            <TableRow key={examDetail.id}>
              <TableCell>{examDetail.dateSlot}</TableCell>
              <TableCell>{examDetail.course['name']}</TableCell>
              <TableCell>{examDetail.room}</TableCell>
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