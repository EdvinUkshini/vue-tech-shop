<template>
    <v-container>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text
            class=""
            tile
            outlined
          >
            <v-card-title class="subheading ">Peripherals</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <template v-for="item in Peripherals">
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" v-bind:key="item.name">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                >
                  <v-img
                    class="white--red align-end"
                    height="250px"
                    :src="getImage(item.imgpath)"
                  >
                  </v-img>
                    <v-card-title style="text-align:center;color:black;">{{item.name}}</v-card-title>
                  <v-card-text class="text--primary text-center">
                    <div>€{{ item.price }}</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn
                      :to="`/details/peripheral/${item._id}`"
                      class="ma-2"
                      outlined
                      color="info"
                    >
                      Explore
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
              </template>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import DataService from "../services/PeripheralDataService";
export default {
  data() {
    return {
      Peripherals: [],
    };
  },
  methods: {
    retrievePeripherals() {
      DataService.theLatest(4)
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
    }
  },
  mounted() {
    this.retrievePeripherals();
  }
};
</script>