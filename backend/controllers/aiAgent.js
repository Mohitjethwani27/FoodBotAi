const axios = require("axios");

const parseAndCreateLead = async (req, res) => {
  console.log("AI Agent called");
  console.log("Authenticated user:", req.user?.username);
  console.log("Request body:", req.body);

  const { conversation } = req.body;
  if (!conversation) {
    return res.status(400).json({ error: "Missing conversation" });
  }

  const prompt = `
Extract lead info from this conversation and return JSON:

{
  "command": "createLead",
  "lead": {
    "name": "business name",
    "source": "cold_call",
    "contact": {
      "email": "email or null",
      "phone": "phone or null"
    },
    "interestedProducts": ["product names"],
    "status": "New",
    "notes": "summary"
  }
}

Conversation: ${conversation}
`;

  try {
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1000 },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const geminiContent =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanContent = geminiContent.replace(/```json|```/g, "").trim();

    let structuredData;
    try {
      structuredData = JSON.parse(cleanContent);
      console.log("Parsed data:", structuredData);
    } catch (err) {
      console.error("JSON parse failed:", err.message);
      return res.status(500).json({ error: "Invalid AI response" });
    }

    const mcpResponse = await axios.post(
      "http://localhost:5000/api/mcp/execute",
      structuredData,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.cookie || "",
        },
      }
    );

    console.log("Lead saved:", mcpResponse.data);

    return res.status(200).json({
      message: "Lead created successfully",
      result: mcpResponse.data,
    });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.response) {
      console.error("MCP Error Response:", error.response.data);
      return res.status(error.response.status).json({
        error: "Provide Conversation in Proper Format",
        details: error.response.data,
      });
    }

    return res.status(500).json({
      error: "Failed to process lead",
      details: error.message,
    });
  }
};

module.exports = parseAndCreateLead;
