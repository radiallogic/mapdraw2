import { atom } from "jotai";
import { Path } from "./types";

// Atom that stores an array of paths (strings in this example)
export const pathsAtom = atom<Path[]>([]);
