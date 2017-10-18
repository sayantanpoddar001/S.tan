var dbhandelr =  require('../DBhandlers/DBHandlerknexjs');
var fbnotice = require('./fbnotifier');
function getidofdistributor(distid,res){
    dbhandelr.getdeviceid(distid,function(err,result){
        var data = result.tockenid;
     fbnotice.notifier(data,'appkey','title');
    })

}
exports.getidofdistributor = getidofdistributor;