var knex= require('./setConnserver');
function checkAuthnticationfornewuser(datali,dataps,datadi,next){
     knex.select().from('userrecordwithdeviceid').where('storeusername',datali).then(function(results){
  
      if(results[0] == undefined)
          {  
                                         next(null,false);}
     else
    {              if((dataps == results[0].storepassword)){
                                         updatedevicedetails(datali,datadi,function(err,val){
                                               if(val.rowCount==1){   
                                                  next(null,true);
                                                }
                                                   else
                                                {
                                               next(null,false);
                                              }
                                         })
                                  }    
                    else
                    next(null,false);
       }
     })
     }

//update device id
 function updatedevicedetails(datali,datadi,next){
   var dateTime = require('node-datetime');
   var dt = dateTime.create();
     dt = dt.format('Y-m-d H:M:S');
 knex('devicedetails').insert({deviceid:datadi,storeuserid:datali,commisiondate:dt}).then(function(result){
   next(null,result);
 });
 }
exports.checkAuthnticationfornewuser = checkAuthnticationfornewuser;

function changePasswordrequestforuser(datali,datacp,next){
 
   knex('userrecordwithdeviceid').where('storeusername',datali).update('storepassword',datacp).then(function(results){
    
     if(results==1)
       next(null,true);
      else if(results==0)
      next(null,false);
     
   })

}
exports.changePasswordrequestforuser = changePasswordrequestforuser;

function senddataBacktoStoreowner(datali,next){
  knex.select('id','storename','store_address','owner_name','phone_number','email','contact_person','gst_no','pan_no','drug_licencenumber','licence_expirydate').from('store_master').where('sid',datali).then(function(result){
    if(typeof result != undefined && result != null)
    {  console.log('founded');
       console.log(result);
       next(null,result);
    }
    else{
      console.log(result);
      console.log('not found')
    next(null,null);}
  })
}
exports.senddataBacktoStoreowner = senddataBacktoStoreowner;
function senddatabacktostoreownerofdistributor(next){
  knex.select('did','distibutor_name','d_address','gstnumber','contact_person','phone_number','du_email').from('distributor_master').then(function(result){
    next(null,result);
  });

}
exports.senddatabacktostoreownerofdistributor = senddatabacktostoreownerofdistributor;
function senddatabacktostoreownerofmanufractor(next){
knex.select().from('manufractor_master').then(function(result){
  next(null,result);
})


}
exports.senddatabacktostoreownerofmanufractor = senddatabacktostoreownerofmanufractor;

function senddatabacktostoreownerofdrugmaster(next){
  knex('drug_master').select().then(function(result){
    next(null,result);
  })
}
exports.senddatabacktostoreownerofdrugmaster = senddatabacktostoreownerofdrugmaster;
//send back data of drug2distributor
function senddatabacktostoreofdrug2distributor(next){
  knex('drug2distributor').select().then(function(result){
    next(null,result);
  })
}

exports.senddatabacktostoreofdrug2distributor =senddatabacktostoreofdrug2distributor;
//checking distributor credentials
 //not in use
function checkDistributorcredentials(datali,datapa,next){
  knex('distributorcredential').select('distributor_password').where('distributor_username',datali).then(function(err,result){
    if(err)
     next(null,undefined);
    else{
    if(result[0].distributor_password == datapa){
      next(null,true);
    }
    else
    next(null,false)
  }

  })
}
exports.checkDistributorcredentials = checkDistributorcredentials;

//create store 
function newstoreCreater(req,res,next){
knex('store_master').insert({sid:req.email,storename:req.storeName,store_address:req.address,owner_name:req.ownerName,phone_number:req.phone,email:req.email,contact_person:req.contactPerson,gst_no:req.GSTno,pan_no:req.PANno,drug_licencenumber:req.dragLicense,licence_expirydate:req.licenseExpiredate}).then(function(result){
next(null,result);
});
}
exports.newstoreCreater = newstoreCreater;
//create password for a store owner.
function passwordCreatorandinsert(req,req1,next){
   findstoreID(req,function(err,result){
           knex('userrecordwithdeviceid').insert({storeusername:req,storepassword:req1,storeid:result}).then(function(result){
     next(null,result);
  });
   })  
}
exports.passwordCreatorandinsert = passwordCreatorandinsert;
// find store id
  function findstoreID(req,next){
    knex('store_master').select().where({sid:req}).then(function(result){
       next(null,result[0].id);


    });
  }
  exports.findstoreID= findstoreID;
  function  findstoreID1(req,next){
     knex('store_master').select().where({sid:req}).then(function(result){
       if(result[0] != undefined)
        {  console.log('a' + result);
           next(null,false);}
      else
     {   console.log('b'+result);
        next(null,true);}

    });
  }
  exports.findstoreID1 = findstoreID1;
function newdistributorcreator(req,res,next){
   knex('distributor_master').insert({distibutor_name:req.distributorName,d_address:req.address,gstnumber:req.GSTno,contact_person:req.contactPerson,phone_number:req.phone,du_email:req.email}).then(function(result){
     next(null,result);
   });

}
exports.newdistributorcreator = newdistributorcreator;
//distributor username + password storing.
function createDistributoradmin(req1,req2,req3,next){
  knex('distributor_credentials').insert({username:req1,userpassword:req2,did:req3}).then(function(result){
    next(null,result);
  })
}
exports.createDistributoradmin = createDistributoradmin;

function findDistributorID(req,next){
  knex('distributor_master').select().where({du_email:req.email}).then(function(result){
  
    next(null,result[0]);
  })
}
exports.findDistributorID = findDistributorID;
//distributor login

function checkauthnticationofDistributor(req,next)
{  req = req.body;
  knex('distributor_credentials').select().where({username:req.username}).then(function(result){
      if(result[0] != undefined){
            if(result[0].userpassword == req.password)
              next(null,result[0].username);
            else
            next(null,false);    
            
      }
      else
      next(null,false);
  })
}
exports.checkauthnticationofDistributor = checkauthnticationofDistributor;

function storedatatoindent_details(req1,next){

   knex('indent_details').insert({indent_id:req1.indentId,drug_id:req1.drugId,quantity:req1.quantity,package_type:req1.packagetype,storeid:req1.storeId}).then(function(result){
  next(null,result);
   });

}
exports.storedatatoindent_details = storedatatoindent_details;

function storedataintoindent(req2,req3,dt,next){

knex('indent').insert({indent_id:req2,orderdate:dt,distributorid:req3}).then(function(result){
next(null,result);
});
}
exports.storedataintoindent = storedataintoindent;

//send data of indent list to distributor 


function senddataofindenttodistributor(req,res){
  knex('distributor_master').select('did').where({du_email:req}).then(function(result){
     var dId = result[0].did; 
     
      knex('indent').join('indent_details',{'indent.indent_id':'indent_details.indent_id'}).join('drug_master',
      {'indent_details.drug_id':'drug_master.did'}).
      select('indent_details.indent_id','drug_master.drug_name','drug_master.company_name','drug_master.formula_name',
      'drug_master.strength','drug_master.max_retail_price').where({distributorid:dId,status:'Active'}).then(function(result1){
       res.send(result1);
      })
  })


}
exports.senddataofindenttodistributor = senddataofindenttodistributor;

//store user socketid into database

function storesocketidofdistributor(requserid,reqsocketid){
 knex('userwithsocketid').insert({userid:requserid,socketid:reqsocketid}).then(function(result){
   console.log(result.rowCount);
 })
}
 exports.storesocketidofdistributor = storesocketidofdistributor;
 //updating socket id of distributor
 function updatesocketidofdistributor(requserid,data){
  knex('userwithsocketid').update({socketid:data}).where({userid:requserid}).then(function(result){
 console.log(result);
 }) 
}       
exports.updatesocketidofdistributor = updatesocketidofdistributor;

//checking for socket id in database
function checkforsocketidofdistributor(requserid,next){
  knex('userwithsocketid').select().where({userid:requserid}).then(function(result){
  
   if(result[0] != undefined)
    {
        next(null,true);
    }
    else
    next(null,false);  
 }) 
}

exports.checkforsocketidofdistributor =checkforsocketidofdistributor;
 function getcurrentdistributorsocketid(dId,next){
   knex('distributor_master').join('userwithsocketid','distributor_master.du_email','userwithsocketid.userid').select('userwithsocketid.socketid').where('distributor_master.did',dId).
   then(function(result){
     next(null,result[0]);
   }
   )
 }
 exports.getcurrentdistributorsocketid = getcurrentdistributorsocketid;

 //storing device id of distributor

 function storedeviceidofdistributor(username,deviceid,next){
   knex('fcptokenidofuser').insert({userid:username,tockenid:deviceid}).then(function(result){
     if(result.rowCount ==1){
       next(null,true);
     }
     else{
       next(null,false);
     }
   })
 }
 exports.storedeviceidofdistributor = storedeviceidofdistributor;
  function getcurrentdistributordeviceid(dId,next){
   knex('distributor_master').join('fcptokenidofuser','distributor_master.du_email','fcptokenidofuser.userid').select('fcptokenidofuser.tockenid').where('distributor_master.did',dId).
   then(function(result){
     next(null,result[0]);
   }
   )
 }
 exports.getcurrentdistributordeviceid = getcurrentdistributordeviceid;
