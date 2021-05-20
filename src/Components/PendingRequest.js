import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'
import Title from './Title';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Link} from '@reach/router';
import {GetStudents} from '../firebase';

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

export default function PendingRequest() {
  const classes = useStyles(theme);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const HandleList = (temp) => {
      setStudentList(temp);
      console.log(studentList);
    }
      const DisplayDetails = async () => {
        let students = await GetStudents();
        studentList.push(...students);
      }
      DisplayDetails();
      HandleList(studentList);
  },[studentList]);

return (
    <React.Fragment>
      <div>       
      <Title>All Students</Title> 
      <Link to = "/students" style={{ textDecoration: 'none', color: "white" }}>
          <IconButton><RefreshIcon/></IconButton>
      </Link>
      </div>
      <div>
      <Table size="small">
          <TableHead>
          <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Section</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {/* {console.log(examsList[0].dateSlot)} */}
          {(studentList).map((studentDetail) => (
              <TableRow key={studentDetail.id}>
              <TableCell>{studentDetail.displayName}</TableCell>
              <TableCell>{studentDetail.section}</TableCell>
              </TableRow>
          ))}
          </TableBody>
      </Table>
      </div>
      <Box flex={1}/>
      <div className={classes.extra}>
      <div className={classes.addExam}>
      </div>
      </div>
      </React.Fragment>
    );
}