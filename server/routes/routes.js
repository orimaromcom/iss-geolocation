const express = require("express");
const servicesManager = require("../services/services-manager.js");
const handlers = require("../handlers");

const router = express.Router();

router.route("/iss-location").get(handlers.getIssLocation);

router.route("/iss-location-utm").get(handlers.getIssLocationUtm);

router.route("/countries").get(handlers.getCountryNames);

module.exports = router;
