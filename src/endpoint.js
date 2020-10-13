const Utils = require('./utilities/utils');

const utils = new Utils();
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
}
module.exports = Endpoint;
