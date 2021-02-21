module.exports = app => {
    const laptop = require("../controllers/Laptop.js");
  
    var router = require("express").Router();
  
    // Create a new laptop
    router.post("/", laptop.create);
  
    // Retrieve all laptop
    router.get("/", laptop.findAll);
  
    // Retrieve a single laptop with id
    router.get("/:id", laptop.findOne);
  
    // Update a laptop with id
    router.put("/:id", laptop.update);
  
    // Delete a laptop with id
    router.delete("/:id", laptop.delete);
  
    // Delete all laptops
    router.delete("/", laptop.deleteAll);

    // Laptop image upload
    router.post("/upload", laptop.upload);
  
    app.use("/api/laptop", router);
  };