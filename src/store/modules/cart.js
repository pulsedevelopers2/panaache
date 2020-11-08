import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios'
axios.defaults.timeout = 4000;
// initial state
const initialState = {
    cart: null,
    cartLoad: false,
    deleted: null
};
// getters
const getters = {
  getField
};

const actions = {
    async viewMyCart({ commit }, { token }) {
        commit('cartLoad','loading')
        try {
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        axios.post('http://localhost:8080/viewcart',null,{
            headers : {
                'Access-Control-Allow-Origin':'*',
                'token': tokenBody
            }
        }).then(function(response){
            if (response.status <= 299) {
                commit('cart',response.data)
                console.log(response.data)
                commit('cartLoad','loaded')
            } else {
                commit('cartLoad','failed')
            }
        })
    } catch(error) {
        commit('cartLoad','failed')
    }
},
    async deleteMyItem({ commit }, { id, token }) {
        commit('deleted',null)
        try {
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        axios.post(`http://localhost:8080/remove`,{ cart_id: id },{
            headers : {
                'Access-Control-Allow-Origin':'*',
                'token': tokenBody
            }
        }).then(function(response){
            if (response.status <= 299) {
                console.log('here')
                commit('deleted','true')
                commit('cart',response.data)
            } else {
                commit('deleted','failed')
            }
        })
    } catch (error) {
        commit('deleted','failed')
    }
    }
}
const mutations = {
    updateField,
    cart(state, cart) {
        state.cart = cart;
      },
      cartLoad (state, cartLoad) {
          state.cartLoad = cartLoad
      },
      deleted (state, deleted) {
          state.deleted = deleted
      }
  };

  export default {
    namespaced: true,       
    state: initialState,
    getters,
    actions,
    mutations
  };
