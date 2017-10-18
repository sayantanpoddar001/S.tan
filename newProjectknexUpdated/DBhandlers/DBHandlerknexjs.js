//var insertObj = require('../Database/setDAO');

/*function createDBhandleronlocaledevicestore(req,res){
   
}
exports.createDBhandleronlocaledevicestore = createDBhandleronlocaledevicestore;*/
var fs = require('fs');

var insertSObj = require('../Database/setserverDAO');
function checkAuthnDBHandlers(req,res){
         var data= req.body;
         console.log(data);
   insertSObj.checkAuthnticationfornewuser(data['LoginId'],data['password'],data['DeviceId'],function(err,result){

       if(result == true){
       /* insertObj.createSchemaonlocaldeviceforstoredevice(req,res,function(err,results){
          })

          fs.readFile('schemafile.txt', function (err, data) {
          if (err) {
             return console.error(err);
               }
               var text_ready = data.toString();
               console.log("Asynchronous read: " + data.toString());
            res.setHeader('Content-type', "application/octet-stream");
           res.setHeader('Content-disposition', 'attachment; filename=file.txt');
           res.send(new Buffer(text_ready));
        
      });
         // var text_ready = "This is a content of a txt file."
        // res.setHeader('Content-type', "application/octet-stream");
      //  res.setHeader('Content-disposition', 'attachment; filename=file.txt');
     //  res.send( new Buffer(text_ready) );*/
         res.send('true');
         }
        else if(result == false)
       {
          res.send('false');
       }
    
    })
}
exports.checkAuthnDBHandlers= checkAuthnDBHandlers;
function changepasswordDBHandler(req,res){
    var data= req.body;
    insertSObj.changePasswordrequestforuser(data['LoginId'],data['newpassword'],function(err,result){
     if(result==true)
    {    senddataBacktostoreownerDBHandler(req,res);
        //res.send('passchangesuccessful');
    }
     else if(result == false)
      res.send({"status":"failed"});
    })
}
exports.changepasswordDBHandler = changepasswordDBHandler;
function senddataBacktostoreownerDBHandler(req,res){
    var data = req.body;
    insertSObj.senddataBacktoStoreowner(data['LoginId'],function(err,store_master){
        if(store_master != null)
      {   
          
          insertSObj.senddatabacktostoreownerofdistributor(function(err,distributor_master){
             insertSObj.senddatabacktostoreownerofmanufractor(function(err,manufractor_master){
               insertSObj.senddatabacktostoreownerofdrugmaster(function(err,drug_master){
                   insertSObj.senddatabacktostoreofdrug2distributor(function(err,drug2distributor){

                      var data1= { "status":"success",
                     store_master,
                     distributor_master,
                     manufractor_master,
                     drug_master,
                     drug2distributor
             }
             res.send(data1);

                   })
                

               })
           

             })
         })
          
         
        }
        else
     {   res.send({"status":"failed"})}
    })
}
exports.senddataBacktostoreownerDBHandler = senddataBacktostoreownerDBHandler;
//dbhandler for distributor.
function checkDistributorcredentialsDBHandler(req,res){
          var data = req.body;
          insertSObj.checkDistributorcredentials(data['LoginId'],data['pass'],function(err,result){
           if(result == undefined)
         { res.send("user is not registerd. please first registerd");}
           else if( result == true)
          { res.send("now  you are loged in");}
           else if(result == false){
           res.send("invalid username and password");}

          })

}
exports.checkDistributorcredentialsDBHandler = checkDistributorcredentialsDBHandler;
function newStorecreatorDBHandler(req,res){
   insertSObj.findstoreID1(req.email,function(err,result){

    if(result)
     {var generator = require('generate-password');
      var passwordgen = generator.generate({
                    length: 2,
                    numbers: true
                    
                });
             var mail = require('../utilities/nodmail')
         mail.sendmailtostoreowner(req.email,passwordgen,function(err,result1){
    if(result1){
          insertSObj.newstoreCreater(req,res,function(err,result){
         insertSObj.passwordCreatorandinsert(req.email,passwordgen,function(err,result2){
             res.send("successfully created");
         });
    });
       }
    else
    res.send("could not created because email is incorrect.");
            });
     }
    else
    {
        res.send("store is already exists");
    }
   })
}
exports.newStorecreatorDBHandler = newStorecreatorDBHandler;

//add distributor dbhandler

function newDistributorcreaterDBHandler(req,res){
    
            insertSObj.findDistributorID(req.body,function(err,resultdid){
        if(resultdid != undefined){
          res.send("user is already exsits please try with different email id");
        }
         else {
              var generator = require('generate-password');
         var passwordgen = generator.generate({
                    length: 2,
                    numbers: true
                    
                });
                 var mail = require('../utilities/nodmail');
                    var data = req.body;
                 console.log(data.email);
              mail.sendmailtostoreowner(data.email,passwordgen,function(err,result){

            if(result){
             
              insertSObj.newdistributorcreator(req.body,res,function(err,result){
        
                 insertSObj.findDistributorID(req.body,function(err,resultdid){
             
                insertSObj.createDistributoradmin(data.email,passwordgen,resultdid.did,function(err,result){
                      
                //still havew to do send message varification for email at the top of create distributor process.
               });
                });
            
            })
            res.send("please check your email.");
        }
        else
        res.send("couldn't created user because entered email is wrong. ");
              })
         }
    })
}
exports.newDistributorcreaterDBHandler = newDistributorcreaterDBHandler;


//check for distributor authuntication

function checkAuthnticationDBHandlerfordistributor(req,res){
   insertSObj.checkauthnticationofDistributor(req,function(err,result){
       res.send(result);
   })

}
exports.checkAuthnticationDBHandlerfordistributor =checkAuthnticationDBHandlerfordistributor;
//indent_details data store for distibutor
function storedataofindentdetailsDBHandler(req,res){
    insertSObj.storedatatoindent_details(req,function(err,result){
       
    })
}
exports.storedataofindentdetailsDBHandler = storedataofindentdetailsDBHandler;
//indent data store for distributor
function storedataofindentdbhandler(req,req1,dt){
        insertSObj.storedataintoindent(req,req1,dt,function(err,result1){

        })
}
exports.storedataofindentdbhandler = storedataofindentdbhandler;
// indent to distributor db handler
function senddataofindenttodistibutorDBHandler(req,res){
    insertSObj.senddataofindenttodistributor(req,res);

}
exports.senddataofindenttodistibutorDBHandler = senddataofindenttodistibutorDBHandler;
//storing and updating socketid
function storesocketidofdistributorDBHandler(req1,req2)
{    insertSObj.checkforsocketidofdistributor(req1,function(err,result){
    if(result == false)
    {
        insertSObj.storesocketidofdistributor(req1,req2);
    }
    else
    {
      insertSObj.updatesocketidofdistributor(req1,req2);
    }
})


}
exports.storesocketidofdistributorDBHandler = storesocketidofdistributorDBHandler;
function storedeviceidofdistributorDBHandler(req,res){
  insertSObj.storedeviceidofdistributor(req.username,req.tokenid,function(err,result){
      if(result)
      res.send('true');
      else
      res.send('false');
   })
}
exports.storedeviceidofdistributorDBHandler = storedeviceidofdistributorDBHandler;
function getdeviceid(req,next){
    insertSObj.getcurrentdistributordeviceid(req,function(err,result){
        next(err,result);
    })
}
exports.getdeviceid = getdeviceid;