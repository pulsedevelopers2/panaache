const Auth = require('./authutilities/authutilities');
const Token = require('./token');
let { sendMail } = require('./sendmail');

const token = new Token();
const auth = new Auth();

class Login {
  async signUp(req, res) {
    let encryptedBody = req.headers.signup;
    let userBodyStr = Buffer.from(encryptedBody, 'base64').toString();
    let userBody = JSON.parse(userBodyStr);
    let validate = this.validUserBody(userBody);// validate Body
    if (!validate) {
      return 'Error';
    }
    let emailauth = await auth.emailCheck(userBody);// call AuthUtilities EmailCheck
    if (emailauth === null) {
      let otp = await Math.floor(1000 + (9999 - 1000) * Math.random());
      let result = await auth.addNewUser(userBody, otp);// Add User
      let verified = await sendMail(userBody.email, otp);
      return 'otpSent';
    }
    return 'userExist';
  }

  async verifyOtp(req, res) {
    // console.log(req.headers);
    let encryptedBody = req.headers.verifyotp;
    let userBodyStr = Buffer.from(encryptedBody, 'base64').toString();
    let userBody = JSON.parse(userBodyStr);
    let result = await auth.otpCheck(userBody);
    if (!result) {
      res.append('error', 'error');
      return 'error';
    }
    return token.getToken(userBody, req.headers);
  }
  async resend(req, res) {
    let encryptedBody = req.headers.resendotp;
    let userBodyStr = Buffer.from(encryptedBody, 'base64').toString();
    let userBody = JSON.parse(userBodyStr);
    let otp = await Math.floor(1000 + (9999 - 1000) * Math.random());
    let result = await auth.resendOtp(userBody, otp);
    let verified = await sendMail(userBody.email, otp);
    return true;
  }

  async loginUser(req, res) {
    let encryptedBody = req.headers.login;
    let userBodyStr = Buffer.from(encryptedBody, 'base64').toString();
    let userBody = JSON.parse(userBodyStr);
    let validate = this.validLoginBody(userBody); // Validate Login Body
    if (!validate) {
      res.send('Error');// error
    }
    let loginCheck = await auth.loginCheck(userBody); // Check Login Body Password
    if (loginCheck === true) {
      if (await auth.verifiedUser(userBody)) {
        return token.getToken(userBody, req.headers);
      }
      await this.resend({
        headers: {
          resendotp: req.headers.login
        }
      });
      return 'unverified';
    }
    res.append('error', 'failed');
    return 'failed';
  }

  async forgotPassword(req, res) { // Forgot Password Pending
    let time = new Date().getTime() + 7200000;
    console.log(time);
    return time;
  }

  validUserBody(userBody) {
    if (!(userBody.name && userBody.email && userBody.phone && userBody.password)) {
      return false;
    }
    if (userBody.password.length < 8 || userBody.password.length > 15) {
      return false;
    }
    return true;
  }

  validLoginBody(userBody) {
    if (!(userBody.email && userBody.password)) {
      return false;
    }
    if (userBody.password.length < 8 || userBody.password.length > 15) {
      return false;
    }
    return true;
  }
  // async validateToken(req_token){
  //     let encryptedToken = req_token
  //     let userTokenStr = Buffer.from(encryptedToken,'base64').toString();
  //     token = auth.decrypt(userTokenStr);
  //     token = JSON.parse(token);
  //     result = await this.verifyToken(token);
  //     return result;
  // }
  verifyToken(token) {
    if (token.key >= Date().getTime()) {
      return true;
    }
    return false;
  }

  getLoginToken(req, res) {
    try {
      let encryptedToken = req.headers.token;
      let userTokenStr = Buffer.from(encryptedToken, 'base64').toString();
      let userToken = JSON.parse(userTokenStr);
      let parser = auth.createKey(req.headers);
      let token = userToken.token && JSON.parse(auth.decrypt(userToken.token, parser)) || { key: 0 };
      let cacheToken = userToken.cacheToken && JSON.parse(auth.decrypt(userToken.cacheToken, parser)) || { key: 0 };
      let currentTime = new Date().getTime();
      if (token.key >= currentTime || cacheToken.key >= currentTime) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
module.exports = Login;
