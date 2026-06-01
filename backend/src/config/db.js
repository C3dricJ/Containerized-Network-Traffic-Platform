const { Pool } = require("pg");

const pool = new Pool({
  host: "postgres",
  user: "admin",
  password: "password",
  database: "network_monitor",
  port: 5432,
});

module.exports = pool;
