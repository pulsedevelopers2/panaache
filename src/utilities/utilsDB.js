var { resolve } = require('url')
var mysql = require('mysql-promise')();
const bcrypt = require ('bcrypt');

class UtilsDB{

    constructor(){
        mysql.configure({
            host: "46.17.172.154",
            user: "u386445862_panaache",
            password:"Panaache@123dev",
            database:"u386445862_panaache"
          });
    }
    async getItems(category){
        var sql = `Select * from items where category = "${category}"`;
        let res = await mysql.query(sql);
        return (res[0].length ? res[0] : null); 
    }

    async getItem(id){
        var sql = `Select * from items where id = "${id}"`;
        let res = await mysql.query(sql);
        return (res[0].length ? res[0] : null); 
    }

    async getMetals(id){
        var sql = `Select * from item_category where id = "${id}"`;
        let res = await mysql.query(sql);
        return (res[0].length ? res[0] : null); 
    }
    
    async getFashion(id){
        var sql = `Select * from fashion_category where id = "${id}"`;
        let res = await mysql.query(sql);
        return (res[0].length ? res[0] : null); 
    }

    async getStock(id){
        var sql = `Select * from stocks where id = "${id}"`;
        let res = await mysql.query(sql);
        return (res[0].length ? res[0] : null); 
    }
}
module.exports = UtilsDB;