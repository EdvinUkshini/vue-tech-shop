module.exports = app => {
  const pc = require("../controllers/Pc.js");

  var router = require("express").Router();

  // Create a new pc
  router.post("/", pc.create);

  // Retrieve all pc
  router.get("/", pc.findAll);

  // Retrieve a single pc with id
  router.get("/:id", pc.findOne);

  // Update a pc with id
  router.put("/:id", pc.update);

  // Delete a pc with id
  router.delete("/:id", pc.delete);

  // Create a new pc
  router.delete("/", pc.deleteAll);

  router.post("/upload", pc.upload);

  app.use("/api/Pc", router);
};