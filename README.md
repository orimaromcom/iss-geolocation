# ISS Tracker API

Welcome to my ISS Tracker API project! This server provides information about the current location of the International Space Station (ISS) and country data. This project demonstrates the ability to handle geospatial data and provide real-time updates through a set of RESTful APIs.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Endpoints](#endpoints)
  - [GET /api/v1/countries](#get-ap-iv1countries)
  - [GET /api/v1/iss-location](#get-api-v1-iss-location)
  - [GET /api/v1/iss-location-utm](#get-api-v1-iss-location-utm)
- [Live Demo](#live-demo)
- [Installation](#installation)
* [Usage](#usage)


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

## Live Demo

**PC Compatible Version**:

https://ori-iss-location-tracker.netlify.app

## Installation

### Server

1. Clone the repository:

    https://github.com/orimaromcom/iss-geolocation.git

    ```cd /server```

2. Install dependencies:

    ```npm install```

3. Start the server:

   ```npm run start```

### Client

1. Navigate to the client directory:

    ```cd /client```

2. Install dependencies:

    ```npm install```

3. Start the client:

    ```npm run dev```

## Usage

After starting both the server and client, you can access the application through your web browser. Typically, the server runs on `http://localhost:3000` and the client on `http://localhost:5173`. 

Ensure both server and client are running simultaneously for full functionality.





   





