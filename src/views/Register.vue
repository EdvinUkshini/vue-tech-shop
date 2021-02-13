<template>
<div>
    <p v-if="error">{{ error }}</p>
        Name:<br>
        <input
           name="name"
           type="text"
           value required autofocus v-model="name"
        />
        <br />Email:<br>
        <input
           name="email"
           type="email"
           value required autofocus v-model="email"
        />
        <br />Password:<br>
        <input
           name="password"
           type="password"
           value required autofocus v-model="password"
        />
        
        <br />
        <button @click="Register">Register</button>
</div>
</template>
<script>
import firebase from 'firebase'
  export default {
    data(){
      return{
        name:"",
        email:"",
        password:""
      };
    },
    methods:{
        Register:function(){
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email,this.password)
            .then(data=>{
                data.user.updateProfile({
                    displayName:this.name
                })
                .then(() => {});
            })
            .catch(err=>{
                alert(err);
            });
        }
        
    }
}
</script>