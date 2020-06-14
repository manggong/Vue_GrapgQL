const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Author = require("./author")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

module.exports = db;
