import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCVY0-O6G5-nsCY1WLoSByUprI3ItriRT4",
  authDomain: "bidwithreact.firebaseapp.com",
  projectId: "bidwithreact",
  storageBucket: "bidwithreact.appspot.com",
  messagingSenderId: "259842144494",
  appId: "1:259842144494:web:e9b49a96b80fc5101f5bff"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()