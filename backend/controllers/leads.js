const db = require("../config/firebase");

const addLead = async (req, res) => {
  try {
    const leadData = req.body;
    const timestamp = new Date().toISOString();
    leadData.createdAt = timestamp;
    leadData.updatedAt = timestamp;

    const docRef = await db.collection("leads").add(leadData);

    res.status(201).json({
      id: docRef.id,
      message: "Lead added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add lead",
      debug: error.message,
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const snapshot = await db.collection("leads").get();
    const leads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

const getLeadById = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection("leads").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lead" });
  }
};

const updateLead = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.updatedAt = new Date().toISOString();

    await db.collection("leads").doc(id).update(updatedData);

    res.status(200).json({ message: "Lead updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
};

const deleteLead = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("leads").doc(id).delete();
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
};

module.exports = {
  addLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
