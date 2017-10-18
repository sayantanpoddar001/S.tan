var socketIo = require('socket.io');
var controller = require('../Controllers/DBControllerknexjs');
var store = require('./socketstore');
var socketid=[];
exports.findactiveindentrequest= function(){

}
module.exports = {
    startService: function (server) {
       io = socketIo(server);
        io.on('connection', function (socket) {
             socketid= socket.id;
             console.log(socketid);
             console.log(socket.id);
        socket.on('receive message', function (userid) {
              //storing and updating socketid
         controller.storesocketidofdistributorDBController(userid,socket.id);
      //  io.sockets.emit('send message', userid);
            });
            socket.on('disconnect',function(){

            })
        });
        return io;
    }
};













































/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//function sendnotification(distributorid,storeid){
io.on('connection', function(socket){
        socket.on('chat message', function(msg){
    console.log('message: ' + msg);

     socket.on('disconnect', function(){
    console.log('user disconnected');
  });  });
});
//}



app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});*/
//exports.sendnotification = sendnotification;