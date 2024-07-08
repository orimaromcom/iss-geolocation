import { useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";

import "ol/ol.css";
import { fromLonLat } from "ol/proj.js";

const schladming = [100.394167, 0.689167]; // caution partner, read on...
// since we are using OSM, we have to transform the coordinates...
const schladmingWebMercator = fromLonLat(schladming);

function MapComponent() {
  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: schladmingWebMercator,
        zoom: 9,
      }),
    });
    return () => map.setTarget(null);
  }, []);

  return <div style={{ height: "400px", width: "400px" }} id="map" />;
}

export default MapComponent;
