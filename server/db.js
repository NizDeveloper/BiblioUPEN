const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "12341234",
  database: "biblio_upen"
});

module.exports = pool;
