module.exports = app => {
  const drones = require("../controllers/drone.controller.js");

  var router = require("express").Router();

  // Create a new Drone
  router.post("/", drones.create);

  // Retrieve all Drones
  router.get("/", drones.findAll);

  // Retrieve all published Drones
  router.get("/published", drones.findAllPublished);

  // Retrieve a single Drone with id
  router.get("/:id", drones.findOne);

  // Update a Drone with id
  router.put("/:id", drones.update);

  // Delete a Drone with id
  router.delete("/:id", drones.delete);

  // Delete all Drones
  router.delete("/", drones.deleteAll);

  app.use('/api/drones', router);
};
