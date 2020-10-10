var express = require('express')
var app = express()         
var {sendMail} = require('./src/sendmail')
var {sendOtp} = require('./src/otpTry')
const Login = require('./src/login')
const Token = require('./src/token')
const Endpoint = require('./src/endpoint')
const Utils = require('./src/utilities/utils')
const bodyParser = require('body-parser')
const Cors = require('cors')
const endpoint = new Endpoint();
const token = new Token();
const login = new Login();
const utils = new Utils();
app.use(Cors())
app.use(bodyParser.urlencoded({extended : false}))
var jsonParser = bodyParser.json();
app.post('/', function (req, res) {
  res.send('hello world')
});
app.post('/signup',async function (req, res){
    let result = await login.signUp(req,res);
    res.append('Access-Control-Expose-Headers','signup,error')    
    res.append('signup',result);    
    res.send(result);
});

app.post('/verifyOtp', async function(req,res){
    let result = await login.verifyOtp(req,res);
    res.append('Access-Control-Expose-Headers','token,error')
    res.append('token',result);
    res.send('Success');
});

app.post('/resend', async function(req,res){
    let result = await login.resend(req,res);
    res.append('Access-Control-Expose-Headers','token,error')
    res.append('token',result);
    res.send('Success');
})

app.post('/login',async function (req, res){
    let result = await login.loginUser(req);
    res.append('Access-Control-Expose-Headers','token,error')
    res.append('token',result);
    res.send('Success');
});

app.post('/forgot',function (req, res){
   // let otp = Math.floor(1000+(9999-1000)*Math.random()); 
    //let result = sendMail('shreyas7bafna@gmail.com',otp);
    let result = sendOtp()
    res.send(result)
});

app.post('/getitems/:category',async function(req,res){
    let result = await endpoint.getItems(req,res,req.params.category)
    // res.append('Access-Control-Expose-Headers','items,token,error')
    // res.append('items',result);
    res.send(result);
})

app.post('/getitem/:id',async function(req,res){
    let result = await endpoint.getItem(req,res,req.params.id)
    // res.append('Access-Control-Expose-Headers','items,token,error')
    // res.append('items',result);
    res.send(result);
})

app.post('/pricing',jsonParser,async function(req,res){
    let result = await endpoint.getPrice(req,res)
    res.send(result)
    //res.send(req.body)
})
app.listen(8080);
