<template>
<div>
  <Slideshow />
  <Pc/>
  </div>
</template>
<style>
.card__text, .v-card__title {
    padding:0 !important;
}
</style>
<script>
import {mapGetters} from "vuex"
import firebase from 'firebase'
import Slideshow from '../components/Slideshow'
import Pc from '../components/Pc'

export default {
  components:{
    Slideshow,
    Pc,
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