import { useMapEvents } from "react-leaflet";
import { DomEvent } from "leaflet";

import { SitesAtom } from "../../sites/atoms";

import { useAtom } from "jotai";

import { Site } from "../types";

export const DrawMouseEvents = () => {
  const [sites, seSites] = useAtom(SitesAtom);
  const map = useMapEvents({
    dblclick(e) {
      map.doubleClickZoom.disable();
      DomEvent.stopPropagation(e);
      e.originalEvent.preventDefault();

      console.log("addsite 2");

      // props.addSite(e.latlng);

      const site: Site = { content: "", position: e.latlng };
      seSites([...sites, site]);
    },
  });

  return null;
};
