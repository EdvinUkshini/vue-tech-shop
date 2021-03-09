<template>
  <div class="dropdown" style="min-width:320px;right:0; left:auto">
    <template v-if="((user.cart) && (user.cart.length>0))">
           <hr />
      <div style="overflow:scroll;overflow-x: hidden;max-height:400px;">
      <div
        v-for="(item, index) in user.cart"
        :key="index"
      >
      <div class="px-2 d-flex justify-content-between"
      >
                          <img
                    height="80px"
                    width="80px"
                    :src="getImage(item.imgpath)"
                    alt=""
                  />

        <div>
          <strong>{{item.name}}</strong>
          <br />
          1 x ${{item.price}}
        </div>
        <div>
            <a
              @click="removeFromCart(item)"
            >Remove</a>
        </div>
      </div>
      <hr />
      </div>
      </div>
      <strong>Total amount:</strong> $ {{totalCartAmount}} 
  </template>
  <template v-else>
    <hr />
       <div class="px-2 d-flex justify-content-between">
        <div>
          <strong>Cart is empty</strong>
          <br />
          Add new products in cart
        </div>
      </div>
      <hr />

  </template>

  </div>

</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "MiniCart",
  data() {
    return {
      totalValue: 0,
    };
  },
  computed: 
  {
    ...mapState(["user"]),
    ...mapGetters(['totalCartAmount'])

  },
  methods: {
    ...mapMutations(["SET_CART_PRODUCTS"]),
    
    removeFromCart(product) {
      const products = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id === product._id) {
          products.splice(i, 1);
        }
      }
      this.$store.commit("SET_CART_PRODUCTS",products);
      localStorage.setItem("cart", JSON.stringify(products));

    },
    getImage(path) {
      return require("../assets/images/products/"+path)
    },
  },
};
</script>