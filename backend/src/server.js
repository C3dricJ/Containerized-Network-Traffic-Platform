const express = require("express");
const pool = require("./config/db");

const app = express();

app.get("/", (req, res) => {
  res.json({
    service: "Containerized Network Traffic Platform",
    status: "running",
    version: "0.1.0"
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      connected: true,
      database_time: result.rows[0].now
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      connected: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});