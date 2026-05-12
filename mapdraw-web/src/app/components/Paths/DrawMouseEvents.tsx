import * as React from "react";
import { useMapEvents } from "react-leaflet";
import { useAtom } from "jotai";
import { activeToolAtom } from "../Tools/state";

interface DrawMouseProps {
  saveline: Function;
  drawline: Function;
}

let draw = false;

export const DrawMouseEvents = (props: DrawMouseProps): React.ReactElement => {
  const [tool, setTool] = useAtom(activeToolAtom);
  const map = useMapEvents({
    mousemove(e) {
      if (draw && tool == "draw") {
        const point = map.mouseEventToContainerPoint(e.originalEvent);
        props.drawline(map.containerPointToLatLng(point));
      }

      // if (tool == "delete") {
      //   const point = map.mouseEventToContainerPoint(e.originalEvent);
      //   //props.drawline(map.containerPointToLatLng(point));
      // }

      if (tool == "move") {
        map.dragging.enable();
      }
    },
    mouseup(e) {
      console.log("mouse up");

      if (tool == "draw") {
        props.saveline();
        setTool("move");
      }
      draw = false;
    },
    mousedown(e) {
      if (tool == "draw" || tool == "delete") {
        draw = true;
        map.dragging.disable();
      }
      console.log("mouse down");
    },
  });

  return <></>;
};
