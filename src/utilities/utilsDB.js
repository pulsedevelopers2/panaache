
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
    
  // async getItems(category) {
  //   let sql = `Select * from items where category = "${category}"`;
  //   let res = await mysql.query(sql);
  //   return (res[0].length ? res[0] : null);
  // }
  async getItems(category) {
    let sql = `Select * from items where id in(select item_id from categories where ${category} = 1)`;
    let res = await mysql.query(sql);
    return (res[0].length ? res[0] : null);
  }
  async getItem(id) {
    let sql = `Select * from items where id = "${id}"`;
    let res = await mysql.query(sql);
    return (res[0].length ? res[0][0] : null);
  }

  async getSizes(category) {
    let sql = `select sizes from category where category_name = "${category.toLowerCase()}"`;
    let res = await mysql.query(sql);
    return (res[0].length ? res[0][0] : null);
  }

  async getDquality() {
    let sql = 'select quality FROM d_quality';
    let res = await mysql.query(sql);
    return (res[0].length ? res[0] : null);
  }
  async getDcolor() {
    let sql = 'select color FROM d_color';
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

  async getGoldLiveRate() {
    let sql = 'Select rate from gold_rate where id = 12321';
    let result = await mysql.query(sql);
    return (result[0].length ? result[0][0].rate : null);
  }

  async addToCart(userBody, email) {
    let sql = `insert into users_cart(item_id,user_email,quantity,quality,color,size,metal) values ("${userBody.item_id}","${email}",${userBody.quantity},"${userBody.quality}","${userBody.color}",${userBody.size},"${userBody.metal}") `;
    console.log(sql)
    let result = await mysql.query(sql);
    return result;
  }

  async viewCart(req, email) {
    let sql = `select * from users_cart where user_email = "${email}"`;
    let result = await mysql.query(sql);
    return (result[0].length ? result[0] : null);
  }
}
module.exports = UtilsDB;
