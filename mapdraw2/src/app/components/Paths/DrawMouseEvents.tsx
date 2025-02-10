import * as React from "react";
import { useMapEvents } from "react-leaflet";
import { DRAW, MOVE, DELETE } from "@/app/globals";

import { useAtom } from "jotai";
import { ZoomAtom, ModeAtom, mode as modeEnum } from "@/app/globals";

interface DrawMouseProps {
  saveline: Function;
  drawline: Function;
}

let draw = false;

export const DrawMouseEvents = (props: DrawMouseProps) => {
  const [mode, setMode] = useAtom(ModeAtom);

  const map = useMapEvents({
    mousemove(e) {
      // console.log(" move move:", mode);

      if (draw && mode == DRAW) {
        const point = map.mouseEventToContainerPoint(e.originalEvent);
        props.drawline(map.containerPointToLatLng(point));
      }

      //   if (draw &&  mode == DELETE) {
      //     const point = map.mouseEventToContainerPoint(e.originalEvent);
      //     props.lineToBounds(map.containerPointToLatLng(point));
      //   }

      if (mode == MOVE) {
        map.dragging.enable();
      }
    },
    mouseup(e) {
      //e.originalEvent.preventDefault();
      // map.dragging.enable();
      console.log("mouse up");

      if (mode == DRAW) {
        props.saveline();
        setMode(modeEnum.MOVE);
      }

      if (mode == DELETE) {
        // props.lineToBounds
      }

      draw = false;
    },
    mousedown(e) {
      //e.originalEvent.preventDefault();
      if (mode == DRAW || mode == DELETE) {
        draw = true;
        map.dragging.disable();
      }
      console.log("mouse down");
    },
  });

  return null;
};
