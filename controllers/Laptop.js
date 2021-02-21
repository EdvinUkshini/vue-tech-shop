var path = require('path');
const db = require("../models");
const Laptop = db.laptop;

global.appRoot = path.join(__dirname, '../');
const uploadPath = appRoot.concat("/src/assets/images/products");

// Create and Save a new Laptop
exports.create = (req, res) => {
  // Validate request
  if (!req.body.imgpath) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a laptop
  const laptop = new Laptop({
    imgpath: req.body.imgpath,
    name: req.body.name,
    cpu: req.body.cpu,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
  });

  // Save laptop in the database
  laptop
    .save(laptop)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the laptop."
      });
    });
};

// Retrieve all Laptops from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const theLatest = req.query.theLatest;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Laptop.find(condition).limit(parseInt(theLatest))
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pcs."
      });
    });
};

// Find a single Laptop with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Laptop.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Laptop with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Laptop with id=" + id });
    });
};

// Update a Laptop Laptop the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Laptop.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Laptop with id=${id}. Maybe Laptop was not found!`
        });
      } else res.send({ message: "Laptop was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Laptop with id=" + id
      });
    });
};

// Delete a Laptop with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Laptop.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Laptop with id=${id}. Maybe Laptop was not found!`
        });
      } else {
        res.send({
          message: "Laptop was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Laptop with id=" + id
      });
    });
};

// Delete all Laptop from the database.
exports.deleteAll = (req, res) => {
    Laptop.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Laptop were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Laptop."
      });
    });
};


exports.upload = (req, res) => {

  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`${uploadPath}/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
}