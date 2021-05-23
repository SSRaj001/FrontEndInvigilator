import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Link } from "@reach/router";
import RequestChange from './RequestChange'

export const mainListItems = (
  <div>
    <Link to = "/" style={{ textDecoration: 'none', color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <RequestChange/>
    <Link to="/upcomingTeacher" style={{ textDecoration: 'none', color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Exams"/>
      </ListItem>
    </Link>
    <Link to="/pendingRequest" style={{ textDecoration: 'none', color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <AccessTimeIcon />
        </ListItemIcon>
        <ListItemText primary="Pending Requests"/>
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);