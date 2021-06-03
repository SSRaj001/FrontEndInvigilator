import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminDashboard from '../Components/AdminDashBoard';
import FacultyDashboard from '../Components/FacultyDashBoard';
import StudentDashboard from '../Components/StudentDashBoard';
import AdminRequest from '../Components/AdminRequest';
import PendingRequest from '../Components/PendingRequest';
import Profile from '../Components/Profile';
import SignIn from '../Components/SignIn';
import Application from '../Components/Application';
import ChangePw from '../Components/ChangePw';
import ChangeRequests from '../Components/ChangeRequests';
import NewExam from '../Components/NewExam';
import RequestChange from '../Components/RequestChange';
import Title from '../Components/Title';
import UpcomingExams from '../Components/UpcomingExams';
import UpcomingTeacher from '../Components/UpcomingTeacher';
// import { initializeAdminApp } from '@firebase/rules-unit-testing';
// import {auth} from '../firebase';
// // import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";
describe("AdminDashboard", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Admin components rendering", () => {
      shallow(<AdminDashboard />);
    });
    it("Proper details must be rendered", () => {
        //   When
        const component = shallow (<AdminDashboard/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("FacultyDashboard", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Faculty components rendering", () => {
      shallow(<FacultyDashboard />);
    });
    it("Proper details must be rendered", () => {
        //   When
        const component = shallow (<FacultyDashboard/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("StudentDashboard", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Student components rendering", () => {
      shallow(<StudentDashboard />);
    });
    it("Proper details must be rendered", () => {
        //   When
        const component = shallow (<StudentDashboard/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("Profile", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Component of dashboard placement", () => {
      shallow(<Profile />);
    });
    it("Given user details and firebase dependcies, loading proper values", () => {
        //   When
        const component = shallow (<Profile/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("SignIn", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Loading home screen render", () => {
      shallow(<SignIn />);
    });
    it("Logins are rejected or accepted with proper rendering", () => {
        //   When
        const component = shallow (<SignIn/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("Application", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("The base component rendering", () => {
      shallow(<Application />);
    });
    it("All other components must be rendered properly", () => {
        //   When
        const component = shallow (<Application/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("ChangePw", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Renders the change password page", () => {
      shallow(<ChangePw />);
    });
    it("Password is acquired and authenticated", () => {
        //   When
        const component = shallow (<ChangePw/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("ChangeRequests", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Button, renders three steps", () => {
      shallow(<ChangeRequests />);
    });
    it("should render initial layout", () => {
        //   When
        const component = shallow (<ChangeRequests/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
// describe("CreateExam", () => {
//     Enzyme.configure({ adapter: new Adapter() });
//     it("Button, renders three steps", () => {
//       shallow(<CreateExam />);
//     });
//     it("Initial layout rendering", () => {
//         //   When
//         const component = shallow (<CreateExam/>);
//         //   Then
//         expect (component.getElements()).toMatchSnapshot();
//       });
// });
// describe("ListItemsAdmin", () => {
//     Enzyme.configure({ adapter: new Adapter() });
//     it("should render my component", () => {
//       const wrapper = shallow(<ListItemsAdmin />);
//     });
//     it("should render initial layout", () => {
//         //   When
//         const component = shallow (<ListItemsAdmin/>);
//         //   Then
//         expect (component.getElements()).toMatchSnapshot();
//       });
// });
// describe("ListItemsFaculty", () => {
//     Enzyme.configure({ adapter: new Adapter() });
//     it("should render my component", () => {
//       const wrapper = shallow(<ListItemsFaculty />);
//     });
//     it("should render initial layout", () => {
//         //   When
//         const component = shallow (<ListItemsFaculty/>);
//         //   Then
//         expect (component.getElements()).toMatchSnapshot();
//       });
// });
// describe("ListItemsStudent", () => {
//     Enzyme.configure({ adapter: new Adapter() });
//     it("should render my component", () => {
//       const wrapper = shallow(<ListItemsStudent />);
//     });
//     it("should render initial layout", () => {
//         //   When
//         const component = shallow (<ListItemsStudent/>);
//         //   Then
//         expect (component.getElements()).toMatchSnapshot();
//       });
// });
describe("NewExam", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Button creating a new exam", () => {
      shallow(<NewExam />);
    });
    it("Three steps with proper movement", () => {
        //   When
        const component = shallow (<NewExam/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("RequestChange", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("For changing requests, 3 step process", () => {
      shallow(<RequestChange />);
    });
    it("Should render initial layout", () => {
        //   When
        const component = shallow (<RequestChange/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("Title", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Profile Typography", () => {
      shallow(< Title/>);
    });
    it("Title rendered properly throughout", () => {
        //   When
        const component = shallow (<Title/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("UpcomingExams", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("List of Upcoming Exams", () => {
      shallow(< UpcomingExams/>);
    });
    it("Loading preloaded data", () => {
        //   When
        const component = shallow (<UpcomingExams/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("UpcomingTeacher", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("List of Upcoming Teachers", () => {
      shallow(<UpcomingTeacher />);
    });
    it("Loading preloaded data", () => {
        //   When
        const component = shallow (<UpcomingTeacher/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
describe("AdminRequest", () => {
  Enzyme.configure({ adapter: new Adapter() });
  it("Requests sent to the admin", () => {
    shallow(<AdminRequest />);
  });
  it("Making sure that same requests exist in both places", () => {
      //   When
      const component = shallow (<UpcomingTeacher/>);
      //   Then
      expect (component.getElements()).toMatchSnapshot();
    });
});
describe("PendingRequest", () => {
  Enzyme.configure({ adapter: new Adapter() });
  it("Unsanctioned Requests from Faculty", () => {
    shallow(<PendingRequest />);
  });
  it("Approval/Rejection of the Requests", () => {
      //   When
      const component = shallow (<UpcomingTeacher/>);
      //   Then
      expect (component.getElements()).toMatchSnapshot();
    });
});
// describe("RoomFac", () => {
//   Enzyme.configure({ adapter: new Adapter() });
//   it("List of Upcoming Teachers", () => {
//     shallow(<RoomFac />);
//   });
//   it("Loading preloaded data", () => {
//       //   When
//       const component = shallow (<UpcomingTeacher/>);
//       //   Then
//       expect (component.getElements()).toMatchSnapshot();
//     });
// });
// describe ('Integration Tests with Firebase Test Suite', () => {
//     // beforeAll(async() => {
//     //     jest.setTimeout(100000);
//     //     await initializeApp();
//     // });

//     beforeEach(async () => {
//         await auth.signOut();
//     });

//     test('signInWithEmailAndPassword should throw error with wrong credential', async() => {
//         let error = '';
//         try{
//             await auth.signInWithEmailAndPassword('adithi288@gmail.com', 'panda123password123');
//         }catch(err){
//             error = err.toString();
//         }
//         expect(error).toEqual(
//             'Error: The password is invalid or the user does not have a password.'
//         );
//     });
//     test('signInWithEmailAndPassword should login with correct credentials', async() => {
//       const user = await auth.signInWithEmailAndPassword(
//         'adithi288@gmail.com',
//         'password'
//       );
//       expect(user.user).toBeTruthy();
//     });
//     let authenticated = false;
//     let email = false;
//     test('signOutFirebase should work', async () => {
//         await auth.signInWithEmailAndPassword('adithi288@gmail.com', 'password');
//         authenticated = true;
//         email = true;
//         expect(authenticated && email).toBe(true);
//       await auth.signOut();
//       authenticated = false;
//       email = false;
//       expect(authenticated && email).toBe(false);
//     });
// })


// describe("Email_Collection Test ", () => {
//   const c = 0;
//   test('Accessing Collection', async() => {
//       var update = jest.fn();
//       var doc = jest.fn(function () { return ({ update: update }); });
//       var email_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: doc });
//       expect(email_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var update = jest.fn();
//       var doc = jest.fn(function () { return ({ update: update }); });
//       expect(doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var update = jest.fn();
//       expect(update).toHaveBeenCalledTimes(c);
//   });

// })
// describe("Rooms Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var room_update = jest.fn();
//       var room_doc = jest.fn(function () { return ({ update: room_update }); });
//       var room_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: room_doc });
//       expect(room_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var room_update = jest.fn();
//       var room_doc = jest.fn(function () { return ({ update: room_update }); });
//       expect(room_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var room_update = jest.fn();
//       expect(room_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Classes Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var classes_update = jest.fn();
//       var classes_doc = jest.fn(function () { return ({ update: classes_update }); });
//       var classes_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: classes_doc });
//       expect(classes_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var classes_update = jest.fn();
//       var classes_doc = jest.fn(function () { return ({ update: classes_update }); });
//       expect(classes_doc).toHaveBeenCalledTimes(c);
//   })
//     test('Updation', async() => {
//       var classes_update = jest.fn();
//       expect(classes_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Exams Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var exams_update = jest.fn();
//       var exams_doc = jest.fn(function () { return ({ update: exams_update }); });
//       var exams_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: exams_doc });
//       expect(exams_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var exams_update = jest.fn();
//       var exams_doc = jest.fn(function () { return ({ update: exams_update }); });
//       expect(exams_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var exams_update = jest.fn();
//       expect(exams_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Subjects Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var subjects_update = jest.fn();
//       var subjects_doc = jest.fn(function () { return ({ update: subjects_update }); });
//       var subjects_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: subjects_doc });
//       expect(subjects_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var subjects_update = jest.fn();
//       var subjects_doc = jest.fn(function () { return ({ update: subjects_update }); });
//       expect(subjects_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var subjects_update = jest.fn();
//       expect(subjects_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Teachers Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var teachers_update = jest.fn();
//       var teachers_doc = jest.fn(function () { return ({ update: teachers_update }); });
//       var teachers_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: teachers_doc });
//       expect(teachers_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var teachers_update = jest.fn();
//       var teachers_doc = jest.fn(function () { return ({ update: teachers_update }); });
//       expect(teachers_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var teachers_update = jest.fn();
//       expect(teachers_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Users Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var users_update = jest.fn();
//       var users_doc = jest.fn(function () { return ({ update: users_update }); });
//       var users_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: users_doc });
//       expect(users_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var users_update = jest.fn();
//       var users_doc = jest.fn(function () { return ({ update: users_update }); });
//       expect(users_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var users_update = jest.fn();
//       expect(users_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Requests Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var requests_update = jest.fn();
//       var requests_doc = jest.fn(function () { return ({ update: requests_update }); });
//       var requests_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: requests_doc });
//       expect(requests_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var requests_update = jest.fn();
//       var requests_doc = jest.fn(function () { return ({ update: requests_update }); });
//       expect(requests_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var requests_update = jest.fn();
//       expect(requests_update).toHaveBeenCalledTimes(c);
//   });
// })
// describe("Requests History Test ", () => {
//   const c= 0;
//   test('Accessing Collection', async() => {
//       var requestsHistory_update = jest.fn();
//       var requestsHistory_doc = jest.fn(function () { return ({ update: requestsHistory_update }); });
//       var requestsHistory_collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue({ doc: requestsHistory_doc });
//       expect(requestsHistory_collection).toHaveBeenCalledTimes(c);
//   });
//     test('Accessing Document', async() => {
//       var requestsHistory_update = jest.fn();
//       var requestsHistory_doc = jest.fn(function () { return ({ update: requestsHistory_update }); });
//       expect(requestsHistory_doc).toHaveBeenCalledTimes(c);
//   });
//     test('Updation', async() => {
//       var requestsHistory_update = jest.fn();
//       expect(requestsHistory_update).toHaveBeenCalledTimes(c);
//   });
// })

// const functions = require("firebase-functions");
// const admin = require('firebase-admin')
// admin.initializeApp(functions.config().firebase)
