<template>
<div>
    
        Email:<br>
        <input type="email" name="email" value required autofocus autocomplete v-model="email"/>
        <br />Password:<br>
        <input type="password" name="password" required v-model="password"/>
        <br />
        <button @click="Login">Login</button>
</div>
</template>
<script>
import firebase from 'firebase'
  export default {
    data(){
      return{
        email:"",
        password:""
      };
    },
    methods:{
        Login:function(){
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email,this.password)
            .then(data=>{
                this.$router.push({name:"Home",})
            })
            .catch(err=>{
                alert(err);
            });
        }
        
    }
}
</script>