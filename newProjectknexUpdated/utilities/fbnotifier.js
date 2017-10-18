exports.notifier = function(deviceId, appkey,title,){
  var request = require('request');
 request({
       url:'https://fcm.googleapis.com/fcm/send', 
       method:'POST',
       headers:{
        'Authorization':'key= AAAAIxkchlo:APA91bFCQ9xPzraGC2tSySdPo7WED37UqCQPdBb3_P1s3b9kxVdKtg0PUw0iE67GSb80aZTIXWFKMLpBX1EVq_K8huqnHouQCkpqLzAVw3EIRSFdpTq0kDzIZBv2uX83rzDGiAyfafkN',
        'Content-Type':'application/json'
          },
       body:JSON.stringify(
           {
           'to':deviceId,
           'notification':{'title':'hello','body':'indent'}
         }
        )}, function(err, response, body) {
       if(err) { console.log(err); return; }
          console.log("Get response: " + response.statusCode);
          console.log(body);
      });



};