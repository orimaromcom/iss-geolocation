const servicesManager = require("../services/services-manager.js");

async function getIssLocation(req, res) {
  try {
    const { iss_position, country } = await servicesManager.getIssCountry();

    res.status(200).json({ success: true, position: { iss_position, country } });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Fetching ISS location failed, please try again",
    });
  }
}

async function getIssLocationUtm(req, res) {
  try {
    const position = await servicesManager.calculateUtmPosition();

    res.status(200).json({ success: true, position: position.utm_position });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Calculating UTM position failed, please try again",
    });
  }
}

function getCountryNames(req, res) {
  try {
    const countryNames = servicesManager.getCountryNames();

    if (countryNames) {
      res.status(200).json({
        success: true,
        countries: countryNames,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Fetching countries from dataset failed, please try again",
    });
  }
}

module.exports = {
  getIssLocation,
  getIssLocationUtm,
  getCountryNames,
};
