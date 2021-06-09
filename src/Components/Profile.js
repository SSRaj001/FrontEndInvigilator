/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ChangePw from './ChangePw';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { UserContext } from "../providers/UserProvider";
import {storage} from '../firebase';
import {useState} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
// import ReactFirebaseFileUpload from './ReactImageUpload';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  img: {
    borderRadius: '50%',
    height: '250px',
    width:'250px',
    align: 'center',
  },
});

export default function Profile() {
  const user = useContext(UserContext);
  const {email, displayName, usertype, profileLink} = user;
  const classes = useStyles();
  const [image,setImage] = useState(null);
  const [url,setUrl] = useState(String);
  setUrl(profileLink)
  const handleChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  };

  const loadImage = () => {
    // storage.ref("images")
    // .child(user.uid)
    // .getDownloadURL()
    // .then(url => {
    //   console.log(url);
    //   setUrl(url);
    // }).catch(err => {
    //   setUrl(profileLink)
    // });
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${user.uid}`).put(image);
    uploadTask.on("state_changed",
    snapshot => {},
    error => {console.log(error);},
    );
    loadImage();
  };
  // console.log(url);
  // console.log("image: ", image);
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
  loadImage()
  return (
    <React.Fragment>
      <Title>{currUser}Profile</Title>
      <Typography component="p" align='center' variant="h4">
        {displayName}
      </Typography>
      <Typography color="textSecondary" align='center' className={classes.depositContext}>
        {email}
      </Typography>
      {/* PP TIME */}
      <div align="center">
         <img src = {url} className = {classes.img} alt='why'/>
      </div>
      <Typography component="p" align='center' variant="h6">Change Profile Picture </Typography>
      <Button> <input type = "file" onChange = {handleChange}/> </Button>
      <Button onClick = {handleUpload}> Upload </Button>
      {/* NO MORE PP TIME */}
      <Box flex={1}/>
      <div>
        <ChangePw />
      </div>
    </React.Fragment>
  );
}

