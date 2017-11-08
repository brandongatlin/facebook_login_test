var a = 1
var b = 2

console.log(a+b); //3 = true

console.log("firebase_chat_app.js loaded");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnD00DCXAEUzyEJQVNwA7yI7G5OUstYHs",
    authDomain: "chat-test-56e7c.firebaseapp.com",
    databaseURL: "https://chat-test-56e7c.firebaseio.com",
    projectId: "chat-test-56e7c",
    storageBucket: "chat-test-56e7c.appspot.com",
    messagingSenderId: "1003382859041"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var loginData = database.ref("/logins");

var provider = new firebase.auth.FacebookAuthProvider();


