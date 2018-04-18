require("./models/user");
require("./models/event");
require("./services/passport");

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const session = require("cookie-session");
var cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const events = require("./routes/event_routes");
const users = require("./routes/users_routes");
const invitations = require("./routes/invitation_routes");
const auth = require("./routes/auth_routes");

const https = require("https");
const fs = require("fs");
//Certificates for https
const options = {
  key: fs.readFileSync(__dirname + "/config/certificates/pixie.key"),
  cert: fs.readFileSync(__dirname + "/config/certificates/pixie.crt")
};

const app = express();

mongoose.connect(keys.mongoURI);

app.use(cookieParser());
app.use(
  session({ secret: keys.cookieKey, cookie: { maxAge: 60 * 60 * 1000 } })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use("/api/events", events);
app.use("/api/invitations", invitations);
app.use("/api/users", users);
app.use("/auth", auth);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.listen(PORT);
} else {
  https.createServer(options, app).listen(PORT);
}
