import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAzXwHPuCaS1Ni8yaKlqBdKD6jWQWf55Aw",
    authDomain: "chatproject-18fc3.firebaseapp.com",
    projectId: "chatproject-18fc3",
    storageBucket: "chatproject-18fc3.appspot.com",
    messagingSenderId: "749384725971",
    appId: "1:749384725971:web:796ebb36b86d8446b56b26",
  })
  .auth();
