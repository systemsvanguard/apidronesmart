const db = require("../models");
const Drone = db.drones;
const Op = db.Sequelize.Op;

// Create and Save a new Drone
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Drone
  const drone = {
    title: req.body.title,
    brand: req.body.brand, 
	price: req.body.price, 
	asinid: req.body.asinid, 
	rating: req.body.rating, 
	stockqnty: req.body.stockqnty, 
	amazon_image: req.body.amazon_image, 
	amazon_url: req.body.amazon_url, 
	synopsis: req.body.synopsis, 
	description: req.body.description, 
    published: req.body.published ? req.body.published : false
  };

  // Save Drone in the database
  Drone.create(drone)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Drone."
      });
    });
};

// Retrieve all Drones from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Drone.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drones."
      });
    });
};

// Find a single Drone with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Drone.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Drone with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Drone with id=" + id
      });
    });
};

// Update a Drone by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Drone.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drone was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Drone with id=${id}. Maybe Drone was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Drone with id=" + id
      });
    });
};

// Delete a Drone with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Drone.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drone was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Drone with id=${id}. Maybe Drone was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Drone with id=" + id
      });
    });
};

// Delete all Drones from the database.
exports.deleteAll = (req, res) => {
  Drone.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Drones were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all drones."
      });
    });
};

// find all published Drone
exports.findAllPublished = (req, res) => {
  Drone.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drones."
      });
    });
};
