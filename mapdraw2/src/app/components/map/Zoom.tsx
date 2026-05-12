"use client";
import { useMapEvents } from "react-leaflet";

import { atom, useAtom } from "jotai";

import { ZoomAtom } from "@/app/globals";

export default function Zoom() {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      console.log("in locationfound", map.getZoom());
      const [zoom, setZoom] = useAtom(ZoomAtom);
      if (zoom !== map.getZoom()) {
        setZoom(map.getZoom());
        console.log("map getZoom", map.getZoom());
      }
    },
  });

  return <> </>;
}
