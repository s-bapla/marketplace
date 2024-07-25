const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require('./routes/auth')
const User = require("./models/user")

const app = express();

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "node_complete",
};

const sessionStore = new MySQLStore(options);


app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    key: "session_cookie_name",
    secret: "your_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user.id)
    .then(user => {
      console.log(user);
      req.user = user[0][0];
      next();
    })
    .catch(err => console.log(err));
});

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.listen(3000);
