import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const provider = new firebase.auth.GoogleAuthProvider();
let todayDate = new Date();

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
    let details = doc.data();
    details.id = doc.id;
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
      console.log(details);
      details.id = doc.id;
      examListStudent.push(details);
    });
  return examListStudent;
}

//Given teacherID get teacherMail
export const ExtractTeacherEmail = async(teacherID) => {
  let userRef = db.collection("users").doc(teacherID);
  return userRef.get();
}

//return emails
export const ExtractEmails = async(section) =>{
  let classRef = db.collection("classes").doc(section);
  return classRef.get();
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

//Returns list of all teachers from users collection
export const GetTeachers = async () =>{
  let teacherList = [];
  (await db.collection("users").where("usertype","==",'T').get()).forEach((doc)=>{
      let details = doc.data();
      console.log(details);
      teacherList.push(details);
    });
  return teacherList;
}

export const GetStudents = async () =>{
  let studentList = [];
  (await db.collection("users").where("usertype","==",'S').get()).forEach((doc)=>{
      let details = doc.data();
      details.id = doc.id;
      studentList.push(details);
    });
  return studentList;
}

//Returns Teachers Name, timetable and id
export const GetTeachersDetails = async (date) => {
  let teacherList = [];
  (await db.collection("teachers").get()).forEach((doc)=>{
    let details = doc.data();
    let dateArray = details.dateSlot
    if(!dateArray.includes(date)){
      details.tid = doc.id;
      teacherList.push(details);
    }
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
};

//returns all classNames
export const GetAllClasses = async() => {
  let classList = [];
  (await db.collection("classes").get()).forEach((doc)=>{
    let details = doc.id;
    classList.push(details);
  });
  return classList;
}

//given subject get code
export const GetSubjectCode = async(subject) => {
  console.log(subject)
  let subjectRef = db.collection("subjects").doc(subject);
  return subjectRef.get();
}

//teacher timetable
export const GetTeacherInfo = async(teacherID) => {
  let teacherRef = db.collection("teachers").doc(teacherID);
  return teacherRef.get();
}

export const GetUserInfo = async(userID) => {
  let userRef = db.collection("users").doc(userID);
  return userRef.get();
}

//adding dateslot details to rooms collections
export const AddRommInfo = async(roomNo,dateSlot,examID) => {
  db.collection("rooms").doc(roomNo).set({
      upcomingSlots : {
        [`${dateSlot}`] : examID,
      }
    },{merge:true})
}

//adding date slot to teachers collection
export const UpdateTeacherDateSlot = async(teacherID,date) => {
  db.collection("teachers").doc(teacherID).update({
    dateSlot : firebase.firestore.FieldValue.arrayUnion(date),
  })
}

//custom firestore auto-ID function
export const firestoreAutoId = () => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(
      Math.floor(Math.random() * CHARS.length)
    )
  }
  return autoId
}

//Adding the exam id to teacher in user collection
export const AddExamDetailToUserCollection = (teacherID, examID) =>{
  db.collection("users").doc(teacherID).update({
    exams : firebase.firestore.FieldValue.arrayUnion(examID),
  })
}

/////////////////////****************Requests ****////////////////////////////////////////////
export const CheckRequests = async(teacherID) => {
  let requestList = [];
  (await db.collection("requests").where("to","==",teacherID).get()).forEach((doc) => {
    let details = doc.data();
    details.requestID = doc.id;
    let dateSlot = details.dateSlot;
    let [d,m,y] = dateSlot.split("/");// 2012-2
    let examDate = new Date(parseInt(y),parseInt(m)-1,parseInt(d));
    y = y.split("-")[0]
    if(examDate >= todayDate){
      requestList.push(details);
    }
  });
  console.log(requestList);
  return requestList;
}

export const RequestChangeExam = async(fromTeacherID, requestedExamSlot, requestedTeacherID, examID) => {
  let freeDateSlotTeacher = await GetTeacherInfo(requestedTeacherID);
  let autoID = firestoreAutoId();
  if(!freeDateSlotTeacher.data().dateSlot.includes(requestedExamSlot)){
    var requestRef = db.collection("requests").doc(autoID);
    requestRef.set({
      from : fromTeacherID,
      to : requestedTeacherID,
      dateSlot : requestedExamSlot,
      exam : examID
    });
    return {type : 0};
  }
  else{
    let teachers = [];
    let slot = parseInt(requestedExamSlot.charAt(requestedExamSlot.length-1));
    teachers = await GetTeachersDetails(requestedExamSlot);
    let teachersAvailable = []
    for(let i=0;i<teachers.length;i++){
      if(teachers[i].timeTable[slot-1] === 0){
        teachersAvailable.push(teachers[i].tid)
      }
    }
    if(teachersAvailable.length === 0){
      return {type:1};
    }
    else{
      var requestRefe = db.collection("requests").doc(autoID);
      let randTeacherID = teachersAvailable[produceRandom(0,teachersAvailable.length-1)];
      requestRefe.set({
        from : fromTeacherID,
        to : randTeacherID,
        dateSlot : requestedExamSlot,
        exam : examID
      });
      return {
        type:2, val: randTeacherID
      }
    }
  }
}

export const GetRequestDetails = async(requestID) => {
  let reqRef = db.collection("requests").doc(requestID);
  return reqRef.get();
}

export const DeleteAcceptedRequest = async(requestID) => {
  let reqPromise = await GetRequestDetails(requestID);
  let reqDetails = reqPromise.data();
  db.collection("requestsHistory").doc(requestID).set({
    to : reqDetails.to,
    from : reqDetails.from,
    dateSlot : reqDetails.dateSlot,
    exam : reqDetails.exam,
  })
  db.collection("requests").doc(requestID).delete();
}

export const ChangeFacultyForExam = async(examID, teacherToID) => {
  let examRef = db.collection("exams").doc(examID);
  examRef.update({
    faculty : teacherToID,
  })
}

export const RemoveAndAddExamToFacultyUsers = async(examID, teacherTo, teacherFrom) => {
  let userRef = db.collection("users").doc(teacherFrom);
  userRef.update({
    exams : firebase.firestore.FieldValue.arrayRemove(examID),
  })
  userRef = db.collection("users").doc(teacherTo);
  userRef.update({
    exams : firebase.firestore.FieldValue.arrayUnion(examID),
  })
}

export const UpdateInTeachersCollections = async(dateSlot, teacherTo, teacherFrom) => {
  let userRef = db.collection("teachers").doc(teacherFrom);
  userRef.update({
    dateSlot : firebase.firestore.FieldValue.arrayRemove(dateSlot),
  })
  userRef = db.collection("teachers").doc(teacherTo);
  userRef.update({
    dateSlot : firebase.firestore.FieldValue.arrayUnion(dateSlot),
  })
}

export const AcceptOrDenyRequest = async(request, requestID) => {
  if(request === 1){
    let details = await GetRequestDetails(requestID);
    console.log(details);
    DeleteAcceptedRequest(requestID);
    ChangeFacultyForExam(details.data().exam, details.data().to);
    RemoveAndAddExamToFacultyUsers(details.data().exam, details.data().to, details.data().from);
    UpdateInTeachersCollections(details.data().dateSlot, details.data().to,  details.data().from);
    return {type:1,val:"Accepted"}
  }
  return {type:2,val:"denied"}
}

//////////////////////************************ *//////////////////////////////////////

//Adding the exam to appropriate collections
export const AddExam = async(classList,date,subject) => {
  let autoID = firestoreAutoId();
  var examRef = db.collection("exams").doc(autoID);
  let teacherRoom = await GetFreeTeacher(date);
  if(teacherRoom.type === 3){
    console.log(teacherRoom.val);
    let sc = await GetSubjectCode(subject);
    let subjectCode = sc.data().code;
    console.log(subjectCode);
    let teacherPromise = await GetTeacherInfo(teacherRoom.val[0]);
    let timeTable = teacherPromise.data().timeTable;
    let teacherName = teacherPromise.data().name;
    console.log(timeTable);

    //adding the data to exam
    examRef.set({
      classes : classList,
      dateSlot : date,
      faculty : teacherRoom.val[0],
      room : teacherRoom.val[1],
      course : {code : subjectCode, name : subject}
    });

    //updating teachers table and room allocation
    UpdateTeacherDateSlot(teacherRoom.val[0],date)
    AddRommInfo(teacherRoom.val[1],date,autoID)
    AddExamDetailToUserCollection(teacherRoom.val[0],autoID);
    return {type :  teacherRoom.type, val: [ teacherName, teacherRoom.val[1], teacherRoom.val[0] ], classes: classList}
  }
  else{
    return {type : teacherRoom.type};
  }
}

////////////////////////***Algorithm***/////////////////////////////////

//to produce random numbers.
function produceRandom(min,max){
  let y = Math.floor(Math.random() * (max - min + 1)) + min;
  return y;
}

//Returns available teacher and rooms as array
export const GetFreeTeacher = async (dateSlot) => {
  let teachers = [];
  let slot = parseInt(dateSlot.charAt(dateSlot.length-1));
  teachers = await GetTeachersDetails(dateSlot);
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