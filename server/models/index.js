const Sequelize = require("sequelize");
const config = require("../config/config")[env];
const env = process.env;
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
db.post = require("./post")(sequelize, Sequelize);

module.exports = db;
