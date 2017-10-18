var app = angular.module('myApp1', []);
app.controller('myCtrl1', function($scope,$location,$http,$window) {
    $scope.data={}
   //initializing firebase.
   if(localStorage.getItem('username')){
     
                 $window.location.href ='/requestedmedicantodistributor';
   }
   else{
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
  $scope.submit = function() { 
                
   messaging.requestPermission().then(function(){
     return messaging.getToken();
   }).then(function(token){
     var data1= {token}
  $http({
            method: 'POST',
            url: '/distributor/login',
            data: $scope.data
        }).then(function(rest) {
        if(rest.data)
           {  
             localStorage.setItem('username',$scope.data.username);
              data1 = {tokenid:token , username:$scope.data.username};
              console.log(data1);
                $http({
                 method: 'POST',
                 url: '/distributor/deviceid',
                data: data1
           }).then(function(rest) {
               if(rest.data){
                 $window.location.href ='/requestedmedicantodistributor';}
            })
              }    
           });    
       }).catch(function(err){
           console.log('error occured');
           console.log(err);
         })
         messaging.onMessage(function(payload){
             console.log('onMessage',payload);
         })
}
   }
})