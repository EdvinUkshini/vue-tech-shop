<template>
    <v-container>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text
            class=""
            tile
            outlined
          >
            <v-card-title class="subheading ">Desktops</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <template v-for="item in Pcs">
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
                      href="/shop"
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
import DataService from "../services/DataService"; // qekjo data service eshte veq per PCs
export default {
  data() {
    return {
      Pcs: [], // qe ky deklarohet array that niher
    };
  },
  methods: {
    retrievePcs() { // per mi marr veq 4 pcs mi qit nhome , dmth mi limitu mos me dal krejt aty
      DataService.theLatest(4) // kjo e thirr linkin funksionin the latest e ka linkin e vet dmth tani qato data qe i qet qe i pave ne browser
        .then(response => {
          this.Pcs = response.data; // Pcs array empty niher e mush me response data dmth response te linkit get it ye kqyre pa e ba import qat specific service line 64 nuk punon api
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
    this.retrievePcs();
  }
};
</script> 