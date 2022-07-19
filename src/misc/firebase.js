import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'


const config = {
    apiKey: "AIzaSyAks8PhcYGeq8sJaRkTYDaoOOAQdrrZLyU",
    authDomain: "chat-web-app-7d2e7.firebaseapp.com",
    databaseURL: "https://chat-web-app-7d2e7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-web-app-7d2e7",
    storageBucket: "chat-web-app-7d2e7.appspot.com",
    messagingSenderId: "909783094582",
    appId: "1:909783094582:web:90cb8c1642721308ae8f97"
  };

  const app = firebase.initializeApp(config);
  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();