const UtilsDB = require('./utilsDB')
const Auth = require('../authutilities/authutilities')
const auth =new Auth();
const utilsDB = new UtilsDB();

class Utils{
    async getItems(category){
        var i;
        let result = await utilsDB.getItems(category)
        //result = JSON.parse(JSON.stringify(result))
        //console.log(JSON.parse(result[0].item_details)[0].weight)
        return this.purifyItems(result)
    }
    getDiamondCosting(item, base_price){
        let tem_item = item;
        tem_item.price = item.weight*base_price
        return tem_item;
    }
    purifyItems(body) {
        let newBody = [];
        let totalWt = 0;
        var i;        
        body.forEach(item => {
            let item_temp = item;
            item_temp.image_link = JSON.parse(item_temp.image_link);
            item_temp.item_details = JSON.parse(item_temp.item_details); 
            // for (i in (item_temp.item_details)){
            //     totalWt = totalWt + (item_temp.item_details)[i].weight
            // }
            // item_temp.totalCtWeight = totalWt;                     
            newBody.push(item_temp);
        })
        return newBody;
    }
    async getItem(id){
        var i;
        let result = await utilsDB.getItem(id)
        result = this.purifyItems([result])
        var metal = null;
        var fashion = null;
        if(result.metal){
            metal = await this.getMetals(id);
        }
        if(result.fashion){
            fashion = await this.getFashion(id)
        }
        let stock = await this.getStock(id);
        result.metal=metal
        result.fashion=fashion
        result.stock=stock
        return result;
    }

    async getMetals(id){
        var i,x;
        let metal = []
        let metals = await utilsDB.getMetals(id)
        //console.log(JSON.parse(JSON.stringify(metals)))
        for (i in JSON.parse(JSON.stringify(metals))){
        x = metal.push(JSON.parse(JSON.stringify(metals))[i].metal)              
        }      
        return metal;
    }

    async getFashion(id){
        var i,x;
        let fashion = []
        let fashions = await utilsDB.getFashion(id)
        for (i in JSON.parse(JSON.stringify(fashions))){
            x = fashion.push(JSON.parse(JSON.stringify(fashions))[i].fashion)
        }        
        return fashion;
    }

    async getStock(id){
        var i,x;
        let stock = []
        let stocks = await utilsDB.getStock(id)
        for (i in JSON.parse(JSON.stringify(stocks))){
            x = stock.push(JSON.parse(JSON.stringify(stocks))[i])
        }        
        return stocks;
    }

    async getPrice(id,quality,color){
        var diamond_cost=0;
        let result = this.purifyItems([await utilsDB.getItem(id)])[0];
        let pricelist = new Object();
        //result = await this.purifyItems(result);
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
        
        let gold_rate =  (result.gold_wt*0.77*5000)/0.995//Gold Rates
        let making_charges = result.gold_wt * 900;
        let gst = (gold_rate + making_charges + diamond_cost)*0.03 
        let total_cost = gold_rate + making_charges + diamond_cost + gst;
        result.diamond_cost = diamond_cost;
        result.gold_rate = gold_rate;
        result.making_charges = making_charges;
        result.gst = gst;
        result.total_cost = total_cost;

        // for (i in JSON.parse(result[0].item_details)){
        //     ct =  (JSON.parse(result[0].item_details)[i].weight)/(JSON.parse(result[0].item_details)[i].quantity)
        //     let ct_wt = Number((ct).toFixed(2))
        //     console.log(Number((ct).toFixed(2)))
        //     price = await utilsDB.getPrice(ct_wt,quality,color);//pass ct
        //    console.log(price[0].price);
        //     cost[i] = price[0].price*(JSON.parse(result[0].item_details)[i].weight);
        //     quantity[i] = JSON.parse(result[0].item_details)[i].quantity;
        //     weight[i] = JSON.parse(result[0].item_details)[i].weight;
        // }
        // for (i in cost){
        //     total_cost = total_cost + cost[i];
        // }
        // total_cost = total_cost + (JSON.parse(result[0].gold_wt)*0.77*5000)/0.995//Gold Rates
        // if(result[0].gold_wt <= 4){
        //     make = 550;
        // } else if (result[0].gold_wt > 4 && result[0].gold_wt <= 8){
        //     make = 525;
        // } else if (result[0].gold_wt > 8 && result[0].gold_wt <= 15){
        //     make = 500;
        // } else {
        //     make = 450;
        // }
        // total_cost = total_cost + (JSON.parse(result[0].gold_wt)*make)//Making Charges
        // total_cost = total_cost + (total_cost*3)/100;//GST
        // let gold_cost = (JSON.parse(result[0].gold_wt)*0.77*5000)/0.995
        // result[0].diamond_details = {cost,weight,quantity,gold_cost};
        // result[0].quality = quality;
        // result[0].color = color;
        // result[0].total_cost = total_cost;
        //result.push(pricelist);
        return result;
    }
}
module.exports = Utils;