const Auth = require('./authutilities/authutilities');

const auth = new Auth();

class Token{
     getToken(body){
        var result = auth.sendToken(body);
        return Buffer.from(result).toString('base64');
    }
}
module.exports = Token;