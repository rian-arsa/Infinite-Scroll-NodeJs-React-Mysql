const { Sequelize } = require("sequelize");

const db = new Sequelize("coder_empat", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
