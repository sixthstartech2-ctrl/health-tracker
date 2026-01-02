const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// 👇 ADD THIS HERE
app.get("/", (req, res) => {
  res.send("Health Tracker API is running");
});

// existing routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/health", require("./routes/healthRoutes"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
