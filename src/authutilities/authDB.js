var { resolve } = require('url')

var mysql = require('mysql');
const bcrypt = require ('bcrypt'); // require bcrypt
class AuthDB{

    constructor(){
        this.hostname = "46.17.172.154";
        this.database = "u386445862_panaache";
        this.user = "u386445862_panaache";
        this.password = "Panaache@123dev";
    }

    insertNewUser(body){
        var con = mysql.createConnection({
            host: this.hostname,
            user: this.user,
            password: this.password,
            database:this.database
          });

          con.connect(function(err) {
            if (err) throw err;
          })
            console.log("Connected!");
            console.log(body)
            bcrypt.hash(body.password, 10, function(err, hash) { // Salt + Hash
            var sql = `INSERT INTO users(name,email,phone,password,secret) VALUES ("${body.name}","${body.email}","${body.phone}","${hash}",${10})`;
                con.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log("1 record inserted");
                });                      
            });
    }

    async checkUser(body){
        var con = mysql.createConnection({
            host: this.hostname,
            user: this.user,
            password: this.password,
            database:this.database
          });
            var sql = `Select * from users where email = "${body.email}" or phone = "${body.phone}"`;
             con.connect(function(err) {
            })
            console.log('here')
            let res = null;
             con.query(sql, function (err, result) {
                  if (err) throw err;
                  this.res = result;                  
                    this.res = result;
                    //console.log(this.res);
                });
            con.end();                  
    }
}
module.exports = AuthDB;