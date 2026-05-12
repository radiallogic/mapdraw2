"use client";
import { useAtom } from "jotai";
import Zoom from "./Zoom";
import Position from "./Position";
import { getRandomPosition } from "@/lib/getRandomPosition";

import { ZoomAtom } from "../atoms";

import Paths from "./Paths";
import Sites from "./Sites";

import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
} from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl;

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

      <LayersControl position="bottomright">
        <BaseLayer name="Esri Satellite + Labels">
          <LayerGroup>
            <TileLayer
              attribution="Tiles © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            <TileLayer
              attribution="Labels © Esri"
              url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            />
          </LayerGroup>
        </BaseLayer>

        <BaseLayer name="Hybrid OSM + Esri">
          <LayerGroup>
            <TileLayer
              attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              opacity={0.7}
            />
          </LayerGroup>
        </BaseLayer>

        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <BaseLayer name="Satellite">
          <TileLayer
            attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
}
