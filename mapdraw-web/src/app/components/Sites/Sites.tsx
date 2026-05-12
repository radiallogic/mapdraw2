import * as React from "react";
import { useAtom } from "jotai";
import SiteMarker from "./SiteMarker";
import { DrawMouseEvents } from "./DrawMouseEvents";
import { Site } from "./types";

import { SitesAtom } from "@/app/globals";

export default function Sites() {
  const [sites, seSites] = useAtom(SitesAtom);

  let display = sites.map((site: Site, i) => {
    return <SiteMarker site={site} key={i}></SiteMarker>;
  });

  const addSite = () => {};

  return (
    <>
      <DrawMouseEvents />
      {display}
    </>
  );
}
