<template>
  <span class="item_page row">
    <div class="row single_item col-xs-12">
      <!-- Images Display -->
      <div class="col-xs-12 main-image">
        <div class="image-wrapper"><img :src="curr_image"></div><br>
        <h4 class="main-title">
          {{ item.title }} with cutting edge super shinny diamonds
        </h4>
      </div>
      <div class="col-xs-12 col-md-6 sub-images row">
        <div v-for="(it,index) in item.image_link" :key="index" class="item col-xs-1" :class="pos==index?'red':''" @click="curr_image = it;pos=index">
          <img :src="it">
        </div>
      </div>

      <!-- Item Overview -->
      <div class="col-xs-12 details">
        <div class="dropdowns row">
          <div v-if="item.dqualities" class="quality dropper col-xs-12 col-sm-6">
            Quality:-<br>
            <select v-model="curr_quality" @change="refreshPrice()">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="quality in item.dqualities" :key="quality" :value="quality">
                {{ quality }}
              </option>
            </select>
          </div>
          <div v-if="item.dcolors" class="color dropper col-xs-12 col-sm-6">
            Color Quality:-<br>
            <select v-model="curr_color" @change="refreshPrice()">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="color in item.dcolors" :key="color" :value="color">
                {{ color }}
              </option>
            </select>
          </div>
          <div v-if="item.metal && item.metal.length" class="metal dropper col-xs-12 col-sm-6">
            Metal:- <br>
            <select v-model="curr_metal">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="it in item.metal" :key="it" :value="it">
                {{ it.toUpperCase() }}
              </option>
            </select>
          </div>
          <div v-if="item.gold_details && item.gold_details.length" class="size dropper col-xs-12 col-sm-6">
            Size:-<br>
            <select v-if="order_sizes" v-model="curr_size">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="it in item.gold_details" :key="it.size" :value="it.size">
                {{ it.size }}
              </option>
            </select>
          </div>
        </div>
        <span class="order-basis" />
        <h2 class="pricing">
          ₹ {{ (pricing && goldPricingJson) && Math.round(pricing.diamond_cost + (goldPricingJson[curr_size].price/0.77)*purity[curr_metal && curr_metal.toUpperCase() || 'default'] + pricing.making_charges + ((pricing && goldPricingJson) && pricing.diamond_cost + (goldPricingJson[curr_size].price/0.77)*purity[curr_metal && curr_metal.toUpperCase() || 'default'] + pricing.making_charges)*0.05) }}/-
        </h2>
        <h5 class="pricing">Unbeatable price Guranteed! Compare the price anywere </h5>
        <div class="purchase col-xs-12 row">
          <button class="purchase-button col-xs-6" @click="checkout()">
            BUY
          </button>
          <button class="purchase-button col-xs-6" @click="updateCart()">
            Add to Cart
          </button>
        </div>
      </div>
      <div class="details-wrapper col-xs-12">
        <h4> Description</h4>
        <h6>
          <!-- {{ item.description }} -->
          This is the description of the project that will be displayed in justified format and clean texture giving simple and rich design format.
        </h6>
      </div>
      <div class="intro col-xs-12 row">
        <img :src="curr_image" class="col-xs-12 col-md-5">
        <div class="intro-text col-xs-12 col-md-6">
          <h2>Panaache Jewlz</h2>
          <h5> Make every movement glamoures with Jewlz from house of Panaache. Panaache Jewlz are crafted from world class machinary and expert Craftmens that aim to deliver Perfection. Try a Jewelz from house of Panaache and make every Occasion count.</h5>
        </div>
      </div>
    </div>
    <div class="charts col-xs-12">
      <div class="specification-title col-xs-12 row">
        <p class="title col-xs-12">
          Item Details
        </p>
        <tr class="divider col-xs-12" />
        <p class="specification col-xs-12">
          <span class="chart_title col-md-2 col-xs-6">Gold Weight</span><span class="value col-md-2 col-xs-6">: {{ goldPricingJson && goldPricingJson[curr_size].weight || 'Error' }} gms</span>
        </p>
        <p class="specification col-xs-12">
          <span class="chart_title col-md-2 col-xs-6">Diamond weight</span><span class="value col-md-2 col-xs-6">: {{ total_crt || 'Error' }} ct</span>
        </p>
        <p class="specification col-xs-12">
          <span class="chart_title col-md-2 col-xs-6">total weight</span><span class="value col-md-2 col-xs-6">: {{ Math.round((total_crt/5 + (goldPricingJson && goldPricingJson[curr_size].weight || null))*1000)/1000 }} gms</span>
        </p>
      </div>
    </div>
    <h4 class="title col-xs-12">
      Price Breakup
    </h4>

    <table v-if="item && pricing" class="chart_table">
      <tr class="table_heading row">
        <th class="col-xs-3"><h6>Components</h6></th>
        <th class="col-xs-3"><h6>Type</h6></th>
        <th class="col-xs-3"><h6>Weight</h6></th>
        <th class="col-xs-3"><h6>Price</h6></th>
      </tr>
      <tr class="table_data row">
        <td class="col-xs-3"><h6>Gold Metal</h6></td>
        <td class="col-xs-3"><h6>{{ curr_metal && (curr_metal + " (" + purity[curr_metal.toUpperCase()]*100 + "%purity )") || (purity['default'] + "%purity") }}</h6></td>
        <td class="col-xs-3"><h6>{{ goldPricingJson && goldPricingJson[curr_size].weight || 'Error' }} gms</h6></td>
        <td class="col-xs-3"><h6>{{ goldPricingJson && Math.round((goldPricingJson[curr_size].price/0.77)*purity[curr_metal && curr_metal.toUpperCase() || 'default'] * 100)/100 || 'Error' }}/-</h6></td>
      </tr>
      <tr class="table_data row">
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3" />
      </tr>
      <tr v-for="diamond in pricing.item_details" :key="diamond.weight" class="table_data row">
        <td class="col-xs-3"><h6>Diamond</h6></td>
        <td class="col-xs-3"><h6>{{ curr_quality + ' ' + curr_color }}</h6></td>
        <td class="col-xs-3"><h6> {{ diamond.weight + ' ct (' + diamond.quantity + ') ' }}</h6></td>
        <td class="col-xs-3"><h6> {{ diamond.price }}/- </h6></td>
      </tr>
      <tr class="table_data row">
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3" />
      </tr>
      <tr class="table_data row charges">
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3"><h6>Making Charges</h6></td>
        <td class="col-xs-3"><h6>{{ pricing.making_charges }}/-</h6></td>
      </tr>
      <tr class="table_data row">
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3"><h6>GST & Transaction Charges</h6></td>
        <td class="col-xs-3"><h6>{{ Math.round((pricing.diamond_cost + (goldPricingJson[curr_size].price/0.77)*purity[curr_metal && curr_metal.toUpperCase() || 'default'] + pricing.making_charges)*0.05) }}/-</h6></td>
      </tr>
      <tr class="table_data row total">
        <td class="col-xs-3" />
        <td class="col-xs-3" />
        <td class="col-xs-3">Total</td>
        <td class="col-xs-3">{{ Math.round(pricing.diamond_cost + (goldPricingJson[curr_size].price/0.77)*purity[curr_metal && curr_metal.toUpperCase() || 'default'] + pricing.making_charges + (pricing.diamond_cost + (goldPricingJson[curr_size].price/0.77)*purity[curr_metal && curr_metal.toUpperCase() || 'default'] + pricing.making_charges)*0.05) }}/-</td>
      </tr>
    </table>
  </span>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios'
export default {
    data() {
        return {
            curr_image : null,
            curr: '',
            curr_metal: null,
            curr_size: null,
            curr_color: null,
            curr_quality: null,
            cartUpdated: false,
            errorCart: false,
            pos: 0,
            goldPricingJson: null,
            purity: {
              "default": 0.77,
              "ROSE GOLD": 0.76,
              "YELLOW GOLD": 0.76,
              "WHITE GOLD": 0.77
            }
        }
    },
    computed: {
        ...mapState({
            item: state => state.item.item,
            pricing: state => state.item.pricing,
            token: state => state.login.token,
            added: state => state.item.added
        })
    },
    async created(){
        this.total_crt = Math.round(this.item.item_details.reduce((total, curr) => {return total + curr.weight},0)*1000)/1000;
        this.curr_image = this.item.image_link[0];
        this.curr_metal = this.item.metal && this.item.metal[0] || null;
        this.curr_size = this.item.gold_details && this.item.gold_details[0].size || null;
        this.avail_sizes = this.item.gold_details.map(item => {return item.size})
        this.order_sizes = this.item.sizes;
        this.curr_color = this.item.dcolors && this.item.dcolors[0] || null;
        this.curr_quality = this.item.dqualities && this.item.dqualities[0] || null;
        let body = {
            item_id: this.item.id,
            d_quality: this.curr_quality,
            d_color: this.curr_color
          }
          let tok = this.token; 
          await this.getPricing({body, tok})
        this.goldPricingJson = this.pricing && this.pricing.gold_details.reduce((prev, curr) => {
          prev[curr.size] = curr;
          return prev;
        },{})
    },
    methods: {
        ...mapActions({
            getPricing: 'item/getPricing',
            addToCart: 'item/addToCart',
            resetCartAdd: 'item/resetCartAdd'
        }),
        async refreshPrice(){
          let body = {
            item_id: this.item.id,
            d_quality: this.curr_quality,
            d_color: this.curr_color
          }
          let tok = this.token;
          await this.getPricing({body, tok})
        },
        async updateCart(){
          let body = {
            item_id: this.item.id || null,
            quality: this.curr_quality || null,
            color: this.curr_color || null,
            size: this.curr_size || null,
            metal: this.curr_metal || null,
            quantity: 1
          }
          let tempToken = this.token;
          await this.addToCart({ body, tempToken });
          if (this.added) {
            setTimeout(() => { this.resetCartAdd();}, 1000);
            alert('cart update success')
          } else {
            setTimeout(() => { this.resetCartAdd();}, 1000);
            alert('cart update failed !!!')
          }
        },
        async checkout() {
          let body = {
            item_id: this.item.id || null,
            quality: this.curr_quality || null,
            color: this.curr_color || null,
            size: this.curr_size || null,
            metal: this.curr_metal || null,
            quantity: 1
          }
          let tempToken = this.token;
          await this.addToCart({ body, tempToken });
          if (this.added) {
            this.resetCartAdd();
            window.location.href = '/mycart';
          } else {
            this.resetCartAdd();
          }
        }
    }
}
</script>
<style scoped>
.single_item {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.details {
    padding-top: 10px;
    padding-bottom: 10px;
}
.purchase {
    margin: 0px;
    padding: 3%;
}
.purchase :nth-child(2){
    background-color: transparent;
    padding: 1%;
    border: 2px solid rgb(90, 4, 4);
}
.purchase :nth-child(1){
    background: linear-gradient(45deg,rgb(90, 4, 4), rgb(133, 36, 36), rgb(138, 54, 54), rgb(124, 34, 34), rgb(90, 4, 4));
    background-size: cover;
    padding: 1%;
    border: 2px solid rgb(90, 4, 4);
}
.red{
    background-color: rgb(12, 12, 12) !important;
}
.order-basis {
    font-size: 150%;
}
select {
    width: 100%;
    background-color: black;
    color: white;
    margin: 0;
    padding: 2%;;
    border: 0px;
    border-bottom: 0.5px solid white;
    outline: none;
}
.title {
  justify-content: center;
  text-align: center;
}
.main-title{
    width: 100vw;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    padding: 2%;
    margin: 0;
  text-align: center;
}
.pricing {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 1%;
}
.dropper {
    padding: 1%;
}

.details-wrapper {
  min-width: 100%;
  overflow-wrap: break-word;
  text-align: center !important;
  padding: 2% 10% 5% 10%;
}
.details-wrapper h4, .details-wrapper {
  display: block;
}
.details-wrapper h6 {
  text-align: justify;
  text-align-last: center;
  justify-content: center;
  text-justify: inter-word;
}
.dropdowns {
    padding: 0;
    margin: 0;
}
.main-image {
    height: 50vh;
    background: linear-gradient( rgb(0, 0, 0), rgb(19, 19, 19) 200%);
    display: block;
    width: 100vw;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
}
.image-wrapper img {
    object-fit: cover;
    max-width: 50%;
    max-height: 50%;
}
.image-wrapper {
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
   height: 7vh;
   min-width: 20%;
   background-color: rgb(0, 0, 0);
   overflow-x:auto;
   display: flex;
   align-items: center;
   justify-content: center;
   border-bottom: 1px solid rgb(117, 76, 76);
}
.item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}
.sub-images {
    margin: 0px;
    width: 100%;
    margin-bottom: 1%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.charts {
    width: 100%;
    margin-top: 4vh;
    margin-bottom: 4vh;
}
.divider {
    background-color: maroon;
    width: 100%;
}
.specification {
    padding-top: 2vh;
    font-size: 75%;
}
.specification-title {
    font-size: 130%;
}
.table_heading, .table_heading th, .table_data td, .table_data{
  overflow: hidden !important;
  text-align: left;
  padding: 1%;
  padding-left: 0%;
  padding-right: 0%;
  margin: 0;
}
.table_heading, .table_data, .chart_table{
  width: 100%;
}
.chart_table {
  border: 1px solid maroon;
  background: linear-gradient(black 0%, rgb(14, 14, 14) 200%);
  box-shadow: inset 0px 0px 5px 0px black;
}
.table_data td {
  overflow-wrap: break-word;
}
.table_data td {
  word-break:break-all;
  border-right: 1px solid maroon;
}
.table_heading th {
  border-bottom: 1px solid maroon;
  border-right: 1px solid maroon;
}
th, td {
  padding: 1% !important;
  width: 25% !important;
  max-width: 25%;
  overflow-wrap: break-word;
}
.total {
  border-top: 1px solid maroon;
}
.charges {
  border-top: 1px solid maroon;
}
.intro {
  justify-content: center;
  padding: 2%;
  align-items: center;
  /* border-top: 1px solid maroon;
  border-bottom: 1px solid maroon; */
  background: linear-gradient(90deg, black 0% , rgb(24, 4, 4)40%, black 130%);
  margin-top: 1%;
  margin-bottom: 5%;
}
.intro img {
  height: 30vh;
  object-fit: contain;
}
.intro-text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: justify;
}
.intro-text h5 {
  font-size: 120%;
}
</style>  