     <template>
      <v-bottom-navigation
        background-color="black"
        horizontal
      >
        <router-link to="/" class="navItem item">
          <span>Home</span>
        </router-link>
        <router-link to="/Computers" class="navItem item">
          <span>Computers</span>
        </router-link>
        <router-link to="/Laptops" class="navItem item">
          <span>Laptops</span>
        </router-link>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <a v-on="on" class="navItem item">
              <span>Parts</span>
            </a>
          </template>
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >

            <v-list-item
              v-for="(item, index) in items"
              :to="item.path"
              :key="index"
              href="/"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

          </v-card>
        </v-menu>
         <router-link to="/Peripherals" class="navItem item">
          <span>Peripherals</span>
        </router-link>
      </v-bottom-navigation>     
     </template>
     <style>
     .navItem{
        display: flex;
        color:#fff;
        background-color: transparent;
            border-radius: 0;
            box-shadow: none;
            flex: 0 1 auto;
            font-size: 0.75rem;
            height: inherit;
            max-width: 168px;
            min-width: 80px;
            position: relative;
            text-transform: none;
            align-items: center;
            justify-content: center;
            padding-right:5px;
            margin-bottom:5px;
     }
     .v-application a.item {
        color: #fff !important;
        text-align: center;
        text-decoration: none;
        font-size:17px;
        margin:0 5px;
        border-right:2px solid #00cc6a;
    }
    .v-application a:hover {
        color:#00cc6a !important;
    }
     </style>
<script>
    export default {
        name: 'Navbar',
        data () {
            return {
                items: [
                    { title: 'Cpu', path:'/Parts/1' },
                    { title: 'Ram', path:'/Parts/2'},
                    { title: 'Gpu', path:'/Parts/3'},
                    { title: 'Storage', path:'/Parts/4' },
                    { title: 'Motherboard', path:'/Parts/5'},
                ],
            }
        },
        
    }
</script>