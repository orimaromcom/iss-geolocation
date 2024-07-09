import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Map, View, Feature } from "ol";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import Point from "ol/geom/Point.js";
import { Icon, Style } from "ol/style.js";

import "ol/ol.css";
import { fromLonLat } from "ol/proj.js";
// const SOCKET_URL = "wss://iss-geolocation.onrender.com";
const SOCKET_URL = "ws://127.0.0.1:3000";

function MapComponent() {
  const { lastMessage } = useWebSocket(SOCKET_URL);
  // const messageJSON = lastMessage?.data ? JSON.parse(lastMessage.data) : {};
  const [messageHistory, setMessageHistory] = useState({
    message: "ISS location update",
    iss_position: { longitude: "0", latitude: "0" },
    country: "Unknown",
  });
  const [coords, setCoords] = useState(fromLonLat([0, 0]));

  useEffect(() => {
    if (lastMessage !== null) {
      const messageJSON = lastMessage?.data ? JSON.parse(lastMessage.data) : {};
      setMessageHistory(messageJSON);
      setCoords(
        fromLonLat([
          Number(messageJSON?.iss_position?.longitude),
          Number(messageJSON?.iss_position?.latitude),
        ])
      );
    }
  }, [lastMessage]);

  useEffect(() => {
    const iconFeature = new Feature({
      geometry: new Point(coords),
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "public/satellite.png",
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: "map",
      view: new View({
        center: coords,
        zoom: 5,
      }),
    });

    return () => map.setTarget(null);
  }, [coords]);

  return (
    <>
      Welcome to ISS Tracker
      <div style={{ height: "400px", width: "400px" }} id="map" />
    </>
  );
}

export default MapComponent;
