import React, { useContext } from 'react';
import ChangePw from './ChangePw'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { UserContext } from "../providers/UserProvider";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const user = useContext(UserContext);
  const {email, displayName, usertype} = user;
  const classes = useStyles();
  let currUser = null;
  if(usertype === 'S'){
    currUser = "Student";
  }
  if(usertype === 'T'){
    currUser = "Teacher";
  }
  if(usertype === 'A'){
    currUser = "Admin";
  }
  return (
    <React.Fragment>
      <Title>{currUser}   Profile</Title>
      <Typography component="p" variant="h4">
        {displayName}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {email}
      </Typography>
      <div>
        <ChangePw />
      </div>
    </React.Fragment>
  );
}