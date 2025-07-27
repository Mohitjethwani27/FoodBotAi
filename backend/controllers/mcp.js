const {
  addLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("./leads");

const leadSchema = require("../schema/lead");

const commandMap = {
  createLead: addLead,
  getLeads: getAllLeads,
  getLeadById: getLeadById,
  updateLead: updateLead,
  deleteLead: deleteLead,
};

const executeCommand = async (req, res) => {
  const { command, data, lead, ...rest } = req.body;
  const actualData = lead || data || rest;

  if (!command || !commandMap[command]) {
    return res.status(400).json({
      error: "Invalid or missing command",
      availableCommands: Object.keys(commandMap),
    });
  }

  if (command === "createLead") {
    try {
      leadSchema.parse(actualData);
    } catch (err) {
      return res.status(400).json({
        error: "Validation failed",
        details: err.errors,
      });
    }
  }

  try {
    const fakeReq = {
      body: actualData,
      params: { id: actualData?.id },
    };

    await commandMap[command](fakeReq, res);
  } catch (err) {
    res.status(500).json({
      error: "Command failed",
      details: err.message,
    });
  }
};

module.exports = executeCommand;
