import React,{ useContext} from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn.js";
import AdminDashBoard from "./AdminDashBoard";
import FacultyDashBoard from "./FacultyDashBoard";
import { UserContext } from "../providers/UserProvider";
function Application() {
  var user = null;
  var user = useContext(UserContext);
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
    if(usertype === 'S'){
        return <AdminDashBoard />;
    }
    else{
        return <SignIn />;
    }
  }
//   return (
//         user ?
//         <reqPage />
//       :
//         <Router>
//           <SignIn path="/" />
//           <PasswordReset path = "passwordReset" />
//         </Router>

//   );
}
export default Application;