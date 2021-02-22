<template>
  <div class="container">
      <div class="form-group">
        <label for="Type">Type</label>
        <input type="number" class="form-control" id="Type"
          v-model="type"
        />
      </div>
      <div class="form-group">
        <label for="Manufacturer">Manufacturer</label>
        <input type="text" class="form-control" id="Manufacturer"
          v-model="manufacturer"
        />
      </div>
      <div class="form-group">
        <label for="Name">Name</label>
        <input type="text" class="form-control" id="Name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="Description">Description</label>
        <input type="text" class="form-control" id="Description"
          v-model="description"
        />
      </div>
      <div class="form-group">
        <label for="Stock">Stock</label>
        <input type="number" class="form-control" id="Stock"
          v-model="stock"
        />
      </div>
      <div class="form-group">
        <label for="Price">Price</label>
        <input type="number" class="form-control" id="Price"
          v-model="price"
        />
      </div>
    <input type="file" @change="onFileChange" />
    <button @click="onUploadFile" class="upload-button"
    :disabled="!this.selectedFile">Upload Product</button>
  </div>
</template>

<script>
import axios from "axios";
import DataService from "../services/PartDataService";

export default {
  data() {
    return {
      selectedFile: "",
      imgpath: '',
      type:'',
      manufacturer:'',
      name: '',
      description:'',
      stock:'',
      price:'',
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.imgpath= e.target.files[0].name;
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      var data = {
        imgpath: this.imgpath,
        type:this.type,
        manufacturer:this.manufacturer,
        name: this.name,
        description: this.description,
        stock: this.stock,
        price: this.price,
      };
      const formData = new FormData();
      formData.append("file", this.selectedFile);  // appending file
      
      // Sending product data to the DB
      DataService.create(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

     // Sending photo to the backend
      axios
        .post("http://localhost:4000/api/Part/upload", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>