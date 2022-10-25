module.exports = {
  HOST: "localhost",
  USER: "webcoder",
  PASSWORD: "myS3cretP@55Word",
  DB: "dronesmart",
  dialect: "mysql",
  dialectOptions: {
    "useUTC": false 
  },
  timezone: "-04:00", 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
