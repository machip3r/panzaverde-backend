"use strict";
const mysql = require("mysql");
const config = require("./config.json");

const databaseOptions = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

const connection = mysql.createPool(databaseOptions);

connection.getConnection((error, success) => {
  if (error) console.log("Error Connecting Database" + error);
  if (success) console.log("Database Connected");
});

module.exports = connection;
