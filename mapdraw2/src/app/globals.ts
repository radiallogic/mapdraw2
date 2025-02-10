import { atom, useAtom } from "jotai";

export const SITES = "sites";
export const MOVE = "move";
export const DELETE = "delete";
export const DRAW = "draw";

export const ZoomAtom = atom(5);
export const PositionAtom = atom([0, 0]);
export const BoundsAtom = atom([0, 0]);

export enum mode {
  DRAW = "draw",
  MOVE = "move",
  DELETE = "delete",
  SITES = "sites",
}
export const ModeAtom = atom<mode>(mode.MOVE);

import { Path } from "@/app/components/Paths/PathTypes";
export const PathsAtom = atom<Array<Path>>([]);

import { TSite } from "./components/Sites/SiteTypes";
export const SitesAtom = atom<Array<TSite>>([]);
