const Location = require("../models/Location");

const saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const newLocation = await Location.create({
      latitude,
      longitude,
    });

    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveLocation,
};