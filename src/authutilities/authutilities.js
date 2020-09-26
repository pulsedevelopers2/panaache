var crypto = require('crypto');
const AuthDB = require('./authDB')
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
        addNewUser(body){
            let result = authDB.insertNewUser(body);
            return result;
        }
}

module.exports = AuthUtilities; 