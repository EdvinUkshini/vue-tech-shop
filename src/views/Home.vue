<template>
<div>
  <Slideshow />
  <Pc/>
  <Laptop/>
  </div>
</template>
<style>
.card__text, .v-card__title {
    padding:0 !important;
}
.v-card__title {
    display: inline !important;
    line-height:0 !important;
}
.container{
  padding:0 !important;
}
</style>
<script>
import {mapGetters} from "vuex"
import firebase from 'firebase'
import Slideshow from '../components/Slideshow'
import Pc from '../components/Pc'
import Laptop from '../components/Laptop'

export default {
  components:{
    Slideshow,
    Pc,
    Laptop
  },
  computed:{
    ...mapGetters({
      user:"user"
    })
  },
  methods:{
    signOut:function(){
      firebase
      .auth()
      .signOut()
      .then(()=>{
        this.$router.replace({
          name:"Home"
        })
      })
    }
  }
  
}
</script>