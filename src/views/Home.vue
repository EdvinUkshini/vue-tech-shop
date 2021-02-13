<template>
  <div>
    <template v-if="user.loggedIn">
        {{user.data.email}}
        <button @click="signOut">Sign Out</button>
    </template>
    <template v-else>

    </template>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import firebase from 'firebase'
export default {
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