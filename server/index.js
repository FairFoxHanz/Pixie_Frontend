require("./models/user");
require("./models/event");
require("./services/passport");

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const https = require("https");
const fs = require("fs");

//Certificates for https
const options = {
  key: fs.readFileSync(__dirname+"/config/certificates/pixie.key"),
  cert: fs.readFileSync(__dirname+"/config/certificates/pixie.crt")
};

const app = express();

mongoose.connect(keys.mongoURI);

app.use(cookieParser());
app.use(
  session({
    secret: "cookie_secret",
    name: "cookie_name",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require("./routes/auth_routes")(app);
require("./routes/event_routes")(app);

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT + 1);
https.createServer(options, app).listen(PORT);
