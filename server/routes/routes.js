const express = require("express");
const servicesManager = require("../services/services-manager.js");

const router = express.Router();

router.route("/iss-location").get(async (req, res) => {
  servicesManager.getIssLocation(req, res);
});

router.route("/iss-location-utm").get(async (req, res) => {
  servicesManager.getIssLocationUtm(req, res);
});

router.route("/countries").get(async (req, res) => {
  servicesManager.getCountryNames(req, res);
});

module.exports = router;
