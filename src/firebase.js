import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { CodeSharp } from "@material-ui/icons";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

//Give an exam ID and it returns its details
export const GetExamDetails = (exam) => {
  let examDetailsRef = db.collection('exams').doc(exam);
  return (examDetailsRef.get());
};

//Returns all exam details
export const GetAllExamDetails = async () => {
  let examDetails = [];
  (await db.collection("exams").get()).forEach((doc) => {
    let details = doc.data()
    details.id = doc.id;
    console.log(doc.data());
    examDetails.push(details)
  });
  return examDetails
}

//Returns the roomLocation for a particular room
export const GetRoomLocation = async(roomNo) => {
  let roomRef = (db.collection("rooms").doc(roomNo));
  return roomRef.get();
}

//Returns all the subject Names
export const GetSubjects = async () =>{
  let subjectList = [];
  (await db.collection("subjects").get()).forEach((doc) => {
    let details = doc.id;
    //console.log(details);
    subjectList.push(details);
  });
  return subjectList;
}

//Returns all the exams based on a given section
export const GetClassRelatedExams = async (section) => {
  let examListStudent = [];
  (await db.collection("exams").where("classes","array-contains",section).get()).forEach((doc)=>{
      let details = doc.data()
      console.log(details)
      details.id = doc.id;
      examListStudent.push(details)
    });
  return examListStudent;
}

//Returns list of all teachers from users collection
export const GetTeachers = async () =>{
  let teacherList = [];
  (await db.collection("users").where("usertype","==",'T').get()).forEach((doc)=>{
      let details = doc.data()
      console.log(details)
      teacherList.push(details)
    });
  return teacherList;
}

//Returns Teachers Name, timetable and id
export const GetTeachersTimetable = async () => {
  let teacherList = [];
  (await db.collection("teachers").get()).forEach((doc)=>{
    let details = doc.data();
    details.tid = doc.id;
    //console.log(details)
    teacherList.push(details);
  });
  return teacherList;
}

//Returns all rooms
export const GetAllRooms = async () => {
  let rooms = [];
  (await db.collection("rooms").get()).forEach((doc) =>{
    let details = doc.data();
    details.roomNo = doc.id;
    rooms.push(details);
  });
  return rooms;
}

//Given teacher ID returns teacher name
export const GetTeacherName = async(teacherID) => {
  let teacherRef = db.collection("users").doc(teacherID);
  return teacherRef.get();
}

//Returns true if room if the room is available at a particular dateSlot
export const CheckRoomAvailability = async(roomNo,dateSlot) => {
  let docRef = await db.collection("rooms").doc(roomNo).get();
  let slotmap = (docRef.data().upcomingSlots);
  let slots = Object.keys(slotmap);
  return (slots.includes(dateSlot));
}

////////////////////////***Algorithm***/////////////////////////////////

//to produce random numbers.
function produceRandom(min,max){
  let y = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(y,max);
  return y;
}

//Returns available teacher and rooms as array
export const GetFreeTeacher = async (dateSlot) => {
  let teachers = [];
  let slot = parseInt(dateSlot.charAt(dateSlot.length-1));
  teachers = await GetTeachersTimetable();
  let teachersAvailable = []
  for(let i=0;i<teachers.length;i++){
    if(teachers[i].timeTable[slot-1] === 0){
      teachersAvailable.push(teachers[i].tid)
    }
  }

  let roomDetails = await GetAllRooms();
  let roomsAvailable = [];
  for(let i=0;i<roomDetails.length;i++){
    let slotmap = roomDetails[i].upcomingSlots;
    let slots = Object.keys(slotmap)
    if(!slots.includes(dateSlot)){
      roomsAvailable.push(roomDetails[i].roomNo);
    }
  }

  if(teachersAvailable.length === 0){
    return {type:1};
  }
  else if(roomsAvailable.length === 0){
    return {type:2};
  }
  else{
    return {
      type:3, val:[ teachersAvailable[produceRandom(0,teachersAvailable.length-1)], roomsAvailable[produceRandom(0,roomsAvailable.length-1)] ]
    }
  }
}

///////////////////////****************/////////////////////////////////


export const generateUserDocument = async (user, displayName, userType) => {
    console.log(userType+displayName+"signup");
    if (!user) return;
    let userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email } = user;
      //const {displayName} = additionalData;
      try {
        await userRef.set({
          displayName:displayName, 
          email:email,
          usertype:userType,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid,userType);
};
const getUserDocument = async (uid,userType) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

export var db = firebase.firestore();
const storage = firebase.storage();
export{storage, firebase as default};

export const auth = firebase.auth();
export const firestore = firebase.firestore();