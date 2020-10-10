const Utils = require('./utilities/utils')
const Auth = require('./authutilities/authutilities')

const auth =new Auth();
const utils = new Utils();

class Endpoint{
    async getItems(req,res,category){
        // let validToken = this.validateToken(req,res)
        // if(validToken){
        //     //do below processing here 
        // }
        // else {
        //     return "error";
        // }
        let result = await utils.getItems(category)
        return result;
    }

    async getItem(req,res,id){
        let result = await utils.getItem(id) 
        return result;
    }

    async validateToken(req,res){
        let token =  req.headers.token;
        token = auth.decrypt(token);
        token = JSON.parse(token);
        if(token.key <= token.key +7200000){
        return true;
        }
        else return false;
    }

    async getPrice(req,res){
        let body = req.body
        console.log(req.body);
        return body;
    }
}
module.exports = Endpoint;