// require our dependencies
const express = require("express");
const cors = require("cors");
const apiPort   = "http://localhost:8084";
const PORT      = process.env.PORT || 8083;
const apiName        = "DroneSmart Drones Mart Flying Hobbies RESTful API";

const app = express();

var corsOptions = {
  origin: apiPort 
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

/*  
    // drop the table, if it exists already 
 db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});
*/

// simple routing
app.get("/api/", (req, res) => {
  res.json({ message: `Welcome to the ${apiName} web app is now running on port ${PORT} at http://localhost:${PORT}. The API allows CRUD (Create, Read, Update, & Delete) REST access to a MySQL relational database, via Sequelize ORM.  Enjoy!` });
});

app.get("/", (req, res) => {
  res.json({ message: `Welcome to the ${apiName} web app is now running on port ${PORT} at http://localhost:${PORT}. The API allows CRUD (Create, Read, Update, & Delete) REST access to a MySQL relational database, via Sequelize ORM.  Enjoy!` });
});


require("./app/routes/drone.routes")(app);

// listen for requests on port
app.listen(PORT, () => {
  console.log(`The ${apiName} web app is now running on port ${PORT} at http://localhost:${PORT}. Enjoy!`); 
});
