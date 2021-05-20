import React, { useState,useEffect,useContext } from 'react';
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
import {CheckRequests, GetTeacherInfo, GetExamDetails, AcceptOrDenyRequest} from '../firebase';
import { UserContext } from "../providers/UserProvider";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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
  const userDetails = useContext(UserContext);
  let {uid} = userDetails;

  const [teacherName, setTeacherName] = useState([]);
  const classes = useStyles(theme);
  const [requestList, setRequestList] = useState([]);
  const [examName, setExamName] = useState([]);

  useEffect(() => {
    const HandleList = (temp, temp1, temp2) => {
      setRequestList(temp);
      setTeacherName(temp1);
      setExamName(temp2);
      console.log(requestList);
      console.log(teacherName);
      console.log(examName);
    }
    const DisplayDetails = async () => {
      //console.log(details);
      let requests = await CheckRequests(uid);
      requestList.push(...requests);
      for(let i=0;i<requestList.length;i++){
        let details = await GetTeacherInfo(requestList[i].from);
        let examDetails = await GetExamDetails(requestList[i].exam);
        examName.push(examDetails.data().course['name']);
        teacherName.push(details.data().name);
      }
      HandleList(requestList, teacherName, examName);
    }
    DisplayDetails();
  },[requestList,uid,teacherName,examName]);

  const handleAccept = (requestID,index) => {
    console.log("accept", requestID);
    requestList.splice(index,1);
    setRequestList(requestList);
    console.log(requestList);
    AcceptOrDenyRequest(1,requestID);
  }

  const handleRejection = (requestID,index) => {
    console.log("Reject", requestID);
    requestList.splice(index,1);
    setRequestList(requestList);
    console.log(requestList);
    AcceptOrDenyRequest(0,requestID);
  }

return (
    <React.Fragment>
      <div>       
      <Title>Requests</Title> 
      <Link to = "/pendingRequest" style={{ textDecoration: 'none', color: "white" }}>
          <IconButton><RefreshIcon/></IconButton>
      </Link>
      </div>
      <div>
      <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Request From</b></TableCell>
              <TableCell><b>Date-Slot</b></TableCell>
              <TableCell><b>Exam</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {/* {console.log(examsList[0].dateSlot)} */}
          {(requestList).map((requestDetail, index) => (
              <TableRow key={requestDetail.requestID}>
              <TableCell>{teacherName[index]}</TableCell>
              <TableCell>{requestDetail.dateSlot}</TableCell>
              <TableCell>{examName[index]}</TableCell>
              <TableCell>
                <Link to="/pendingRequest">
                <IconButton onClick={() => handleAccept(requestDetail.requestID, index)} style={{ color: "green" }}><CheckCircleIcon/></IconButton>
                <IconButton onClick={() => handleRejection(requestDetail.requestID, index)} style={{ color: "red" }}><CancelIcon/></IconButton>
                </Link> 
              </TableCell>
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