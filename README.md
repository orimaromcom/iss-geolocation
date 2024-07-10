# ISS Tracker API

Welcome to the ISS Tracker API project! This server provides information about the current location of the International Space Station (ISS) and country data. This project was developed as part of a job application and demonstrates the ability to handle geospatial data and provide real-time updates through a set of RESTful APIs.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Endpoints](#endpoints)
  - [GET /api/v1/countries](#get-apiv1countries)
  - [GET /api/v1/iss-location](#get-apiv1iss-location)
  - [GET /api/v1/iss-location-utm](#get-apiv1iss-location-utm)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The ISS Tracker API provides three main endpoints:

1. **Countries**: Retrieve a list of countries from the dataset.
2. **ISS Location**: Get the current country the ISS is above, or "Ocean" if it is not above any country's territory.
3. **ISS Location in UTM**: Obtain the current location of the ISS in UTM (Universal Transverse Mercator) coordinates.

## Features

- **Real-Time Tracking**: The API provides real-time tracking of the ISS location.
- **Geospatial Analysis**: Determines which country (if any) the ISS is above using geometric data.
- **Multiple Coordinate Systems**: Supports both geographic (latitude and longitude) and UTM coordinate systems.

## Endpoints

### GET /api/v1/countries

**Description**: Returns a list of the countries available in the dataset.

**Method**: GET
