module.exports = app => {
    const peripheral = require("../controllers/Peripheral.js");
  
    var router = require("express").Router();
  
    // Create a new peripheral
    router.post("/", peripheral.create);
  
    // Retrieve all peripheral
    router.get("/", peripheral.findAll);
  
    // Retrieve a single peripheral with id
    router.get("/:id", peripheral.findOne);
  
    // Update a peripheral with id
    router.put("/:id", peripheral.update);
  
    // Delete a peripheral with id
    router.delete("/:id", peripheral.delete);
  
    // Delete all laptops
    router.delete("/", peripheral.deleteAll);

    // peripheral image upload
    router.post("/upload", peripheral.upload);
  
    app.use("/api/peripheral", router);
  };