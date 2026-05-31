const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    service: "Containerized Network Traffic Platform",
    status: "running",
    version: "0.1.0"
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});