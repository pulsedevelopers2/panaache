let crypto = require('crypto');
const AuthDB = require('./authDB');
const bcrypt = require('bcryptjs');

const authDB = new AuthDB();

class AuthUtilities {
  encrypt(text, key = 'panaache') {
    /* eslint-disable node/no-deprecated-api */
    let mykey = crypto.createCipher('aes-128-cbc', key);
    let mystr = mykey.update(text, 'utf8', 'hex');
    mystr += mykey.final('hex');
    return mystr;
  }
  decrypt(text, key = 'panaache') {
    let mykey = crypto.createDecipher('aes-128-cbc', key);
    /* eslint-enable node/no-deprecated-api */
    let mystr = mykey.update(text, 'hex', 'utf8');
    mystr += mykey.final('utf8');
    return mystr;
  }

  createKey(data) {
    let str = null;
    str = data.host + data.origin + data.referer + data['user-agent'];
    return this.encrypt(str).substr(0, 12);
  }

  createHash(text) {
    const saltRounds = Math.floor(Math.random() * 10); //  Data processing speed
    let password = text; // Original Password
    let hashed = null;
    hashed = bcrypt.hash(password, saltRounds, function(err, hash) { // Salt + Hash
      return hash;
    });
    return { salt: saltRounds, hash: hashed };
  }

  async addNewUser(body, msg) {
    let otp = msg.toString();
    otp = this.encrypt(otp);
    let result = await authDB.insertNewUser(body, otp);
    return result;
  }

  async loginCheck(body) {
    let salt = await authDB.loginUser(body);
    // let secret = salt[0][0].secret;
    return bcrypt.compare(body.password, salt[0][0].password);
  }

  async emailCheck(body) {
    let result = await authDB.checkUser(body);
    return result;
  }

  async verifiedUser(body) {
    let result = await authDB.getUser(body.email);
    if (result && result.verified === 1) {
      return true;
    }
    return false;
  }

  otpCheck(body) {
    let emailOtp = body.emailOtp.toString();
    emailOtp = this.encrypt(body.emailOtp);
    // var passwd = this.decrypt(body.password)
    return authDB.verifyOtp(body, emailOtp);
  }

  async resendOtp(body, msg) {
    // var passwd = this.decrypt(body.password)
    let otp = msg.toString();
    otp = this.encrypt(otp);
    await authDB.resend(body, otp);
    return true;
  }

  sendToken(body, parser) {
    let mail = body.email;
    let time = new Date().getTime() + 7200000;
    let cacheTime = new Date().getTime() + 2592000000;
    let token = JSON.stringify({
      email: mail,
      key: time
    });
    let cacheToken = JSON.stringify({
      email: mail,
      key: cacheTime
    });
    return JSON.stringify({
      token: this.encrypt(token, parser),
      cacheToken: this.encrypt(cacheToken, parser),
      email: body.email
    });
  }
}
module.exports = AuthUtilities;
