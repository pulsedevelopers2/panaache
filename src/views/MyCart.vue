<template>
  <div class="mycart-wrapper row">
    <nav-bar />
    <SideNav />
    <h3 v-if="cart && cart.length" class="col-xs-12">
      MY CART
    </h3>
    <h3 v-if="(!cart || !cart.length) && cartLoad!='loading'" class="col-xs-12">
      Cart Empty
    </h3>
    <img v-if="cartLoad == 'loading' && loggedIn == 'true'" src="../assets/loader.gif" class="loading-block">
    <div v-if="cart && cart.length" class="cart-items col-xs-12 col-md-8 row">
      <div v-for="item in cart" :key="item.id" class="item col-xs-12">
        <a :href="'/item?&item=' + item.item_id" class="item_link row">
          <img :src="item.image_link[0]" class="item_image col-xs-12 col-md-2">
          <span class="item_details col-xs-12 col-md-10 row">
            <h4 class="col-xs-12">{{ item.title }}</h4>
            <span class="col-xs-10">
              <h5>Quality: <span class="pink">{{ item.quality }}</span>, Color: <span class="pink">{{ item.color }}</span>, size: <span class="pink">{{ item.size }}</span>, metal: <span class="pink">{{ item.metal }}</span></h5>
              <h5>Quantity: <span class="pink">{{ item.quantity }}</span></h5>
              <h5><b>₹ {{ item.finalPrice }}/-</b></h5>
            </span>
            <span class="col-xs-12 col-md-2">
              <button class="delete" @click="deleteMe($event, item.cart_id)">Delete</button>
            </span>
          </span> 
        </a>
      </div>
    </div>
    <div v-if="cart && cart.length" class="invoices-wrapper col-xs-12 col-md-4 row">
      <span class="total-invoices col-xs-12 row">
        <h3 class="total col-xs-12">
          Quotation
        </h3>
        <div class="col-xs-12 total-details row">
          <h4 class="col-xs-6">
            Number of Items
          </h4>
          <h4 class="col-xs-6">
            : {{ noOfItems }}
          </h4>
          <h4 class="col-xs-6">
            Total Cost
          </h4>
          <h4 class="col-xs-6">
            : {{ total }}/-
          </h4>
          <h4 class="col-xs-6 grey">
            Discount
          </h4>
          <h4 class="col-xs-6 grey">
            : 0/-
          </h4>
          <tr class="divider col-xs-12" />
          <h4 class="col-xs-6">
            Grand Total
          </h4>
          <h4 class="col-xs-6">
            : {{ total }}/-
          </h4>
          <p class="col-xs-12 inclusive">** Price inclusive of GST **</p>
        </div>
      </span>
      <button class="checkout col-xs-4">
        CHECKOUT
      </button>
    </div>
  </div>
</template>
<script>
import {mapAction, mapActions, mapState} from 'vuex';
import NavBar from '../NavBar.vue'
import SideNav from '../components/SideNav'
export default {
    components: {
        NavBar,
        SideNav
    },
    computed: {
        ...mapState({
            loggedIn: state => state.login.loggedIn,
            cart: state => state.cart.cart,
            cartLoad: state => state.cart.cartLoad,
            token: state => state.login.token
        })
    },
    watch: {
        loggedIn: async function(curr, prev) {
            if (curr == 'true' && prev != 'true') {
                let tt = this.token
                await this.viewMyCart({ tt });
            }
        },
        cart: async function(curr, prev) {
            if (curr) {
                this.refreshCart();
            }
        }
    },
    async created() {
        await this.cachedVerify();
        if (this.loggedIn == 'true') {
            let tt = this.token
            await this.viewMyCart({ tt });
            this.refreshCart()
        }
    },
    methods: {
        ...mapActions({
            viewMyCart: 'cart/viewMyCart',
            cachedVerify: 'login/cachedVerify',
            deleteMyItem: 'cart/deleteMyItem'
        }),
        refreshCart(){
            this.total = this.cart.reduce((prev, curr) => { return prev + curr.finalPrice }, 0);
            this.noOfItems = this.cart.length;
        },
        async deleteMe(e,id) {
            e.preventDefault()
            let token = this.token;
            await this.deleteMyItem({id, token});
            this.refreshCart()

        }
    }
}
</script>
<style scoped>
.mycart-wrapper, .mycart-wrapper h3 {
    display: inline-block;
    justify-content: center;
    text-align: center;
    width: 100%;
    padding: 1%;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
}
.mycart-wrapper::-webkit-scrollbar {
    display: none;
}
.mycart-wrapper h3 {
    padding: 1%;
}
.item a {
    color: white;
    text-decoration: none;
    cursor: pointer;
    height: 20vh;
    width: 100%;
}
.item a img {
    max-height: 10vh;
    object-fit: contain;
}
.pink {
    color: rgb(255, 130, 130);
}
.item_details {
    text-align: left;
}
.item {
    border: 1px solid rgb(156, 111, 108);
    background: linear-gradient(45deg, black, rgb(27, 27, 27) 200%);
    padding: 2vh;
}
.total-invoices {
    border: 1px solid rgb(158, 113, 109);

}
.delete {
    border: 1px solid rgb(158, 113, 109);
    display: inline-block;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
}
.total-invoices {
    justify-content: center;
    text-align: center;
}
.total-details {
    text-align: left;
    padding: 5%;
}
.total {
    border-bottom: 1px solid rgb(158, 113, 109);
}
.invoices-wrapper .checkout {
    margin-top: 1%;
    padding: 4%;
    margin-bottom: 1%;
}
.divider {
    width: 100%;
    border: 1px solid rgb(158, 113, 109);
}
.total-details h4 {
    min-height: 70px;
}
.checkout {
    border: 1px solid rgb(158, 113, 109);
    display: inline-block;
    text-decoration: none;
    background-color: rgb(158, 113, 109);
    outline: none;
    padding: 5px;
    width: 100%;
}
.inclusive {
    text-align: center;
}
@media screen and (orientation: portrait){
    h5, h6 {
        font-size: 80%;
    }
    .invoices-wrapper {
        margin-top: 1%;
    }
}
</style>