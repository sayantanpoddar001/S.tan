var nodemailer = require('nodemailer');

function sendmailtostoreowner(datae,datapass,next){
$mail='kailash.cp2419@gmail.com';
$pass = '@kailashBAJYA';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,

  auth: {
    user:'kailash.cp2419@gmail.com' ,
    pass:'@kailashBAJYA1' 
  }
});

var mailOptions = {
  from: 'kailash.cp2419@gmail.com',
  to: datae,
  subject: 'now you are registered you user name',
  text: 'your user name: ' +(datae) + ',your password: ' +(datapass)
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    next(null,false);
  } else {
    console.log('Email sent: ' + info.response);
    next(null,true);
  }
});
}
exports.sendmailtostoreowner = sendmailtostoreowner;