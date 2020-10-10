var { resolve } = require('url')
var mysql = require('mysql-promise')();
const bcrypt = require ('bcrypt');

class AuthDB{

    constructor(){
        mysql.configure({
            host: "46.17.172.154",
            user: "u386445862_panaache",
            password:"Panaache@123dev",
            database:"u386445862_panaache"
          });
    }
    async insertNewUser(body,otp){
        await bcrypt.genSalt(10, async function(err, salt) {
           await bcrypt.hash(body.password, salt,async function(err, hash) {
            var sql = `INSERT INTO users(name,email,phone,password,secret,verified,otp) VALUES ("${body.name}","${body.email}","${body.phone}","${hash}",${10},${0},"${otp}")`;
               await mysql.query(sql);                      
            });
        })
    }
    async checkUser(body){
            var sql = `Select * from users where email = "${body.email}" or phone = "${body.phone}"`;
            let res = await mysql.query(sql);
            return (res[0].length ? res[0] : null); 
    }
    async deleteUser(body){
        var sql = `DELETE FROM users where email = "${body.email}" and phone = "${body.phone}" `;
        let result = await mysql.query(sql);
        return result;
    }

    async verifyOtp(body,otp){
        if(this.loginUser(body))
        {
            var sql = `Select * from users where email = "${body.email}" and otp = "${otp}"`;
            let res = await mysql.query(sql);
            if(res[0].length ? res[0] : null){
                var sql = `update users set verified = 1 where email = "${body.email}"`
                await mysql.query(sql);
                return res[0];
            }         
            return null;
        }
        return false;
    }
    async getUser(email){
        var sql = `select * from users where email = "${email}"`
        let res = await mysql.query(sql);
        return (res[0].length ? res[0][0] : null); 
    }
    async loginUser(body){
        var sql = `select * from users where email = "${body.email}"`;
        let result = await mysql.query(sql);
        return result;
        // let secret = salt[0][0].secret;
        // return await bcrypt.compare(body.password, salt[0][0].password);
    }

    async addOtp(email,otp){
        var sql = `INSERT INTO unverified_users(email,otp) VALUES ("${email}","${otp}")`; 
        let res = await mysql.query(sql);
        return true;    
    }

    async resend(body,otp){
        if(this.loginUser(body)){
            var sql = `update users set otp = "${otp}" where email = "${body.email}" `
            let res = await mysql.query(sql);
            return true;
        }        
        
    }
}
module.exports = AuthDB;