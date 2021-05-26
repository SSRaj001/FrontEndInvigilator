import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NewExam from './NewExam';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "@reach/router";

export const mainListItems = (
  <div>
     <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>

    <NewExam/>

    <Link to="/requests" style={{ textDecoration: 'none', color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Faculty Requests" />
      </ListItem>
    </Link>

    <Link to="/upcomingExams" style={{ textDecoration: 'none', color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Exams"/>
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);