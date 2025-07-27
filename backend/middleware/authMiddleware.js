const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Check JWT_SECRET on startup
if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL: JWT_SECRET not found in middleware/auth.js");
  console.error(
    "Available env vars:",
    Object.keys(process.env).filter((key) => key.includes("JWT"))
  );
  process.exit(1);
}

const authenticateToken = (req, res, next) => {
  console.log("🔍 Auth Middleware - Cookies object exists:", !!req.cookies);
  console.log("🔍 Auth Middleware - All cookies:", req.cookies);
  console.log("🔍 JWT_SECRET available:", !!process.env.JWT_SECRET);

  // ✅ Check if cookie-parser is working
  if (!req.cookies) {
    console.log("❌ Cookie parser middleware not working");
    return res.status(500).json({
      error: "Server configuration error",
      message: "Cookie parsing not available",
    });
  }

  const token = req.cookies.token;
  console.log("🔍 Auth Middleware - Token found:", token ? "Yes" : "No");

  if (!token) {
    console.log("❌ No token found in cookies");
    return res.status(401).json({
      error: "Access denied. No token provided.",
      message: "Please login to continue.",
      debug: {
        cookies: req.cookies,
        cookieNames: Object.keys(req.cookies || {}),
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified successfully for user:", decoded.username);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);

    let errorMessage = "Invalid token";
    if (err.name === "TokenExpiredError") {
      errorMessage = "Token has expired. Please login again.";
    }

    return res.status(403).json({
      error: errorMessage,
      message: "Please login again to continue.",
      debug: {
        tokenExists: !!token,
        error: err.message,
      },
    });
  }
};

module.exports = { authenticateToken };
