// routes/mcpRoutes.js
const express =require( "express");
const  executeCommand  =require("../controllers/mcp.js");

const router = express.Router();

router.post("/execute", executeCommand);

module.exports= router;
