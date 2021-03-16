
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/firestore/bundle';
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyCbQ-WkzhmiA39IFbU8ehTzCqI57OFHINo",
    authDomain: "sms-app-69c13.firebaseapp.com",
    projectId: "sms-app-69c13",
    storageBucket: "sms-app-69c13.appspot.com",
    messagingSenderId: "889141937102",
    appId: "1:889141937102:web:18dcaf9b1b56552e1ce19f",
    measurementId: "G-7EZGE5Z385"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;