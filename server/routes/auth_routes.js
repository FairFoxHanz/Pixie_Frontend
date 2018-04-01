const passport = require("passport");
const keys = require("../config/keys");
const fs = require("fs");
const router = require("express").Router();

router.get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile"]
    })
  );

  router.get(
    "/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect(`${keys.redirectDomain}/`);
    }
  );

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`${keys.redirectDomain}/`);
  });

  router.get("/current_user", (req, res) => {
    res.send(req.user);
  });

module.exports = router;
