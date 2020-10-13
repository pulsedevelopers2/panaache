'use strict';
const nodemailer = require('nodemailer');
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email, msg) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
// let otp = msg.toString()
// otp = auth.encrypt(otp)
// console.log(auth.decrypt(otp))
// let unverified = await authDB.addOtp(email,otp);
// if(!unverified){
//     return "Error!!"
// }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pulse575@gmail.com',
      pass: 'Pulse@123dev'
    }
  });
  let mailOptions = {
    from: 'pulse575@gmail.com',
    to: email,
    subject: 'Panaache OTP Verification',
    html: `<h3>Verification Mail</h3><p>Your Panaache Verification Code is ${msg}</p>`
  };
  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  return true;
}
module.exports = { sendMail };
