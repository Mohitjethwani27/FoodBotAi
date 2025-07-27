const {
  addLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} =require("../controllers/leads.js");
const authenticateUser = require("../middleware/authMiddleware");

const express=require('express');
const router=express.Router();
router.route("/")
.get(getAllLeads)
.post(addLead);
router.route("/:id")
.get(getLeadById)
.put(updateLead)
.delete(deleteLead)
module.exports=router;