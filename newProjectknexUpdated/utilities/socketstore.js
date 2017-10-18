var controller = require('../Controllers/DBControllerknexjs');
var insertSObj = require('../Database/setserverDAO');
var sendnotification = require('./socketio');
var z;
function getdistributorid(req,res){
    console.log(req);
   insertSObj.getcurrentdistributorsocketid(req,function(err,result){
   //   console.log(result.socketid);
    //    result = result.socketid;
    //  io.result.in('sonu19kr@gmail.com').emit('new_msg', {msg: 'hello'});
        console.log('check');
     // console.log(io.sockets.connected[result])
             //  io.sockets.connected[result].emit('new_msg', 'you have a new request.');
 });
}
exports.getdistributorid = getdistributorid;
function sendtest(socket){
   console.log(socket.id);
   z=socket;
}  
exports.sendtest = sendtest;
