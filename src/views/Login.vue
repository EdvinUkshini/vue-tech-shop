<template>
    <div>
        <v-container>
            <v-row>
               <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :counter="10"
            label="Email"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            type="password"
            v-model="password"
            :counter="10"
            label="Password"
            required
          ></v-text-field>
        </v-col>
        <button @click="login">Login</button>
        <p>Need an account?</p> <router-link to="/signup">Sign Up</router-link>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
    name: "Login",
    data(){
        return{
            email:"",
            password:""
        }
    },
    methods:{
        login:function(){
            //Log the user in
            firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                user => {
                    console.log(user.data)
                },
                err =>{
                    alert(err);
                }
            )
        }
    }
};
</script>
<style lang="scss" scoped>

</style>