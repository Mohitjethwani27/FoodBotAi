const jwt = require("jsonwebtoken");
const db = require("../config/firebase");

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET not found in environment variables");
  process.exit(1);
}

const handleSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSnapshot = await db
      .collection("users")
      .where("username", "==", username)
      .get();

    if (!userSnapshot.empty) {
      return res.status(409).json({ error: "User already exists" });
    }

    await db.collection("users").add({ username, password });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000,
      path: "/",
    });

    res.status(201).json({
      message: "Signup successful",
      username,
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSnapshot = await db
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000,
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      username,
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

const getProfile = (req, res) => {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.status(200).json({
      username: decoded.username,
      isAuthenticated: true,
    });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = {
  handleSignup,
  handleLogin,
  getProfile,
};
