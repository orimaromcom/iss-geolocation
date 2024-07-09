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

function getJsonData() {
  const geoJsonData = readGeoJsonFile(filePath);
  return geoJsonData;
}

function getCountryNames() {
  const geoJsonData = getJsonData();

  if (geoJsonData) {
    const countryNames = extractCountryNames(geoJsonData);

    return countryNames;
  }

  return null;
}

function pointInPolygon(point, polygon) {
  return turf.booleanPointInPolygon(point, polygon);
}

function getPointFromIssPosition(issPosition) {
  const point = turf.point([
    parseFloat(issPosition?.longitude),
    parseFloat(issPosition?.latitude),
  ]);

  return point;
}

function findCountry(issPosition, geoJsonData) {
  if (!issPosition) return "Unknown country";
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

async function getIssCountry() {
  const iss_position = await fetchIssLocation();

  const geoJsonData = getJsonData(filePath);

  const country = findCountry(iss_position, geoJsonData);

  return { iss_position, country };
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

async function calculateUtmPosition() {
  {
    const iss_position = await fetchIssLocation();

    const utm_position = convertToUtm(
      parseFloat(iss_position.latitude),
      parseFloat(iss_position.longitude)
    );

    return { iss_position, utm_position };
  }
}

module.exports = {
  getCountryNames,
  getJsonData,
  extractCountryNames,
  calculateUtmPosition,
  getIssCountry,
};
