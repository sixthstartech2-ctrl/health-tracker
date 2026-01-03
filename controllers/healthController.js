const db = require("../config/db");

exports.addActivity = async (req, res) => {
  const { user_id, activity, calories } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO health_activities (user_id, activity, calories) VALUES ($1, $2, $3) RETURNING *",
      [user_id, activity, calories]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add activity" });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM health_activities");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};
