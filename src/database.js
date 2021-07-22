const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("./keys");

const pool = mysql.createPool(database);
pool.getConnection((error, connection) => {
  if (error) {
    switch (error.code) {
      case "PROTOCOL_CONECTION_LOST":
        console.error("DATABASE CONECTION WAS CLOSE", error.code);
      case "ER_CON_COUNT_ERROR":
        console.error("DABASE HAS TO MANY CONNECTIONS", error.code);
      case "ECONNREFUSED":
        console.error("DATABASE CONNECTION WAS REFUSSED", error.code);
    }
  }
  if (connection) {
    connection.release();
    console.log("DATABASE CONNECTED!");
    return;
  }
});

pool.query = promisify(pool.query);

module.exports = pool;
