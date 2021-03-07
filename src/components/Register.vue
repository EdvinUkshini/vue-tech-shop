<template>
    <v-dialog
      v-model="Register"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, Register }">
        <v-btn
          color="#00cc6a"
          dark
          v-bind="Register"
          v-on="on"
        >
          Sign Up
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                    <v-alert v-show="SignUpError" type="error">
                    {{SignUpErrorMessage}}
                    </v-alert>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
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
            @click="Register = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="SignUp"
          >
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import firebase from 'firebase'
  export default {
    data: () => ({
      Register: false,
      name:"",
      email:"",
      password:"",
      SignUpError:false,
      SignUpErrorMessage:"",
    }),
    methods:{
        SignUp:function(){
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email,this.password)
            .then(data=>{
                this.$emit('SignUpClick');
                data.user.updateProfile({
                    displayName:this.name
                })
                .then(() => {});
            })
            .catch(err=>{
              this.SignUpError=true;
              this.SignUpErrorMessage=err;
            });
        },

        },
  }
</script>