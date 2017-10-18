 var config = {
    apiKey: "AIzaSyBwoxlT8flU1cqm7-Plg5dtiw2f5xZqd3U",
    authDomain: "webapp-245b9.firebaseapp.com",
    databaseURL: "https://webapp-245b9.firebaseio.com",
    projectId: "webapp-245b9",
    storageBucket: "",
    messagingSenderId: "150745155162"
  };
  firebase.initializeApp(config);
  // Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
//const messaging = firebase.messaging(); 
messaging.requestPermission().then(function(){
     return messaging.getToken();
   }).then(function(token){
       console.log(token);
   }).catch(function(err){
           console.log('error occured');
           console.log(err);
         })
         messaging.onMessage(function(payload){
             //console.log('onMessage',payload);
           alert("you have new indent request.");
         })