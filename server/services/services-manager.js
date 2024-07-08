const fs = require("fs");
const turf = require("@turf/turf");
const utm = require("utm");

const filePath = "./data/countries.geojson";

function readGeoJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
  }
}

function extractCountryNames(geoJson) {
  return geoJson.features.map((feature) => feature.properties.name);
}

function getJsonData(filePath) {
  const geoJsonData = readGeoJsonFile(filePath);
  return geoJsonData;
}

function getCountryNames() {
  const geoJsonData = getJsonData(filePath);

  if (geoJsonData) {
    return extractCountryNames(geoJsonData);
  }
}

function pointInPolygon(point, polygon) {
  return turf.booleanPointInPolygon(point, polygon);
}

function getPointFromIssPosition(issPosition) {
  const point = turf.point([
    parseFloat(issPosition.longitude),
    parseFloat(issPosition.latitude),
  ]);

  return point;
}

function findCountry(issPosition, geoJsonData) {
  const point = getPointFromIssPosition(issPosition);

  for (const feature of geoJsonData.features) {
    const geometry = feature.geometry;

    if (geometry.type === "Polygon") {
      const polygon = turf.polygon(geometry.coordinates);
      if (pointInPolygon(point, polygon)) {
        return feature.properties.name;
      }
    }

    if (geometry.type === "MultiPolygon") {
      const multiPoly = turf.multiPolygon(geometry.coordinates);
      if (pointInPolygon(point, multiPoly)) {
        return feature.properties.name;
      }
    }
  }

  return "Ocean";
}

async function fetchIssLocation() {
  try {
    const response = await fetch("http://api.open-notify.org/iss-now.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("fetching ISS location");
    if (!response.ok) {
      throw new Error("Failed to fetch ISS location");
    }
    const { iss_position } = await response.json();

    console.log("ISS location fetched", iss_position);

    return iss_position;
  } catch (err) {
    console.error(`Error fetching ISS location: ${err}`);
  }
}

async function getIssLocation(req, res) {
  try {
    const iss_position = await fetchIssLocation();

    const geoJsonData = getJsonData(filePath);

    const country = findCountry(iss_position, geoJsonData);

    res.status(200).json({ success: true, position: { iss_position, country } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching ISS location failed, please try again",
    });
  }
}

function convertToUtm(latitude, longitude) {
  const { easting, northing, zoneNumber, zoneLetter } = utm.fromLatLon(
    latitude,
    longitude
  );

  return {
    easting,
    northing,
    zoneNumber,
    zoneLetter,
  };
}

async function getIssLocationUtm(req, res) {
  try {
    const iss_position = await fetchIssLocation();

    const utm_position = convertToUtm(
      parseFloat(iss_position.latitude),
      parseFloat(iss_position.longitude)
    );

    res.status(200).json({ success: true, position: { utm_position } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching ISS location failed, please try again",
    });
  }
}

module.exports = {
  getCountryNames,
  getIssLocation,
  getIssLocationUtm,
};
