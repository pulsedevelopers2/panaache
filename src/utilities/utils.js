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
        result = this.purifyItems(result)
        var metal = null;
        var fashion = null;
        if(JSON.parse(result[0].metal)){
            metal = await this.getMetals(id);
        }
        if(JSON.parse(result[0].fashion)){
            fashion = await this.getFashion(id)
        }
        let stock = await this.getStock(id);
        result.push({metal : metal},{fashion : fashion},{stock : stock})
       // console.log(result[1].metal)
        //console.log(JSON.parse(result[0].metal))
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
}
module.exports = Utils;