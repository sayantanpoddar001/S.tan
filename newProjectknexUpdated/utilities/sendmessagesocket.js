exports.sendmessage = function(socketid,next) {
 try{

    io.sockets.connected[socketid].emit('send message1',"tryal1");
    next(true);
 }
 catch(e)
 {console.log(e);}
}