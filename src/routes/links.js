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
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

router.get("/delete/:id", async (req, res) => {
  await pool.query("DELETE FROM links WHERE ID = ?", [req.params.id]);
  res.redirect("/links");
});

module.exports = router;
