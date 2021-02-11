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
        <button @click="SignUp">Sign Up</button>
        <p>Have an account?</p> <router-link to="/Login">Log In</router-link>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
    name: "SignUp",
    data(){
        return{
            email:"",
            password:""
        }
    },
    methods:{
        SignUp:function(){
            //Log the user in
            firebase.auth()
            .createUserWithEmailAndPassword(this.email,this.password)
            .then(
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