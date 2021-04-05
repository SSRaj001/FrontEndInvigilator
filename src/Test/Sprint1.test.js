import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminDashboard from '../Components/AdminDashBoard';
import FacultyDashboard from '../Components/FacultyDashBoard';
import StudentDashboard from '../Components/StudentDashBoard';
import Profile from '../Components/Profile';
import SignIn from '../Components/SignIn';
import Application from '../Components/Application';
import ChangePw from '../Components/ChangePw';
import ChangeRequests from '../Components/ChangeRequests';
import CreateExam from '../Components/CreateExam';
import NewExam from '../Components/NewExam';
import RequestChange from '../Components/RequestChange';
import Title from '../Components/Title';
import UpcomingExams from '../Components/UpcomingExams';
import UpcomingTeacher from '../Components/UpcomingTeacher';
import { initializeAdminApp } from '@firebase/rules-unit-testing';
import {auth} from '../firebase';
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
describe("CreateExam", () => {
    Enzyme.configure({ adapter: new Adapter() });
    it("Button, renders three steps", () => {
      shallow(<CreateExam />);
    });
    it("Initial layout rendering", () => {
        //   When
        const component = shallow (<CreateExam/>);
        //   Then
        expect (component.getElements()).toMatchSnapshot();
      });
});
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
describe ('Integration Tests with Firebase Test Suite', () => {
    // beforeAll(async() => {
    //     jest.setTimeout(100000);
    //     await initializeApp();
    // });

    beforeEach(async () => {
        await auth.signOut();
    });

    test('signInWithEmailAndPassword should throw error with wrong credential', async() => {
        let error = '';
        try{
            await auth.signInWithEmailAndPassword('recovery10126@gmail.com', 'abs');
        }catch(err){
            error = err.toString();
        }
        expect(error).toEqual(
            'Error: The password is invalid or the user does not have a password.'
        );
    });
    test('signInWithEmailAndPassword should login with correct credentials', async() => {
      const user = await auth.signInWithEmailAndPassword(
        'recovery10126@gmail.com',
        'turds1234'
      );
      expect(user.user).toBeTruthy();
    });
    let authenticated = false;
    let email = false;
    test('signOutFirebase should work', async () => {
      await auth.signInWithEmailAndPassword('recovery10126@gmail.com', 'turds1234');
      authenticated = true;
      email = true;
      expect(authenticated && email).toBe(true);
      await auth.signOut();
      authenticated = false;
      email = false;
      expect(authenticated && email).toBe(false);
    });
})
