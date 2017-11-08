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
var chatData = database.ref("/chat");
var username = "Guest";


// name-submit on click.
$('#name-submit').on("click", function(event){
  event.preventDefault();
  
  username = $("#name-input").val().trim();

  console.log("username:", username);
  
  $('#name-form').hide(); // hide name form
  $('#message-form').css("display", "initial");// shows message form
 
});


//message-sumbit on click 
$('#message-submit').on("click", function(event){
  
  event.preventDefault();
  var message = $("#message-input").val().trim(); 
  
  $("#message-input").val('');// clears out message input box

  // this creates an object with our data to push up to firebase
  var messageObj = {
    name: username,
    message: message,
    time: firebase.database.ServerValue.TIMESTAMP
  };

  console.log(messageObj);

  chatData.push(messageObj);

});


// Update chat on screen when new message detected - ordered by 'time' value
chatData.orderByChild("time").on("child_added", function(snapshot) {

  $("#chat-box").append("<p>" + snapshot.val().name + "> " + snapshot.val().message + "</p>"); 

  // Keeps div scrolled to bottom on each update.
  $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);

});
