const express = require("express");
const servicesManager = require("../services/services-manager.js");

const router = express.Router();

router.route("/iss-position").get(async (req, res) => {
  servicesManager.getIssLocation(req, res);
});

router.route("/iss-position-utm").get(async (req, res) => {
  servicesManager.getIssLocationUtm(req, res);
});

router.route("/countries").get(async (req, res) => {
  try {
    const countries = servicesManager.getCountryNames();

    res.status(200).json({ success: true, countries: countries });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching countries from dataset failed, please try again",
    });
  }
});

module.exports = router;
