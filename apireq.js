var express = require('express')
var app = express()         
var {sendMail} = require('./src/sendmail')
var {sendOtp} = require('./src/otpTry')
const Login = require('./src/login')
const Token = require('./src/token')
const Endpoint = require('./src/endpoint')
const Utils = require('./src/utilities/utils')
const Auth = require('./src/authutilities/authutilities')
const bodyParser = require('body-parser')
const Cors = require('cors')
const endpoint = new Endpoint();
const login = new Login();
const utils = new Utils();
const token = new Token();
const auth = new Auth();
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

app.post('/cachelogin',async function (req, res){
    let result = login.verifyToken(req,key='cache');
    if(result){
        res.append('Access-Control-Expose-Headers','token')
        res.append('token',result);
        res.send('Success');
    } else {
        let parser = auth.createKey(req.headers);
        let token = null;
        let cacheToken = null;
        result = JSON.stringify({
            token: this.encrypt(token, parser),
            cacheToken: this.encrypt(cacheToken, parser)
          });
       result =  Buffer.from(result).toString('base64');
       res.status(403).send('error');
    }
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
    let result = 'error'
    if(true/*login.verifyToken(req)*/){
        result = await endpoint.getItem(req,res,req.params.id)
    }
    else {
        res.append('Access-Control-Expose-Headers','token')
        res.append('token','error');
    }
    res.send(result);
})

app.post('/pricing',jsonParser,async function(req,res){
    let result = 'error'
    if(login.verifyToken(req)){
        result = await endpoint.getPrice(req,res)
    } else {
        res.append('Access-Control-Expose-Headers','token')
        res.append('token','error');
    }
    res.send(result)
    //res.send(req.body)
})
app.listen(8080)