<template>
  <div class="spacer">
  <div class="login">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
<div>
  <b-input-group
    class="mb-2"
    prepend="Email"
    size="lg"
  >
    <b-form-input
          id="input-1"
          v-model="form.email"
          placeholder="your email"
          required
    ></b-form-input>
  </b-input-group>
</div>
<div>
  <b-input-group
    class="mb-2"
    prepend="Name"
    size="lg"
  >
    <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="your name"
          required
    ></b-form-input>
  </b-input-group>
</div>

      <b-button type="submit" variant="outline-success">Submit</b-button>
      <b-button type="reset" variant="outline-danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
  </div>
</template>
<style>
.spacer{
  margin:20px;
}
.login {
  margin: auto;
  width: 25%;
  border: 3px solid #00cc6a;
  padding: 10px;
}
.input-group-text {
    color: #fff !important;
    background-color: #00cc6a !important;
}
.v-application .mb-2 {
    margin: 30px 0;
}
@media only screen and (max-width: 1000px) {
.login {
  width:100%;
}

}
</style>
<script>
import firebase from 'firebase'
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
}
</script>
