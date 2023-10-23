"use strict";
const mysql = require("mysql2");
const config = require("./config.mac.json");

const databaseOptions = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  namedPlaceholders: true,
};

const connection = mysql.createPool(databaseOptions);

connection.getConnection((error, success) => {
  if (error) console.log("Error Connecting Database" + error);
  if (success) console.log("Database Connected");
});

module.exports = connection;
