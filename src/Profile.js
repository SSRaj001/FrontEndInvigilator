import React from 'react';
import ChangePw from './ChangePw'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Profile</Title>
      <Typography component="p" variant="h4">
        Name
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Email
      </Typography>
      <div>
        <ChangePw />
      </div>
    </React.Fragment>
  );
}