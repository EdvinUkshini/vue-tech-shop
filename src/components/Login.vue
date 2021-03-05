<template>
    <v-dialog
      v-model="Login"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, Login }">
        <v-btn
          dark
          v-bind="Login"
          v-on="on"
        >
          Log In
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Log In</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                    <v-alert v-show="SignInError" type="error">
                    {{SignInErrorMessage}}
                    </v-alert>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="Login = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="SignIn"
          >
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import firebase from 'firebase'
  export default {
    data: () => ({
      Login: false,
      email:"",
      password:"",
      SignInError:false,
      SignInErrorMessage:"",
    }),
    methods:{
        SignIn:function(){

            firebase
            .auth()
            .signInWithEmailAndPassword(this.email,this.password)
            .then(data=>{
            this.$emit('LogInClick');
            this.Login = false;
            this.$router.push("/").catch(()=>{});
            })
            .catch(err=>{
            this.SignInError = true;
            this.SignInErrorMessage = err;
            });
        }

        },
  }
</script>