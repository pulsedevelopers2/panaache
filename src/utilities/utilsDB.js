
let mysql = require('mysql-promise')();

class UtilsDB {
  constructor() {
    mysql.configure({
      host: '46.17.172.154',
      user: 'u386445862_panaache',
      password: 'Panaache@123dev',
      database: 'u386445862_panaache'
    });
  }
    
  async getItems(category) {
    let sql = `Select * from items where category = "${category}"`;
    let res = await mysql.query(sql);
    return (res[0].length ? res[0] : null);
  }

  async getItem(id) {
    let sql = `Select * from items where id = "${id}"`;
    let res = await mysql.query(sql);
    return (res[0].length ? res[0][0] : null);
  }

  async getSizes(category){
    let sql = `select sizes from category where category_name = "${category.toLowerCase()}"`
    let res = await mysql.query(sql);
    return (res[0].length ? res[0][0] : null);
  }

  async getQualityColor(){
    let sql = `select concat(d_quality.quality," ",d_color.color) as qc FROM d_quality join d_color`
    let res = await mysql.query(sql);
    return (res[0].length ? res[0] : null);
  }
  async getItemDetails(select, table, detail, id) {
    let sql = `Select ${select} from ${table[detail] || detail} where id = "${id}"`;
    let res = await mysql.query(sql);
    return (res[0].length ? res[0] : null);
  }

  async getPrice(ct, quality, color) {
    let sql = `Select price from qcs_pricing where quality = "${quality}" and color = "${color}" and carat_wt = ${ct}`;
    let result = await mysql.query(sql);
    return (result[0].length ? result[0][0].price : null);
  }
}
module.exports = UtilsDB;
