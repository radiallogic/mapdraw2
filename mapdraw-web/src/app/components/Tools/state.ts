import { atom } from "jotai";

import { toolRegistry } from "./toolRegistry";

export const tripsCollapsedAtom = atom(true); // for trips selector

export type ToolId = keyof typeof toolRegistry;

export const activeToolAtom = atom<ToolId>("move");
export const toolbarCollapsedAtom = atom(false);
