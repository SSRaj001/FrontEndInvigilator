import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { UserContext } from "./providers/UserProvider";
import React, { useContext } from 'react';



//let userRef = db.collection("users").doc("users");

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const GetExamDetails = (exam) => {
  let examDetailsRef = db.collection('exams').doc(exam);
  return (examDetailsRef.get());
};

export const GetAllExamDetails = async () => {
  let examDetails = [];
  (await db.collection("exams").get()).forEach((doc) => {
    let details = doc.data()
    console.log(doc.data());
    examDetails.push(details)
  });
  return examDetails
}

export const GetRoomLocation = async(roomNo) => {
  let roomRef = (db.collection("rooms").doc(roomNo));
  return roomRef.get();
}

export const GetSubjects = async () =>{
  let subjectList = [];
  (await db.collection("subjects").get()).forEach((doc) => {
    let details = doc.id;
    console.log(details);
    subjectList.push(details);
  });
  return subjectList;
}

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

export const GetTeachers = async () =>{
  let teacherList = []
  (await db.collection("users").where("usertype","==",'T').get()).forEach((doc)=>{
      let details = doc.data()
      console.log(details)
      teacherList.push(details)
    });
  return teacherList;
}
//const userRef = firestore.doc(`users/${user.uid}`);
//const snapshot = await userRef.get();
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