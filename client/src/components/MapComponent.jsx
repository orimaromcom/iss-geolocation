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
const mode = import.meta.env.MODE;

const SOCKET_URL =
  mode === "development" ? "ws://127.0.0.1:8080" : "wss://iss-geolocation.onrender.com";

function MapComponent() {
  const { lastMessage } = useWebSocket(SOCKET_URL);

  const [messageHistory, setMessageHistory] = useState({
    message: "ISS location update",
    iss_position: { longitude: "0", latitude: "0" },
    country: "Unknown",
  });
  const [coords, setCoords] = useState(fromLonLat([0, 0]));

  useEffect(() => {
    const iconFeature = new Feature({
      geometry: new Point(coords),
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "src//assets/satellite.png",
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

  useEffect(() => {
    if (lastMessage !== null && lastMessage !== undefined) {
      const messageJSON = lastMessage?.data ? JSON.parse(lastMessage.data) : {};
      if (Number.isNaN(messageJSON?.iss_position?.longitude)) return;
      setMessageHistory(messageJSON);
      setCoords(
        fromLonLat([
          Number(messageJSON?.iss_position?.longitude),
          Number(messageJSON?.iss_position?.latitude),
        ])
      );
    }
  }, [lastMessage]);

  return (
    <div className="text-white font-bold">
      <div className="mb-4 text-4xl ">Welcome to Ori's ISS Tracker</div>
      <div style={{ height: "400px", width: "600px" }} id="map" />
      <div className="flex flex-col mt-4 text-lg font-bold">
        <div className="flex">The ISS is currently above: {messageHistory?.country}</div>
        <div className="flex flex-col justify-start text-left">
          <div>Longitude: {messageHistory?.iss_position?.longitude}°</div>
          <div>Latitude: {messageHistory?.iss_position?.latitude}°</div>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
