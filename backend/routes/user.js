// routes/user.js
const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
  getProfile,
} = require("../controllers/user"); 


router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/profile", getProfile);

module.exports = router;
