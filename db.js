const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection({
  host: config.HOST,
  port: config.PORT,
  user: config.DBUSER,
  password: config.DBPASSWORD,
  database: config.DBNAME,
});

module.exports = connection;
