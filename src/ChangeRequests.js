import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function createData(id, date, fac1, fac2, subject, room, status) {
  return { id, date, fac1, fac2, subject, room, status };
}

const rows = [
  createData(0, '16 Mar, 2020', 'Teacher 1', 'Teacher 2', 'Software', 'A-101', 'Pending'),
  createData(1, '17 Mar, 2020', 'Teacher 2', 'Teacher 1', 'Compiler', 'A-101', 'Pending'),
  createData(2, '18 Mar, 2020', 'Teacher 3', 'Teacher 6', 'Comp Intelligence', 'A-101', 'Confirmed'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ChangeRequests() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Change Requests</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Room No</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.fac1}</TableCell>
              <TableCell>{row.fac2}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Requests
        </Link>
      </div>
    </React.Fragment>
  );
}