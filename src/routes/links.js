const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLInk = {
    title,
    url,
    description,
  };
  await pool.query("INSERT INTO links set ?", [newLInk]);
  res.send("request resived");
});

module.exports = router;
