import { useMapEvents } from "react-leaflet";
import { DomEvent } from "leaflet";

import { SitesAtom } from "@/app/globals";

import { useAtom } from "jotai";

import { TSite } from "./SiteTypes";

export const DrawMouseEvents = () => {
  const [sites, setSites] = useAtom(SitesAtom);
  const map = useMapEvents({
    dblclick(e) {
      map.doubleClickZoom.disable();
      DomEvent.stopPropagation(e);
      e.originalEvent.preventDefault();

      console.log("addsite 2");

      // props.addSite(e.latlng);

      const site: TSite = { content: "", position: e.latlng };
      setSites([...sites, site]);
    },
  });

  return null;
};
