const pool = require("../db");
const crypto = require("crypto");

/**
 * Simple password hashing using sha256
 * (Good for learning; bcrypt is recommended for production)
 */
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * REGISTER USER
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email, and password are required",
      });
    }

    const hashedPassword = hashPassword(password);

    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;

    const values = [username, email, hashedPassword];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    // Handle duplicate email
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    res.status(500).json({
      error: "Registration failed",
      details: err.message,
    });
  }
};

/**
 * LOGIN USER
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const hashedPassword = hashPassword(password);

    const query = `
      SELECT id, username, email
      FROM users
      WHERE email = $1 AND password = $2
    `;

    const result = await pool.query(query, [email, hashedPassword]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      error: "Login failed",
      details: err.message,
    });
  }
};
