import React, { useContext } from 'react';
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
import {GetExamDetails} from '../firebase';

const DisplayDetails = async () => {
  const user = useContext(UserContext);
  const {exams} = user;
  let detailsList = [];
  for(let i=0;i<exams.length;i++){
    let details = await GetExamDetails(exams[i])
    detailsList.push(details)
  }
  console.log(detailsList[0].data())
}

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

export default function UpcomingTeacher() {
  DisplayDetails();
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Upcoming Exams</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Room No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.fac}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.room}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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