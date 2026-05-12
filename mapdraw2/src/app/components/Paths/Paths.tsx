import { useState } from "react";

import * as turf from "@turf/turf";

import { useAtom } from "jotai";
import { ZoomAtom, PathsAtom } from "@/app/globals";

import { LatLngBounds, latLng, LatLng, PolyUtil } from "leaflet";
import { Polyline, Rectangle, Circle } from "react-leaflet";
import { DrawMouseEvents } from "./DrawMouseEvents";
import { ElbowLine } from "./ElbowLine";

import { Path } from "./PathTypes";

// const bounds = new LatLngBounds(latLng(51.3, -0.1), latLng(51.5, -0.06));
// const blackOptions = { color: "black" };

export default function Paths() {
  const [latLngs, setLatLngs] = useState<LatLng[]>([]);
  const [zoom, setZoom] = useAtom(ZoomAtom);
  const [paths, setPaths] = useAtom(PathsAtom);

  const createPolyline = (latLngs: Array<LatLng>) => {
    if (latLngs.length < 2) {
      return;
    }

    let c = latLngs.map((item, i) => {
      return [item.lat, item.lng];
    });

    let geojson = turf.lineString(c);

    let tolerance = 0.01;
    if (zoom < 18 && zoom >= 15) {
      tolerance = 0;
    }
    if (zoom < 15 && zoom >= 11) {
      tolerance = 0.001;
    }
    if (zoom < 11 && zoom >= 8) {
      tolerance = 0.01;
    }
    if (zoom < 8 && zoom >= 5) {
      tolerance = 0.1;
    }
    if (zoom < 5 && zoom >= 3) {
      tolerance = 0.5;
    }
    if (zoom < 3 && zoom >= 1) {
      tolerance = 1;
    }

    let simplified = turf.simplify(geojson, {
      tolerance: tolerance,
      highQuality: false,
    });
    // let paths = state.paths;
    let latlngs = simplified.geometry.coordinates.map((c) => {
      return latLng(c[0], c[1]);
    });

    // create Path object here.
    const p: Path = {
      points: latlngs,
    };
    setPaths([...paths, p]);
  };

  const drawline = (point: LatLng) => {
    setLatLngs([...latLngs, point]);
  };

  const savePolyline = () => {
    //console.log("savePolyline");
    if (latLngs != undefined) {
      createPolyline(latLngs);
      setLatLngs([]);
    }
  };

  let elbowLines = paths.map((path: Path, i: number) => {
    return <ElbowLine positions={path} key={i} index={i}></ElbowLine>;
  });

  return (
    <>
      <DrawMouseEvents drawline={drawline} saveline={savePolyline} />

      <Polyline positions={latLngs} color="black" />
      {elbowLines}
    </>
  );
}
