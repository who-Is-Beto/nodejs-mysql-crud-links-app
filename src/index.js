const express = require("express");
const morgan = require("morgan");
const expHandlebars = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const mysqlStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");

const app = express();
require("./lib/passport");

var port = process.env.PORT || 8000;
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expHandlebars({
    defaultLayout: "main",
    layaoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  }),
);

app.set("view engine", ".hbs");

app.use(
  session({
    secret: "whoisbetomysql",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database),
  }),
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

app.use(require("./routes"));
app.use(require("./routes/auth"));
app.use("/links", require("./routes/links"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("server on port", app.get("port"));
});
