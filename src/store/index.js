import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({  
  state: {
    user:{
      loggedIn:false,
      data:null,
      cart:[],
    }
  },
  getters:{
    user(state){
      return state.user
    },
    totalCartAmount(state){
      let totalAmount = 0
      state.user.cart.forEach(product => {
        totalAmount += product.price
      });
      return totalAmount
    }

  },
  mutations: {
    SET_LOGGED_IN(state,value){
      state.user.loggedIn=value;
    },
    SET_USER(state,data){
      state.user.data = data;
    },
    ADD_TO_CART: (state, product) => {
      state.user.cart.push(product)
      localStorage.setItem('cart', JSON.stringify(state.user.cart))
    },
    SET_CART_PRODUCTS: (state, products) => {
      state.user.cart = []
      state.user.cart = products
  },
  },
  actions: {
    fetchUser({commit},user){
      commit("SET_LOGGED_IN",user !== null);
      if(user){
        commit("SET_USER",{
            displayName:user.displayName,
            email:user.email
        });
        const products = JSON.parse(localStorage.getItem("cart"));
        if (products) {
          commit("SET_CART_PRODUCTS",products);
        }

      }else{
        commit("SET_USER",null);
        commit("SET_CART_PRODUCTS",null);
      }
    }
  },
  modules: {
  }
})
