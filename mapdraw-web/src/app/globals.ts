import { atom } from "jotai";

export const ZoomAtom = atom(5);
export const PositionAtom = atom([0, 0]);
export const BoundsAtom = atom([0, 0]);

import { Path } from "@/app/components/Paths/types";
export const PathsAtom = atom<Array<Path>>([]);

import { Site } from "./components/Sites/types";
export const SitesAtom = atom<Array<Site>>([]);

export const CurrentIdAtom = atom(0);
