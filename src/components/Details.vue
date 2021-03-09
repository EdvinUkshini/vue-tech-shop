<template>
  <v-container>
              <v-alert @if="actionResponse" :type="actionResponseType">
            {{ actionResponseMessage }}
          </v-alert>
    <v-fade-transition mode="out-in">
      <v-row justify="center">

        <v-col cols="8">
          <v-card>
            <v-img
              :src="imgPath"
              height="250"
              class="white darken-4"
            ></v-img>
            <v-card-title class="title">
              {{product.name}}
            </v-card-title>
            <br />
            <v-card-text><strong>Description:</strong>{{product.description}}</v-card-text>
            <v-card-text><strong>Price:</strong> ${{product.price}}
            <v-divider />
             <v-btn
                outlined
                color="info"
                @click="addToCart(product)"
              >
                 <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>

</v-container>
</template>
<script>
import axios from 'axios'
import {mapGetters} from "vuex"
import { mapMutations } from "vuex";
  export default {
    data: () => ({
      imgPath:"",
      product:[],
      actionResponse:false,
      actionResponseType:null,
      actionResponseMessage:"",
    }), 

    methods: {

        getProduct(){
            axios
            .get(`http://localhost:4000/api/${this.$route.params.type}/${this.$route.params.id}`)
            .then(response => (this.product = response.data,
                              this.imgPath = require("../assets/images/products/"+response.data.imgpath)))
            .catch(e => { console.log(e);});
              },
                        ...mapMutations(["ADD_TO_CART"]),
          addToCart(product) {
            if(this.user.loggedIn){
            this.ADD_TO_CART(product);
            this.actionResponse = true;
            this.actionResponseType = "success"
            this.actionResponseMessage = "Item added to cart"
            }else{
            this.actionResponse = true;
            this.actionResponseType = "error"
            this.actionResponseMessage = "You're currently not logged in"
            }
          },

          },

         mounted () {
          this.getProduct();
         },
         computed:{
          ...mapGetters({
            user:"user"
          })
        },
  }
</script>