import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase";

Vue.config.productionTip = false


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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
