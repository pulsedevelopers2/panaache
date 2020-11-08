import Vue from 'vue'
import './styles/main.css'
import store from './store/index'
import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false

Vue.$cookies.config('7d')

let routes = {
      '/': () => import('@/views/Home'),
      '/items': () => import('@/views/Items'),
      '/item': () => import('@/views/Item'),
      '/checkout': () => import('@/views/Checkout'),
      '/login': () => import('@/views/Login'),
      '/solitaireLD': () => import('@/views/Solitaire'),
      '/mycart': () => import('@/views/MyCart'),
      '/paynow': () => import('@/views/PayNow')
    }
new Vue({
  store,
  provide: {
    axios
  },
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || 'NotFound'
    }
  },
  render: function(h) { return h(this.ViewComponent)},
}).$mount('#app')
