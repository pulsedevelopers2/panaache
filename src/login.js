const Auth = require('./authutilities/authutilities')
const AuthDB = require('./authutilities/authDB')
const Token = require('./token')
var {sendMail} = require('./sendmail')

const token = new Token();
const authDB = new AuthDB();
const auth = new Auth();

class Login{

    async signUp(req,res){
        let encryptedBody = req.headers.signup;     
        let userBodyStr = Buffer.from(encryptedBody,'base64').toString();      
        let userBody = JSON.parse(userBodyStr);
        let validate = this.validUserBody(userBody);//validate Body
        if(!validate) {
            return "Error";
        }
        let emailauth = await auth.emailCheck(userBody);//call AuthUtilities EmailCheck
        if(emailauth === null){
        let otp = await Math.floor(1000+(9999-1000)*Math.random());
        let result = await auth.addNewUser(userBody,otp);//Add User
        let verified = await sendMail(userBody.email,otp);        
        return "otpSent";
     }
     else{
        return  "userExist";
     }
}

    async verifyOtp(req,res){
       // console.log(req.headers);
        let encryptedBody = req.headers.verifyotp;     
        let userBodyStr = Buffer.from(encryptedBody,'base64').toString();      
        let userBody = JSON.parse(userBodyStr);
        let result = await auth.otpCheck(userBody);
        if(!result){
            res.append('error','error');
            return "error";
        }
        return token.getToken(userBody);
    }
    async resend(req,res){
        let encryptedBody = req.headers.resendotp;     
        let userBodyStr = Buffer.from(encryptedBody,'base64').toString();      
        let userBody = JSON.parse(userBodyStr);
        let otp = await Math.floor(1000+(9999-1000)*Math.random());        
        let result = await auth.resendOtp(userBody,otp);
        let verified = await sendMail(userBody.email,otp);
        return true;
    }

    async loginUser(req,res){
        // let userBody = {
        //     email:"Shreyas",
        //     password:"Shreyasbaf"
        // }
         let encryptedBody = req.headers.login; 
         console.log(encryptedBody);    
         let userBodyStr = Buffer.from(encryptedBody,'base64').toString();      
         let userBody = JSON.parse(userBodyStr);
         console.log(userBody);
        let validate = this.validLoginBody(userBody);//Validate Login Body
        if(!validate) {
            res.send("Error");
        }
        let loginCheck = await auth.loginCheck(userBody);//Check Login Body Password
        if(loginCheck == true){
            if(await auth.verifiedUser(userBody)){
            return token.getToken(userBody)
            }else{
                await this.resend({
                    headers:{
                        resendotp: req.headers.login
                    }
                })
                return 'unverified';
            }
        }else{
            res.append('error','failed');
            return 'failed';
        }
    }

    async forgotPassword(req,res){ //Forgot Password Pending
        
        var time = new Date().getTime() + 7200000 
        console.log(time)
        return time;
    }

    validUserBody(userBody){
        if(!(userBody.name && userBody.email && userBody.phone && userBody.password)){
            return false;
        }
        if (userBody.password.length < 8 || userBody.password.length > 15 ){
            return false;
        }
        return true;
    }

    validLoginBody(userBody){
        if(!(userBody.email && userBody.password)){
            return false;
        }
        if (userBody.password.length < 8 || userBody.password.length > 15 ){
            return false;
        }
        return true;
    }
}
module.exports = Login;