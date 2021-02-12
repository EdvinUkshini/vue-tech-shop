<template>
  <v-app id="inspire">
    <Header />
    <v-main>
      <Navbar />
    <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
    import Header from './Header.vue'
    import Navbar from './Navbar.vue'
    import Footer from './Footer.vue'
    export default {
        name: 'Layout',
        components:{
          Header,
          Navbar,
          Footer
        },
    }
</script>
