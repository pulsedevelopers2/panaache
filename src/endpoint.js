const Utils = require('./utilities/utils');
const Razorpay = require('razorpay')

const utils = new Utils();
const instance = new Razorpay({
  key_id:"rzp_test_ysLINZgR8PucKz",
  key_secret:"RgkMbsYs1CsPAxI5TCxgOugQ"
})

class Endpoint {
  async getItems(req, res, category) {
    let result = await utils.getItems(category);
    return result;
  }

  async getItem(req, res, id) {
    let result = await utils.getItem(id);
    return result;
  }

  async getPrice(req) {
    let id = req.body.item_id;
    let quality = req.body.d_quality;
    let color = req.body.d_color;
    let size = req.body.size;
    let result = await utils.getPrice(id, quality, color, size);
    return result;
  }

  async addToCart(req, email) {
    let result = await utils.addToCart(req, email);
    return result;
  }

  async viewCart(req, email) {
    let result = await utils.viewCart(req, email);
    return result;
  }

  async createOrder(){
    var options = {
      amount: 50000,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    instance.orders.create(options).then((data)=>{
      console.log(data);
      return data;
    })
  }

}
module.exports = Endpoint;
