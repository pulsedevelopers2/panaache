const Utils = require('./utilities/utils');
const Auth = require('./authutilities/authutilities');
const Login = require('./login');

const auth = new Auth();
const utils = new Utils();
const login = new Login();

class Endpoint {
  async getItems(req, res, category) {
    // let validToken = login.validateToken(req,res)
    // if(validToken){
    //     //do below processing here
    // }
    // else {
    //     return "error";
    // }

    let result = await utils.getItems(category);
    return result;
  }

  async getItem(req, res, id) {
    let result = await utils.getItem(id);
    return result;
  }

  async getPrice(req, res) {
    let id = req.body.item_id;
    let quality = req.body.d_quality;
    let color = req.body.d_color;
    let size = req.body.size;
    let result = utils.getPrice(id, quality, color, size);
    return result;
  }
}
module.exports = Endpoint;
