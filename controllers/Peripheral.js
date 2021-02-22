var path = require('path');
const db = require("../models");
const Peripheral = db.peripheral;

global.appRoot = path.join(__dirname, '../');
const uploadPath = appRoot.concat("/src/assets/images/products");

// Create and Save a new Peripheral
exports.create = (req, res) => {
  // Validate request
  if (!req.body.imgpath) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a peripheral
  const peripheral = new Peripheral({
    imgpath:req.body.imgpath,
    type:req.body.type,
    manufacturer:req.body.manufacturer,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
  });

  // Save peripheral in the database
  peripheral
    .save(peripheral)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the peripheral."
      });
    });
};

// Retrieve all Peripherals from the database.
exports.findAll = (req, res) => {
  const name = req.query.Manufacturer;
  const theLatest = req.query.theLatest;
  var condition = name ? { manufacturer: { $regex: new RegExp(name), $options: "i" } } : {};

  Peripheral.find(condition).limit(parseInt(theLatest))
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Peripheral."
      });
    });
};

// Find a single Peripheral with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Peripheral.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Peripheral with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Peripheral with id=" + id });
    });
};

// Update a Peripheral with the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Peripheral.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Peripheral with id=${id}. Maybe Peripheral was not found!`
        });
      } else res.send({ message: "Peripheral was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Peripheral with id=" + id
      });
    });
};

// Delete a Peripheral with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Peripheral.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Peripheral with id=${id}. Maybe Peripheral was not found!`
        });
      } else {
        res.send({
          message: "Peripheral was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Peripheral with id=" + id
      });
    });
};

// Delete all Peripheral from the database.
exports.deleteAll = (req, res) => {
    Peripheral.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Peripheral were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Peripheral."
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