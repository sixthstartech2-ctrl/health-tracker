const db = require("../db");

exports.addActivity = async (req, res) => {
  const { user_id, steps, calories, sleep_hours } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO health_activities (user_id, steps, calories, sleep_hours)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, steps || 0, calories || 0, sleep_hours || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add activity error:", err);
    res.status(500).json({ error: "Failed to add activity" });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM health_activities");
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch activities error:", err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};
