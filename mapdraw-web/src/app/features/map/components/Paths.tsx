import * as React from "react";
import * as turf from "@turf/turf";

import { LatLngBounds, latLng, LatLng } from "leaflet";
import { Polyline, Rectangle, useMapEvents, useMapEvent } from "react-leaflet";
import { DrawMouseEvents } from "../../paths/components/DrawMouseEvents";
import { ElbowLine } from "../../paths/components/ElbowLine";

import { Path } from "../../paths/types";
import { useAtom, useAtomValue } from "jotai";
import { PathsAtom } from "../../paths/atoms";

import { ZoomAtom } from "../atoms";

export default function Paths() {
  //const bounds = new LatLngBounds(latLng(51.3, -0.1), latLng(51.5, -0.06));
  const blackOptions = { color: "black" };

  const [paths, setPaths] = useAtom(PathsAtom);
  const zoom = useAtomValue(ZoomAtom);
  const [latLngs, setLatLngs] = React.useState<LatLng[] | null>(null);

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

    let latlngs = simplified.geometry.coordinates.map((c) => {
      return latLng(c[0], c[1]);
    });

    const p: Path = {
      points: latlngs,
    };

    setPaths([...paths, p]);
  };

  const drawline = (point: LatLng) => {
    let ll = [] as LatLng[];
    if (latLngs != null) {
      ll = latLngs;
    }
    //ll.push(point);
    setLatLngs([...ll, point]);
  };

  // const lineToBounds = () => {
  //   let ll = latLngs;
  //   setLatLngs(null);
  //   if (ll != null) {
  //     console.log(ll[0], ll[ll.length - 1]);
  //     setBounds(new LatLngBounds(ll[0], ll[ll.length - 1]));
  //   }
  // };

  const savePolyline = () => {
    latLngs && createPolyline(latLngs);
    setLatLngs(null);
  };

  const setpaths = (path: Path, index: number) => {
    let parr = [...paths];
    //console.log(paths, path, index);
    parr[index] = path;
    setPaths(parr);

    console.log(paths.length, parr.length);
  };

  let elbowLines = paths.map((path: Path, i: number) => {
    return (
      <ElbowLine
        positions={path}
        key={i}
        index={i}
        setpaths={setpaths}
      ></ElbowLine>
    );
  });

  return (
    <>
      <DrawMouseEvents drawline={drawline} saveline={savePolyline} />
      {latLngs && (
        <Polyline pathOptions={blackOptions} positions={latLngs}></Polyline>
      )}

      {/* <Rectangle bounds={bounds} pathOptions={blackOptions} /> */}
      {elbowLines}
    </>
  );
}
