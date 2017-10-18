
 importScripts("https://www.gstatic.com/firebasejs/4.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwoxlT8flU1cqm7-Plg5dtiw2f5xZqd3U",
    authDomain: "webapp-245b9.firebaseapp.com",
    databaseURL: "https://webapp-245b9.firebaseio.com",
    projectId: "webapp-245b9",
    storageBucket: "",
    messagingSenderId: "150745155162"
  };
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  