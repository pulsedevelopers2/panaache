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
        return (res[0].length ? res[0][0] : null); 
    }

    async getItemDetails(select, table, detail, id){
        var sql = `Select ${select} from ${table[detail] || detail} where id = "${id}"`;
        let res = await mysql.query(sql);
        return (res[0].length ? res[0] : null); 
    }

    async getPrice(ct,quality,color){
        var sql = `Select price from qcs_pricing where quality = "${quality}" and color = "${color}" and carat_wt = ${ct}`
        let result = await mysql.query(sql);
        return (result[0].length ? result[0][0].price : null);
    }

    async getGoldPrice(id,size){
        var sql = `Select gold_details from items where id = "${id}"`
        let result = await mysql.query(sql);
        return (result[0].length ? result[0][0].price : null);
    }
}
module.exports = UtilsDB;
