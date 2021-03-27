import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//const db = firebase.firestore();

//var userRef = db.collection("users").doc("users");

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
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

const firebaseConfig = {
  apiKey: "AIzaSyCZIqOiRukBHhhX9fM7mvFoD8wdLjxxIVU",
  authDomain: "invigilator-82e71.firebaseapp.com",
  projectId: "invigilator-82e71",
  storageBucket: "invigilator-82e71.appspot.com",
  messagingSenderId: "492381439153",
  appId: "1:492381439153:web:11142a78601b195dc4ce90",
  measurementId: "G-Q94DPT1TMW"
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();