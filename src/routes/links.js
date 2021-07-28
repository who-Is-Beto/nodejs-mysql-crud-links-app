const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("links/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  req.flash("success", "Link Saved Successfully");
  res.redirect("/links");
});

router.get("/", isLoggedIn, async (req, res) => {
  const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [
    req.user.id,
  ]);
  res.render("links/list", { links });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  await pool.query("DELETE FROM links WHERE ID = ?", [req.params.id]);
  req.flash("success", "Link deleted successfully");
  res.redirect("/links");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const links = await pool.query("SELECT * FROM links WHERE ID = ?", [
    req.params.id,
  ]);
  res.render("links/edit", { links: links[0] });
});
router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { title, description, url } = req.body;
  const newLInk = {
    title,
    description,
    url,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLInk, req.params.id]);
  req.flash("success", "Link updated successfuly");
  res.redirect("/links");
});

module.exports = router;
