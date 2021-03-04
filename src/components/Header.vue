    <template>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="black"
      dark
    >
      <v-toolbar-title
        style="width: 350px"
      >
        <a href="/" class="white--text" style="text-decoration: none"><v-icon>mdi-cart</v-icon>&nbsp;TechShop</a>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <Cart />
    </v-app-bar>
    </template>

<script>
  import Cart from './Cart.vue'
   export default {
        name: 'Header',
        components:{
          Cart,
          
        },
    }
    

  
</script>
