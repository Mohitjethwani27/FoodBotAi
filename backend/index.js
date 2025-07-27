const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");

app.use(cookieParser()); 
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


const leadRoutes = require("./routes/lead.js");
const mcpRoutes = require("./routes/mcp.js");
const aiAgentRoutes = require("./routes/aiAgent");
const userRoutes = require("./routes/user.js");

app.use("/api/aiagent",authenticateToken, aiAgentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/mcp",  mcpRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
