const db = require("../config/db");

/**
 * POST /auth/register
 */
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User registration failed" });
  }
};

/**
 * POST /auth/login
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT id, email FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
