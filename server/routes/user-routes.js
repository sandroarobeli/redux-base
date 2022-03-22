// Third party
const express = require("express");
const { check } = require("express-validator");

// Custom modules
const userControllers = require("../controllers/user-controllers");

// Initializing the router object
const router = express.Router();

// Signup a User
router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email")
      .normalizeEmail() // toLowercase()
      .isEmail(),
    check("password").not().isEmpty(),
    // check('password')  // Adjust-restore per user requirements
    //   .isLength({ min: 8 })
  ],
  userControllers.signup
);

// Login a User
router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  userControllers.login
);

// MORE TO BE ADDED...

module.exports = router;
