import * as React from "react";
import { useAtom } from "jotai";
import SiteMarker from "../../sites/components/SiteMarker";
import { DrawMouseEvents } from "../../sites/components/DrawMouseEvents";
import { Site } from "../../sites/types";

import { SitesAtom } from "../../sites/atoms";

export default function Sites() {
  const [sites, setSites] = useAtom(SitesAtom);

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
