# ISS Tracker API

Welcome to my ISS Tracker API project! This server provides information about the current location of the International Space Station (ISS) and country data. This project demonstrates the ability to handle geospatial data and provide real-time updates through a set of RESTful APIs.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Endpoints](#endpoints)
  - [GET /api/v1/countries](#get-apiv1countries)
  - [GET /api/v1/iss-location](#get-apiv1iss-location)
  - [GET /api/v1/iss-location-utm](#get-apiv1iss-location-utm)


## Overview

The ISS Tracker API provides three endpoints:

1. **Countries**: Get a list of countries from the dataset.
2. **ISS Location**: Get the current country the ISS is above, or "Ocean" if it is not above any country's territory and the Longitude Latitude coordinates.
3. **ISS Location in UTM**: Get the current location of the ISS in UTM (Universal Transverse Mercator) coordinates.

## Features

- **Real-Time Tracking**: The API provides real-time tracking of the ISS location.
- **Geospatial Analysis**: Determines which country (if any) the ISS is above using geometric data.
- **Multiple Coordinate Systems**: Supports both geographic (latitude and longitude) and UTM coordinate systems.

## Endpoints

### GET /api/v1/countries

**Method**: GET

**Example**: 
```{"success": true,"countries": ["Afganistan","Angola", ...]}```


### GET /api/v1/iss-location

**Method**: GET

**Example**: 
```{"success": true,"position": {"iss_position": {"latitude": "47.3965","longitude": "-77.3196"},"country": "Canada"}}```


### GET /api/v1/iss-location-utm

**Example**: 
```{"success": true,"position": {"easting": 572939.5680705097,"northing": 4864532.76669802,"zoneLetter": "T"}}```





