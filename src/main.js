import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import 'core-js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


const settings = {timestampsInSnapshots:true};
const configOptions = {
  apiKey: "AIzaSyAupUgl4zyTOcKsc3NQFO20_Hl2jJ4IxnQ",
  authDomain: "techshop-8ae54.firebaseapp.com",
  projectId: "techshop-8ae54",
  storageBucket: "techshop-8ae54.appspot.com",
  messagingSenderId: "958328967539",
  appId: "1:958328967539:web:8147a0e425d9f6d681b506",
  measurementId: "G-NYLNZCE5DW"
};

firebase.initializeApp(configOptions);
firebase.firestore().settings(settings);
firebase.auth().onAuthStateChanged(user=>{
  store.dispatch("fetchUser",user);
});
firebase.getCurrentUser = ()=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
      unsubscribe();
      resolve(user);
    },reject);
  })
};
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
