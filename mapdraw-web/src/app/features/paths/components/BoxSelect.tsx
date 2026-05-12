import { useState, useRef } from "react";
import { useMapEvents } from "react-leaflet";
import L, { LatLng, LatLngBounds, Point } from "leaflet";

import { useAtom } from "jotai";
import { pathsAtom } from "../atoms.js";

export const BoxSelect = () => {
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties | null>(null);
  const startRef = useRef<Point | null>(null);

  const [paths, setPaths] = useAtom(pathsAtom);

  // Handle mouse events
  const map = useMapEvents({
    mousedown(e) {
      startRef.current = map.latLngToContainerPoint(e.latlng);
      map.dragging.disable();
      setBoxStyle({
        position: "absolute",
        border: "2px dashed #3388ff",
        backgroundColor: "rgba(51,136,255,0.05)",
        pointerEvents: "none",
        left: `${startRef.current.x}px`,
        top: `${startRef.current.y}px`,
        width: "0px",
        height: "0px",
      });
    },

    mousemove(e) {
      if (!startRef.current || !boxStyle) return;
      const current = map.latLngToContainerPoint(e.latlng);
      const x = Math.min(startRef.current.x, current.x);
      const y = Math.min(startRef.current.y, current.y);
      const width = Math.abs(startRef.current.x - current.x);
      const height = Math.abs(startRef.current.y - current.y);

      setBoxStyle(
        (prev) => prev && { ...prev, left: x, top: y, width, height },
      );
    },

    mouseup(e) {
      if (!startRef.current) return;
      const end = map.latLngToContainerPoint(e.latlng);
      const bounds = L.latLngBounds(
        map.containerPointToLatLng(startRef.current),
        map.containerPointToLatLng(end),
      );

      // Select features
      // paths.forEach((f) => {
      //   if (bounds.contains(f.getLatLng())) f.onSelect?.();
      // });

      // Reset
      startRef.current = null;
      setBoxStyle(null);
      map.dragging.enable();
    },
  });

  return boxStyle;
};
