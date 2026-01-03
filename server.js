require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health Tracker API is running");
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/health", require("./routes/healthRoutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
