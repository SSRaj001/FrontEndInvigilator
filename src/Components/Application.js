import React,{ useContext} from "react";
import SignIn from "./SignIn.js";
import AdminDashBoard from "./AdminDashBoard";
import FacultyDashBoard from "./FacultyDashBoard";
import StudentDashBoard from "./StudentDashBoard.js";
import { UserContext } from "../providers/UserProvider";

function Application() {
  let user = useContext(UserContext);
  console.log(user);
  //const {displayName, email} = user;
  if (!user){
    return <SignIn />
  }
  else{
    const { usertype } = user;
    console.log(usertype);
    if(usertype === 'T'){
        return <FacultyDashBoard />;
    }
    if(usertype === 'A'){
        return <AdminDashBoard />;
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