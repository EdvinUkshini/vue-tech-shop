<template>
  <div class="edit-form">
    <h4>PC</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="imgpath"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="name"
        />
      </div>
    </form>
    <button class="badge badge-primary mr-2"
      @click="Add()"
    >
      Add
    </button>
    <p></p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "PC",
  data() {
    return {
      imgpath: '',
      name: ''
    };
  },
  methods: {
    Add() {
      var data = {
        imgpath: this.imgpath,
        name: this.name
      };

      DataService.create(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>