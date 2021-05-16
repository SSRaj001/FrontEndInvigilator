import React,{ useContext} from "react";
import SignIn from "./SignIn.js";
import { Router } from "@reach/router";
import AdminDashBoard from "./AdminDashBoard";
import FacultyDashBoard from "./FacultyDashBoard";
import StudentDashBoard from "./StudentDashBoard.js";
import { UserContext } from "../providers/UserProvider";
import UpcomingExams from "./UpcomingExams.js";
import UpcomingTeacher from './UpcomingTeacher.js'
import FacRequests from './FacultyRequests.js'

function Application() {
  let user = useContext(UserContext);
  // console.log(user);
  //const {displayName, email} = user;
  if (!user){
    return <SignIn />
  }
  else{
    const { usertype } = user;
    // console.log(usertype);
    if(usertype === 'T'){
        return (
            <Router>
            <FacultyDashBoard path='/'/>
            <UpcomingTeacher path='/upcomingTeacher' />
            <FacRequests path='/seeRequests'/>
            </Router>
        );
    }
    if(usertype === 'A'){
        return(
          <Router>
          <AdminDashBoard path = "/" />
          <UpcomingExams path = "/upcomingExams"/>
          </Router>
        );
    }
    if(usertype === 'S'){
      return <StudentDashBoard />
    }
    else{
        return <SignIn />;
    }
  }
}
export default Application;