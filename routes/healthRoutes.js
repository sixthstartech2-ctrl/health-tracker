//routes/healthRoutes.js

const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.post("/activity", healthController.createActivity);

router.get("/activity/:id", healthController.getActivity);

router.put("/activity/:id", healthController.updateActivity);

router.delete("/activity/:id", healthController.deleteActivity);

module.exports = router;
