var dbhandler = require('../DBhandlers/DBHandlerknexjs');

/*function createDBcontrollerforlocaldevice(req,res){
    dbhandler.createDBhandleronlocaledevicestore(req.res);
}
exports.createDBcontrollerforlocaldevice = createDBcontrollerforlocaldevice;
*/

function checkAuthnDBcontroller(req,res){
    dbhandler.checkAuthnDBHandlers(req,res);
}
exports.checkAuthnDBcontroller = checkAuthnDBcontroller;
function changepasswordDBController(req,res){
    dbhandler.changepasswordDBHandler(req,res);
} 
exports.changepasswordDBController = changepasswordDBController;

function senddataBacktostoreownerDBController(req,res){
    dbhandler.senddataBacktostoreownerDBHandler(req,res);
}
exports.senddataBacktostoreownerDBController = senddataBacktostoreownerDBController

//distributor login

function checkDistibutiorcredentialsDBController(req,res){

   dbhandler.checkDistributorcredentialsDBHandler(req,res);

}
exports.checkDistibutiorcredentialsDBController = checkDistibutiorcredentialsDBController;

function newstoreCreatorDBController(req,res){
    dbhandler.newStorecreatorDBHandler(req,res);
}
exports.newstoreCreatorDBController = newstoreCreatorDBController;
//db controller

function newdistributorcreaterDBController(req,res){
    dbhandler.newDistributorcreaterDBHandler(req,res);
}
exports.newdistributorcreaterDBController = newdistributorcreaterDBController;

//distributor loginin
 function checkAuthticationDBCfordistributor(req,res){
  dbhandler.checkAuthnticationDBHandlerfordistributor(req,res);

 }
 exports.checkAuthticationDBCfordistributor = checkAuthticationDBCfordistributor;
//device to central database
// need to look into
  function storedataofindentDBController(req,res){
     // console.log('l1')
    var socketstore = require('../utilities/socketstore');
    var deviceidstore = require('../utilities/firebasestore');
      var dateTime = require('node-datetime');
   var dt = dateTime.create();
     dt = dt.format('Y-m-d H:M:S');
       req=req.body;
       console.log(req);
       var data;
       var data1;
      for(item in req){
          data =req[item];
          console.log(data[0].indentId);
         // dbhandler.storedataofindentdbhandler(data[0].indentId,data[0].distributorId,dt);
          socketstore.getdistributorid(data[0].distributorId,res);
          deviceidstore.getidofdistributor(data[0].distributorId,res);
          for(var item1 in data){  
           data1 = data[item1];
          //  dbhandler.storedataofindentdetailsDBHandler(data1,res);
          }  
       }
  }
  exports.storedataofindentDBController = storedataofindentDBController;

  //indent to distributor db controller

  function senddataofindntlisttodistributorDBController(req,res){
      dbhandler.senddataofindenttodistibutorDBHandler(req,res);

  }
  exports.senddataofindntlisttodistributorDBController = senddataofindntlisttodistributorDBController;

  //store socketid

  function storesocketidofdistributorDBController(req1,req2){
      dbhandler.storesocketidofdistributorDBHandler(req1,req2);
  }
  exports.storesocketidofdistributorDBController = storesocketidofdistributorDBController;

  function storedeviceidofdistributorDBController(req,res){
      dbhandler.storedeviceidofdistributorDBHandler(req.body,res);
  }
  exports.storedeviceidofdistributorDBController = storedeviceidofdistributorDBController;