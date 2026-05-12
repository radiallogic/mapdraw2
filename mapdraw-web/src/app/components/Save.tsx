import {
  PathsAtom,
  SitesAtom,
  PositionAtom,
  ZoomAtom,
  CurrentIdAtom,
} from "../globals";
import { useEffect } from "react";

import { type route } from "@/app/core_types";

import usePostPath from "../hooks/usePostRoute";
import usePostSite from "../hooks/usePostSite";
import usePostTrip from "../hooks/usePostTrip";
import { useAtom } from "jotai";

export default function Save() {
  const [paths, setPaths] = useAtom(PathsAtom);
  const [sites, seSites] = useAtom(SitesAtom);
  const [currentId, setCurrentId] = useAtom(CurrentIdAtom);
  const [position, setPosition] = useAtom(PositionAtom);
  const [zoom, setZoom] = useAtom(ZoomAtom);

  const postpath = usePostPath();
  const posSite = usePostSite();

  useEffect(() => {
    let p: route = {
      id: 1,
      tripId: currentId,
      paths: paths,
    };

    postpath(p);
  }, [paths]);

  useEffect(() => {
    posSite(sites);
  }, [sites]);

  useEffect(() => {}, [position]);

  useEffect(() => {}, [zoom]);

  return <></>;
}
