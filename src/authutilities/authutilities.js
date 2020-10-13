var crypto = require('crypto');
const AuthDB = require('./authDB')
const bcrypt = require ('bcrypt');

const authDB = new AuthDB();

class AuthUtilities{
        encrypt(text){
        var mykey = crypto.createCipher('aes-128-cbc', 'panaache');
        var mystr = mykey.update(text, 'utf8', 'hex')
        mystr += mykey.final('hex');
        return mystr;
        }
        decrypt(text){
            var mykey = crypto.createDecipher('aes-128-cbc', 'panaache');
            var mystr = mykey.update(text, 'hex', 'utf8')
            mystr += mykey.final('utf8');
            return mystr;
        }

        createHash(text){
            const saltRounds = Math.floor(Math.random()*10);  //  Data processing speed
            var password = text;  // Original Password
            var hashed = null;
            var hashed = bcrypt.hash(password, saltRounds, function(err, hash) { // Salt + Hash
                return hash;                              
            });``
            return { salt: saltRounds, hash: hashed}
        }

        async addNewUser(body,msg){
            let otp = msg.toString()
            otp = this.encrypt(otp)
            let result = await authDB.insertNewUser(body,otp);
            return result;
        }

        async loginCheck(body){
            let salt = await authDB.loginUser(body);
            let secret = salt[0][0].secret;
            return await bcrypt.compare(body.password, salt[0][0].password);    
            //return result;
        }

        async emailCheck(body){
            var result =  await authDB.checkUser(body);
            return result;
         }

        async verifiedUser(body){
            let result = await authDB.getUser(body.email); 
            //console.log(result)
            if(result && result.verified == "1") {
                //console.log('here')
                return true;
            }
            return false;
         }

         async otpCheck(body){
             var emailOtp = body.emailOtp.toString();
            var emailOtp = this.encrypt(body.emailOtp);
             //var passwd = this.decrypt(body.password)
             var result = await authDB.verifyOtp(body,emailOtp)
             return result;
         }

         async resendOtp(body,msg){
            //var passwd = this.decrypt(body.password)
            let otp = msg.toString()
            otp = this.encrypt(otp)
            var result = await authDB.resend(body,otp)
            return true;
         }

         sendToken(body){
            var mail = body.email;
            var time = new Date().getTime() + 7200000 
            var cacheTime = new Date().getTime() + 2592000000
            var token = JSON.stringify({
                email:mail,
                key:time
                });
            // token = JSON.stringify(token);
            // token = this.encrypt(token);
            var cacheToken = JSON.stringify({
                email:mail,
                key:cacheTime
            });
            return JSON.stringify({
                token:this.encrypt(token),
                cacheToken : this.encrypt(cacheToken)
            });
        }
}
module.exports = AuthUtilities; 