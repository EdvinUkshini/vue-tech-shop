<template>
        <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="black white--text text-center"
      >
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>TechShop</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>
<script>
export default {
    name:'Navbar'
}
</script>