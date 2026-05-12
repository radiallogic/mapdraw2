import { PathsAtom, SitesAtom, PositionAtom, ZoomAtom } from "../globals";
import { useEffect } from "react";

import usePostPath from "../hooks/usePostPath";
import usePostSite from "../hooks/usePostSite";
import usePostTrip from "../hooks/usePostTrip";
import { useAtom } from "jotai";

export default function Save() {
  const [paths, setPaths] = useAtom(PathsAtom);
  const [sites, setSites] = useAtom(SitesAtom);
  const [position, setPosition] = useAtom(PositionAtom);
  const [zoom, setZoom] = useAtom(ZoomAtom);

  const postpath = usePostPath();
  const postsite = usePostSite();

  // useEffect(() => {
  //   postpath(paths);
  // }, [paths]);

  // useEffect(() => {
  //   postsite(sites);
  // }, [sites]);

  useEffect(() => {}, [position]);

  useEffect(() => {}, [zoom]);

  return <></>;
}
