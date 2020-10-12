const UtilsDB = require('./utilsDB')
const Auth = require('../authutilities/authutilities')
const auth =new Auth();
const utilsDB = new UtilsDB();

class Utils{
    async getItems(category){
        let result = await utilsDB.getItems(category);
        return this.purifyItems(result);
    }
    
    async getItem(id){
        var i;
        let result = await utilsDB.getItem(id);
        result = this.purifyItems([result])[0];
        [result.metal, result.fashion, result.stock] = await Promise.all([this.getItemDetails('metal', id), this.getItemDetails('fashion', id), this.getItemDetails('stock', id)]);
        result.gold_details = await Promise.all(result.gold_details.map(async item => {
            let price = 0;
            price = (item.weight * 0.77 * 5000)/0.995;
            let details = this.getGoldCosting(item, price);
            return details;
        }));
        return result;
    }

    async getItemDetails(details, id){
        let table = {
            'metal': 'item_category',
            'fashion': 'fashion_category',
            'stock': 'stocks'
        }
        let select = (details && details == 'stock')?'*':details;
        let detail = await utilsDB.getItemDetails(select, table, details, id);
        detail = detail && detail.map(item => {
            return item[details] || item;
        }) || null;
        return detail;
    }

    async getPrice(id,quality,color,size){
        var diamond_cost=0;
        let result = this.purifyItems([await utilsDB.getItem(id)])[0];

        result.item_details = await Promise.all(result.item_details.map(async item => {
            let temp_weight = item.weight/item.quantity;
            let price = 0;
            if (temp_weight < 0.01) {
            price = await utilsDB.getPrice(Math.round(temp_weight*1000)/1000,quality.toUpperCase(), color.toUpperCase())
            }else{
            price = await utilsDB.getPrice(Math.round(temp_weight*100)/100,quality.toUpperCase(), color.toUpperCase())
            }
            let details = this.getDiamondCosting(item, price)
            diamond_cost = diamond_cost + details.price; 
            return details;
        }));

        result.gold_details = await Promise.all(result.gold_details.map(async item => {
            let price = 0;
            price = (item.weight * 0.77 * 5000)/0.995;
            let details = this.getGoldCosting(item, price) 
            return details;
        }));

        let gold_rate =  this.getGoldRates(result.gold_details,size)//result['gold_details'][x].price //(result.gold_wt*0.77*5000)/0.995 //Gold Rates
        let making_charges = result.gold_wt * 900;
        let gst = (gold_rate + making_charges + diamond_cost)*0.03;//gst 3%
        let total_cost = gold_rate + making_charges + diamond_cost + gst;//total
        result.diamond_cost = diamond_cost;
        result.gold_rate = gold_rate;
        result.making_charges = making_charges;
        result.gst = gst;
        result.total_cost = total_cost;
        return result;
    }

    getDiamondCosting(item, base_price){
        let tem_item = item;
        tem_item.price = item.weight*base_price
        return tem_item;
    }

    getGoldCosting(item,price){
        let temp_item = item;
        temp_item.price = price
        return temp_item;
    }

    getGoldRates(result,size){
        let arr = result.filter(item => {
            if (item.size == size) {
                return true;
            }
            return false;
        });
        return arr[0] && arr[0].price || result[0].price;
    }

    purifyItems(body) {
        let newBody = [];
        let totalWt = 0;
        var i;        
        body.forEach(item => {
            let item_temp = item;
            item_temp.image_link = JSON.parse(item_temp.image_link);
            item_temp.item_details = JSON.parse(item_temp.item_details);
            item_temp.gold_details = JSON.parse(item_temp.gold_details);                      
            newBody.push(item_temp);
        })
        return newBody;
    }
}
module.exports = Utils;