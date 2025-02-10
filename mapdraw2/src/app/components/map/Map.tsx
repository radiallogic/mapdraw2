"use client";
import { useAtom } from "jotai";
import Zoom from "@/app/components/map/Zoom";
import Position from "@/app/components/map/Position";
import { getRandomPosition } from "@/lib/getRandomPosition";

import { ZoomAtom } from "@/app/globals";

import Paths from "../Paths/Paths";
import Sites from "../Sites/Sites";
import Delete from "../Delete/Delete";

import {
  MapContainer,
  TileLayer,
  useMapEvents,
  SVGOverlay,
  ZoomControl,
} from "react-leaflet";

export default function Map() {
  const center = getRandomPosition();
  //const center = { lat: -3.56, lng: -64.4565 };

  const [zoom, setZoom] = useAtom(ZoomAtom);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false} // turns off default zoom control
      doubleClickZoom={false}
    >
      <Zoom />
      <Position />

      <Paths />
      <Sites />
      {/* <Delete /> */}

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
