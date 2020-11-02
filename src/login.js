const Auth = require('./authutilities/authutilities');
const Token = require('./token');
let { sendMail } = require('./sendmail');

const token = new Token();
const auth = new Auth();

class Login {
  async signUp(req) {
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
      await auth.addNewUser(userBody, otp);// Add User
      await sendMail(userBody.email, otp);
      return 'otpSent';
    }
    return 'userExist';
  }

  async verifyOtp(req, res) {
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
  async resend(req) {
    let encryptedBody = req.headers.resendotp;
    let userBodyStr = Buffer.from(encryptedBody, 'base64').toString();
    let userBody = JSON.parse(userBodyStr);
    let otp = await Math.floor(1000 + (9999 - 1000) * Math.random());
    await auth.resendOtp(userBody, otp);
    await sendMail(userBody.email, otp);
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

  verifyToken(req, key = 'token') {
    try {
      let encryptedToken = req.headers[key];
      let userTokenStr = Buffer.from(encryptedToken, 'base64').toString();
      let userToken = JSON.parse(userTokenStr);
      let parser = auth.createKey(req.headers);
      let user_token = userToken.token && JSON.parse(auth.decrypt(userToken.token, parser)) || { key: 0 };
      let cacheToken = userToken.cacheToken && JSON.parse(auth.decrypt(userToken.cacheToken, parser)) || { key: 0 };
      let currentTime = new Date().getTime();
      if (user_token.key >= currentTime || cacheToken.key >= currentTime) {
        return Buffer.from(JSON.stringify({
          email: user_token.email || cacheToken.email
        })).toString('base64');
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
module.exports = Login;
