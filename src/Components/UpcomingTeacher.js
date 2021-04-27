import React, { useContext, useState, useEffect } from 'react';
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

const rows = [];
  // createData(0, '16 Mar, 2020', 'Teacher 1', 'Software', 'A-101'),
  // createData(1, '17 Mar, 2020', 'Teacher 2', 'Compiler', 'A-101'),
  // createData(2, '18 Mar, 2020', 'Teacher 3', 'Comp Intelligence', 'A-101'),
  // createData(3, '19 Mar, 2020', 'Teacher 4', 'Networks', 'A-101'),
  // createData(4, '20 Mar, 2020', 'Teacher 5', 'Machine Learning', 'A-101'),
// ];

const DisplayDetails = async () => {
  const user = useContext(UserContext);
  const {exams} = user;
  for(let i=0;i<exams.length;i++){
    let details = await GetExamDetails(exams[i])
    rows.push(createDataFromObj(i, details.data()))
  }
  return rows
}

// function createData(id, date, fac, subject, room) {
//   return { id, date, fac, subject, room };
// }

function createDataFromObj(id, obj) {
  return { 
    id, 
    date: obj["dateSlot"], 
    fac: obj["classes"][0], 
    subject: obj["course"]["name"], 
    room: obj["room"]
  };
}

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
  const res = DisplayDetails()
  const [outRows, setOutRows] = useState([])
  const [load, setLoad] = useState(false)
  // // const DisplayDetails = async () => {
  // //   const user = useContext(UserContext);
  // //   const {exams} = user;
  // //   for(let i=0;i<exams.length;i++){
  // //     let details = await GetExamDetails(exams[i])
  // //     console.log(details.data())
  // //     rows.push(createDataFromObj(i, details.data()))
  // //   }
  // //   populateRows()
  // // }
  // DisplayDetails()
  const populateRows = () => {
    let tempArr = [];
    console.log(rows)
    for (let elem of rows){
      console.log(elem)
      tempArr.push(elem)
    }
    setOutRows(tempArr)
  }
  useEffect(()=>{
    populateRows()
    setLoad(true)
  }, [])
  const classes = useStyles();
      if(load){
        return (
        <React.Fragment>
          <Title>Upcoming Exams</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Classes</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Room No</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(outRows)}
              {outRows.map((row) => (
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
      else{
        return (<div>Loading</div>);
      }
}