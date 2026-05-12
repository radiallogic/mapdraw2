import * as React from "react";
import { useAtom } from "jotai";
import SiteMarker from "./SiteMarker";
import { DrawMouseEvents } from "./DrawMouseEvents";
import { TSite } from "./SiteTypes";

import { SitesAtom, ModeAtom } from "@/app/globals";

export default function Sites() {
  const [sites, setSites] = useAtom(SitesAtom);
  const [mode] = useAtom(ModeAtom);

  let display = sites.map((site: TSite, i) => {
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
