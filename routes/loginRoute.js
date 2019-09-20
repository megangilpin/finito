const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../passport")

const { validateBody, schemas } = require("../helpers/routeHelpers")
const authController = require("../controllers/auth");

router.route("/register").post(validateBody(schemas.authSchema), authController.register); 

router.route("/signin").post(validateBody(schemas.authSchema), passport.authenticate("local", { session: false }), authController.signIn); 

router.route("/secret").get(passport.authenticate("jwt", { session: false, failureFlash: true }), authController.secret);

module.exports = router;