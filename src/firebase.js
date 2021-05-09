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

export async function GetAllExamDetails(){
  const examList = [];
  (await db.collection("exams").get()).forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    examList.push(doc.data())
    });
    return examList
}

export const GetExamDetails = (exam) => {
  let examDetailsRef = db.collection('exams').doc(exam);
  return (examDetailsRef.get())
};

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