const express = require("express");
const router = express.Router();
const parseAndCreateLead=require("../controllers/aiAgent")
const {authenticateToken} =require("../middleware/authMiddleware")

console.log("🛣️  AI Agent Route Registered");

router.post("/parseandcreate",authenticateToken, parseAndCreateLead);

module.exports = router;
