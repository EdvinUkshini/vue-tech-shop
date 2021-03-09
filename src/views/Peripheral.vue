<template>
  <div>
    <v-container>
      <div class="row">
        <div
         class="col-md-3 col-sm-3 col-xs-12"
        >
                   <v-card outlined>
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="items" :open="[1]" :active="[5]" :selected-color="'#fff'" activatable open-on-click dense>
                    <template slot="label" slot-scope="{ item }">
                      <a @click="filterByManufacturer(item.value)">{{ item.name }}</a>
                    </template>
              </v-treeview>
            </template>
            <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
              @change="RangeChange"
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  v-model="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                  @click="RangeChange"
                  @input="RangeChange"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  v-model="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                  @click="RangeChange"
                  @input="RangeChange"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >
          <v-alert @if="actionResponse" :type="actionResponseType">
            {{ actionResponseMessage }}
          </v-alert>
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing {{ Peripherals.length }} products</small>
            </v-col>

          </v-row>

          <v-divider></v-divider>

          <div class="row text-center">
            <template v-for="item in Peripherals">
            <div class="col-md-3 col-sm-6 col-xs-12" v-bind:key="item.name">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                  
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="getImage(item.imgpath)"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                    <v-btn
                      outlined
                      color="info"
                      @click="addToCart(item)"
                     >
                       <v-icon>mdi-cart</v-icon>
                     </v-btn>

                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div><a href="" style="color:#00cc6a;text-decoration: none">{{item.name}}</a></div>
                    <div>${{item.price}}</div>
                  </v-card-text>
                <v-card-actions>
                  <router-link :to="`/details/peripheral/${item._id}`" style="color:#00cc6a;">Details</router-link> 
                </v-card-actions>
                </v-card>
              </v-hover>
            </div>
            </template>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
  .v-card__title{
    font-size:initial;
    margin:20px;
  }
  .v-application .pa-2 {
    padding: 25px !important;
  }
  .v-treeview-node__level{
    width:10px;
  }
  .v-application--is-ltr .v-treeview-node__content {
    margin-left:0 !important;
  }
  .v-treeview-node__root {
    padding-left: 0 !important;
    padding-right: 0 !important;
    min-height: 40px;
    margin: 4px 0;
    font-size: 14px;
  }
  .v-treeview-node__label {
    white-space:normal !important;
  }
  .container{
    margin-top:30px;
    margin-bottom:30px;
  }
</style>
<script>
import {mapGetters} from "vuex"
import { mapMutations } from "vuex";
import DataService from "../services/PeripheralDataService";
    export default {
        data: () => ({
            range: [0, 10000],
            breadcrums: [
                {
                    text: 'Home',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Peripherals',
                    disabled: true,
                    href: 'Peripherals',
                },
            ],
            min:0,
            max:10000,
            items: [
                {
                    id: 1,
                    name: 'Manufacturer',
                    children: [],
                }
            ],
            Peripherals: [],
            type:0,
            product: new Object(),
            actionResponse:false,
            actionResponseType:null,
            actionResponseMessage:"",
        }),
         methods: {
            retrievePeripherals() {
              DataService.getAll(this.type,this.range[0],this.range[1])
                .then(response => {
                  this.Peripherals = response.data;
                  const Manufacturers = response.data.map(item => ({
                      id: item._id,
                      name: item.manufacturer,
                      value: item.manufacturer
                  }));
                  this.items[0].children = Manufacturers;
                })

            .catch(e => {
             console.log(e);
            });
          },
          filterByManufacturer(item)
            {
              DataService.findByManufacturer(item)
                .then(response => {
                  this.Peripherals = response.data;
                  console.log(response.data);
                })
              .catch(e => {
              console.log(e);
              });
            },
          getImage(path) {
            return require("../assets/images/products/"+path)
          },
          RangeChange(){
            this.retrievePeripherals();
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
        mounted() {
          this.retrievePeripherals();
        },
        computed:{
          ...mapGetters({
            user:"user"
          })
        },
    }
</script>