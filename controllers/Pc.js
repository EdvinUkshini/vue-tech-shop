var path = require('path');
const db = require("../models");
const Pc = db.pc;

global.appRoot = path.join(__dirname, '../');
const uploadPath = appRoot.concat("/src/assets/images/products");

// Create and Save a new pc
exports.create = (req, res) => {
  // Validate request
  if (!req.body.imgpath) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a pc
  const pc = new Pc({
    imgpath: req.body.imgpath,
    name: req.body.name,
    cpu: req.body.cpu,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
  });

  // Save Pc in the database
  pc
    .save(pc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pc."
      });
    });
};

// Retrieve all pcs from the database. 
exports.findAll = (req, res) => {
  const name = req.query.name;
  const theLatest = req.query.theLatest;
  const minPriceFilter = req.query.lessThan;
  const maxPriceFilter = req.query.greaterThan;
  var condition = name ? { cpu: { $regex: new RegExp(name), $options: "i" } } : {price: {$gte: minPriceFilter, $lte: maxPriceFilter}};

  Pc.find(condition).limit(parseInt(theLatest))
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

// Find a single pc with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pc.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found pc with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving pc with id=" + id });
    });
};

// Update a pc by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pc.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update pc with id=${id}. Maybe pc was not found!`
        });
      } else res.send({ message: "pc was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating pc with id=" + id
      });
    });
};

// Delete a pc with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pc.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete pc with id=${id}. Maybe pc was not found!`
        });
      } else {
        res.send({
          message: "pc was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete pc with id=" + id
      });
    });
};

// Delete all pc from the database.
exports.deleteAll = (req, res) => {
  Pc.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} pc were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pc."
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