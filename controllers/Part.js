var path = require('path');
const db = require("../models");
const Part = db.part;

global.appRoot = path.join(__dirname, '../');
const uploadPath = appRoot.concat("/src/assets/images/products");

// Create and Save a new Part
exports.create = (req, res) => {
  // Validate request
  if (!req.body.imgpath) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a part
  const part = new Part({
    imgpath:req.body.imgpath,
    type:req.body.type,
    manufacturer:req.body.manufacturer,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
  });

  // Save part in the database
  part
    .save(part)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the part."
      });
    });
};

// Retrieve all Parts from the database.
exports.findAll = (req, res) => {
  const name = req.query.Manufacturer;
  const type = req.query.type;
  const theLatest = req.query.theLatest;
  const minPriceFilter = req.query.lessThan;
  const maxPriceFilter = req.query.greaterThan;
  var condition = name ? { type:type, manufacturer: { $regex: new RegExp(name), $options: "i" } } : {type:type,price: {$gte: minPriceFilter, $lte: maxPriceFilter}};

  Part.find(condition).limit(parseInt(theLatest))
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving parts."
      });
    });
};

// Find a single Part with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Part.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Part with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Part with id=" + id });
    });
};

// Update a Part with the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Part.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Part with id=${id}. Maybe Part was not found!`
        });
      } else res.send({ message: "Part was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Part with id=" + id
      });
    });
};

// Delete a Part with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Part.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Part with id=${id}. Maybe Part was not found!`
        });
      } else {
        res.send({
          message: "Part was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Part with id=" + id
      });
    });
};

// Delete all Part from the database.
exports.deleteAll = (req, res) => {
    Part.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Part were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Part."
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