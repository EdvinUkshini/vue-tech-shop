module.exports = app => {
    const part = require("../controllers/Part.js");
  
    var router = require("express").Router();
  
    // Create a new part
    router.post("/", part.create);
  
    // Retrieve all part
    router.get("/", part.findAll);
  
    // Retrieve a single part with id
    router.get("/:id", part.findOne);
  
    // Update a part with id
    router.put("/:id", part.update);
  
    // Delete a part with id
    router.delete("/:id", part.delete);
  
    // Delete all laptops
    router.delete("/", part.deleteAll);

    // part image upload
    router.post("/upload", part.upload);
  
    app.use("/api/part", router);
  };