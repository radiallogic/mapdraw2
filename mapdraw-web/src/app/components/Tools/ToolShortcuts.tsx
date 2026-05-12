import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { activeToolAtom, type ToolId } from "./state";

import { toolRegistry } from "./toolRegistry";

export const toolKeyMap: Record<string, ToolId> = Object.entries(
  toolRegistry,
).reduce(
  (map, [id, tool]) => {
    map[tool.key] = id as ToolId;
    return map;
  },
  {} as Record<string, ToolId>,
);

export function ToolShortcuts() {
  const setTool = useSetAtom(activeToolAtom);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tool = toolKeyMap[e.key];

      if (!tool) return;

      setTool(tool);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setTool]);

  return null;
}
