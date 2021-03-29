import React, { useContext } from 'react';
import ChangePw from './ChangePw';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { UserContext } from "../providers/UserProvider";
import {storage} from '../firebase';
import {useState} from "react";
// import ReactFirebaseFileUpload from './ReactImageUpload';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const user = useContext(UserContext);
  const {email, displayName, usertype} = user;
  const classes = useStyles();
  const [image,setImage] = useState(null);
  const [url,setUrl] = useState(String);
  const handleChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${user.uid}`).put(image);
    uploadTask.on("state_changed",
    snapshot => {},
    error => {console.log(error);},
    () => {
      storage.ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setUrl(url);
      });
    }
    );
  };
  console.log(url);
  console.log("image: ", image);
  let currUser = null;
  if(usertype === 'S'){
    currUser = "Student";
  }
  if(usertype === 'T'){
    currUser = "Faculty";
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
      {/* PP TIME */}
      <Typography component="p" variant="h4">Change Profile Picture </Typography>
      <button><input type = "file" onChange = {handleChange}/></button>
      <button onClick = {handleUpload}>Upload</button>
      <div align="center">
         <img src = {url} className = "img-fluid" height="300px" width = "300px" alt = "WHY" align = "center"/>
      </div>
      {/* NO MORE PP TIME */}
      <div>
        <ChangePw />
      </div>
    </React.Fragment>
  );
}

