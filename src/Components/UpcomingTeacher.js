/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { UserContext } from "../providers/UserProvider";
import {GetExamDetails, GetRoomLocation, GetUserInfo} from '../firebase';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Link} from '@reach/router';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'dateSlot', numeric: true, disablePadding: true, label: 'Date-Slot' },
  { id: 'course', numeric: true, disablePadding: true, label: 'Subject' },
  { id: 'classes' , numeric: true, disablePadding: true, label: 'Classes' },
  { id: 'room', numeric: true, disablePadding: true, label: 'Room No' },
  { id: 'location', numeric: true, disablePadding: true, label: 'Location' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant='h6'>
              {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 850,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function SortingTable(props) {
  const {studentList, headText} = props
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('displayName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, studentList.length - page * rowsPerPage);

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant='h5'>
        {headText}
        </Typography>
        <br></br>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={studentList.length}
            />
            <TableBody>
              {stableSort(studentList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.displayName}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.dateSlot}
                      </TableCell>
                      <TableCell >{row.course['name']}</TableCell>
                      <TableCell >{row.classes}</TableCell>
		              <TableCell >{row.room}</TableCell>
		              <TableCell >{row.location}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 20]}
          component="div"
          count={studentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default function AdminRequest(){
  const userDetails = useContext(UserContext);
  let [examsList,setExamsList] = useState([]);
  useEffect(() => {
    const DisplayDetails = async () => {
      const {uid} = userDetails;
      let userInfo = await GetUserInfo(uid);
      let exams = userInfo.data().exams;
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
      <>
        <Link to = "/upcomingTeacher" style={{ textDecoration: 'none', color: "black"}}>
            <IconButton><RefreshIcon/> Refresh</IconButton>
        </Link>
        <br></br>
        <SortingTable studentList={examsList} headText={"Upcoming Exams"}/>
      </>
  );
}