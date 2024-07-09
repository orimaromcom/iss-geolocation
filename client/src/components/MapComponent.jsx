import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";

import "ol/ol.css";
import { fromLonLat } from "ol/proj.js";
const SOCKET_URL = "ws://127.0.0.1:8080";

function MapComponent() {
  const { lastMessage } = useWebSocket(SOCKET_URL);
  const messageJSON = lastMessage?.data ? JSON.parse(lastMessage.data) : {};
  const [messageHistory, setMessageHistory] = useState([]);
  const [coords, setCoords] = useState(
    fromLonLat([lastMessage?.data.longitude, lastMessage?.data.latitude])
  );
  console.log(messageHistory);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [prev, JSON.parse(lastMessage.data)]);
      setCoords(
        fromLonLat([
          Number(messageJSON?.iss_position?.longitude),
          Number(messageJSON?.iss_position?.latitude),
        ])
      );
    }
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: coords,
        zoom: 5,
      }),
    });
    return () => map.setTarget(null);
  }, [lastMessage]);

  return (
    <>
      <div style={{ height: "400px", width: "400px" }} id="map" />
      Hello
    </>
  );
}

export default MapComponent;
