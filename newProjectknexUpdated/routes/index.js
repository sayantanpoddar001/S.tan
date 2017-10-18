var express = require('express');
var router = express.Router();
var html = require('html');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var controller = require('../Controllers/DBControllerknexjs');
/* GET home page. */

var path = require('path');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/firebase-messaging-sw.js', function(req, res, next) {
  res.sendFile('/firebase-messaging-sw.js',{root:path.join(__dirname,'../webapplication')});
});
//router.use(express.static(path.join(__dirname, '../public')));
router.get('/distributorportal',function(req,res,next){
  res.sendFile('/distributorportal.html',{root:path.join(__dirname,'../webapplication')});
})

router.get('/distributorcreater',function(req,res,next){
  res.sendFile('/distributorcreater.html',{root:path.join(__dirname,'../webapplication')});
})
router.get('/storecreater',function(req,res,next){
  res.sendFile('/storecreater.html',{root:path.join(__dirname,'../webapplication')});
})

router.get('/requestedmedicantodistributor',function(req,res,next){
 // var data= req.params.id;
 // console.log(data);
  res.sendFile('/indentdatatodistributor.html',{root:path.join(__dirname,'../webapplication')});
})
router.post('/callforindentlist',function(req,res){
  var distname = req.body.username;
  controller.senddataofindntlisttodistributorDBController(distname,res);
})
router.post('/distributor/login',function(req,res){
  controller.checkAuthticationDBCfordistributor(req,res);
})
router.post('/distributor/deviceid',function(req,res){
  controller.storedeviceidofdistributorDBController(req,res);
})
router.post('/storecreateprocessed',function(req,res){
   var data = req.body;
   controller.newstoreCreatorDBController(data,res);
  // res.send(true);
})
router.post('/addnewdistributor',function(req,res){
  controller.newdistributorcreaterDBController(req,res);
})

//first login
router.post('/requestlogin',function(req,res){
   if(typeof req.body != undefined || req.body != null){
    controller.checkAuthnDBcontroller(req,res); } 
    else
    res.send(false);
});
//change password
router.post('/requestforchangepassword',function(req,res){
  controller.changepasswordDBController(req,res);
});
//store data
router.post('/senddatatostoreofstoremaster',function(req,res){
  controller.senddataBacktostoreownerDBController(req,res);
});
//indent list to central database
router.post('/requesttodistributor',function(req,res){

  /*var data = req.body;
  for(var item in data){
    console.log(item);
    var data1 = data[item];
    for(var item1 in data1){
      console.log(data1[item1].quantity);
    }
    console.log('firasds fjcfvfdjk');
  }
*/
  controller.storedataofindentDBController(req,res);
  res.send(true);

})
//dummy request
router.post('/dummyrequest',function(req,res){
  res.send('123sdfghjh');
})
module.exports = router;
