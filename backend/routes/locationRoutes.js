const express = require("express");
const router = express.Router();

const {
  saveLocation,
  getLatestLocation
} = require("../controllers/locationController");

router.post("/", saveLocation);
router.get("/latest", getLatestLocation);

module.exports = router;