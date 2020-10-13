let express = require('express');
let app = express();
let { sendOtp } = require('./src/otpTry');
const Login = require('./src/login');
const Endpoint = require('./src/endpoint');
const bodyParser = require('body-parser');
const Cors = require('cors');
const endpoint = new Endpoint();
const login = new Login();
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
let jsonParser = bodyParser.json();

app.post('/', function(req, res) {
  res.send('hello world');
});
app.post('/signup', async function(req, res) {
  let result = await login.signUp(req, res);
  res.append('Access-Control-Expose-Headers', 'signup,error');
  res.append('signup', result);
  res.send(result);
});

app.post('/verifyOtp', async function(req, res) {
  let result = await login.verifyOtp(req, res);
  res.append('Access-Control-Expose-Headers', 'token,error');
  res.append('token', result);
  res.send('Success');
});

app.post('/resend', async function(req, res) {
  let result = await login.resend(req, res);
  res.append('Access-Control-Expose-Headers', 'token,error');
  res.append('token', result);
  res.send('Success');
});

app.post('/login', async function(req, res) {
  let result = await login.loginUser(req);
  res.append('Access-Control-Expose-Headers', 'token,error');
  res.append('token', result);
  res.send('Success');
});

app.post('/forgot', function(req, res) {
  let result = sendOtp(req);
  res.send(result);
});

app.post('/getitems/:category', async function(req, res) {
  let result = await endpoint.getItems(req, res, req.params.category);
  res.send(result);
});

app.post('/getitem/:id', async function(req, res) {
  let result = 'error';
  if (login.getLoginToken(req, res)) {
    result = await endpoint.getItem(req, res, req.params.id);
  } else {
    res.append('Access-Control-Expose-Headers', 'token');
    res.append('token', 'error');
  }
  res.send(result);
});

app.post('/pricing', jsonParser, async function(req, res) {
  let result = 'error';
  if (login.getLoginToken(req, res)) {
    result = await endpoint.getPrice(req, res);
  } else {
    res.append('Access-Control-Expose-Headers', 'token');
    res.append('token', 'error');
  }
  res.send(result);
  // res.send(req.body)
});
app.listen(8080);
