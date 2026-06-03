const express = require("express");
const pool = require("./config/db");

const app = express();

app.use(express.json());

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

app.post("/packets", async (req, res) => {
  try {
    const {
      source_ip,
      destination_ip,
      protocol,
      packet_length
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO packets
      (source_ip, destination_ip, protocol, packet_length)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        source_ip,
        destination_ip,
        protocol,
        packet_length
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
});

app.get("/packets", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM packets
      ORDER BY timestamp DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});