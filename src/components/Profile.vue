<template>
<div>
   <v-row justify="center">
    <v-dialog
      v-model="Profile"
      max-width="350px"
    >
      <template v-slot:activator="{ on, Profile }">
        <v-btn
          icon
          v-bind="Profile"
          v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Profile</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="margin:20px 0px;">
          <v-row justify="center">
          <template v-if="user.loggedIn">
            <v-btn dark @click="SignOut"> Sign Out</v-btn>
            <div id="buttonSpacer" />
            <v-btn color="#00cc6a" dark>My Orders</v-btn>
          </template>
          <template v-else>
              <Login @LogInClick="Profile=false"/>
              <div id="buttonSpacer" />
              <Register @SignUpClick="Profile=false"/>
            </template>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="Profile = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>
<style>
.v-dialog {
    overflow-y:unset !important;
}
.v-dialog--scrollable > .v-card > .v-card__text, .v-dialog--scrollable > form > .v-card > .v-card__text {
    overflow-y:unset !important;
}
#buttonSpacer{
  margin:20px;
}
</style>
<script>
import {mapGetters} from "vuex"
import firebase from 'firebase'
import Login from "../components/Login"
import Register from "../components/Register"
   export default {
        name: 'Header',
        components:{
          Login,
          Register,
        },
        data () {
          return {
            Profile: false,
            }
        },
        computed:{
          ...mapGetters({
            user:"user"
          })
        },
        methods:{
         SignOut:function(){
          this.Profile = false;
          firebase
          .auth()
          .signOut()
          .then(()=>{
            this.$router.push("/").catch(()=>{});
          })
        }
      }, 
    }
</script>