// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAgEuXgOYwmHK_RqpVzMIJDRLD5ZB7UbbQ",
//   authDomain: "rps-multi-7fedd.firebaseapp.com",
//   databaseURL: "https://rps-multi-7fedd.firebaseio.com",
//   storageBucket: "rps-multi-7fedd.appspot.com"
// };

// firebase.initializeApp(config);

// var database = firebase.database();
// var chatData = database.ref("/chat");
// var playersRef = database.ref("players");
// var currentTurnRef = database.ref("turn");
// var username = "Guest";
// var currentPlayers = null;
// var currentTurn = null;
// var playerNum = false;
// var playerOneExists = false;
// var playerTwoExists = false;
// var playerOneData = null;
// var playerTwoData = null;


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnD00DCXAEUzyEJQVNwA7yI7G5OUstYHs",
    authDomain: "chat-test-56e7c.firebaseapp.com",
    databaseURL: "https://chat-test-56e7c.firebaseio.com",
    projectId: "chat-test-56e7c",
    storageBucket: "",
    messagingSenderId: "1003382859041"
};
firebase.initializeApp(config);

// USERNAME LISTENERS
// Start button - takes username and tries to get user in game
$("#start").click(function() {
  if ($("#username").val() !== "") {
    username = capitalize($("#username").val());
    getInGame();
  }
});

// listener for 'enter' in username input
$("#username").keypress(function(e) {
  if (e.keyCode === 13 && $("#username").val() !== "") {
    username = capitalize($("#username").val());
    getInGame();
  }
});
// CHAT LISTENERS
// Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
$("#chat-send").click(function() {

    if ($("#chat-input").val() !== "") {

        var message = $("#chat-input").val();

        chatData.push({
            name: username,
            message: message,
            time: firebase.database.ServerValue.TIMESTAMP,
            idNum: playerNum
        });

        $("#chat-input").val("");
    }
});

// Chatbox input listener

$("#chat-input").keypress(function(e) {

    if (e.keyCode === 13 && $("#chat-input").val() !== "") {

        var message = $("#chat-input").val();

        chatData.push({
            name: username,
            message: message,
            time: firebase.database.ServerValue.TIMESTAMP,
            idNum: playerNum
        });

        $("#chat-input").val("");
    }
});


// Update chat on screen when new message detected - ordered by 'time' value
chatData.orderByChild("time").on("child_added", function(snapshot) {

    // If idNum is 0, then its a disconnect message and displays accordingly
    // If not - its a user chat message
    if (snapshot.val().idNum === 0) {
        $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>" +
            snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
    } else {
        $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>" +
            snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
    }

    // Keeps div scrolled to bottom on each update.
    $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
});