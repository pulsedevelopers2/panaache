
import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login';
import items from './modules/items';
import item from './modules/item';
import cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    items,
    item,
    cart
  },
  strict: true
});