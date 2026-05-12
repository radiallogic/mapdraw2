import { Bubble } from "../Bubble";
import { ToolsPanel } from "./ToolsPanel";
import { TripSelector } from "./TripSelector";
import { DistancePanel } from "./Distance";
import { useAtom } from "jotai";
import { toolbarCollapsedAtom } from "./state";
import Login from "./Login";

export function ToolBar({ distanceKm }: { distanceKm?: number }) {
  const [collapsed, setCollapsed] = useAtom(toolbarCollapsedAtom);

  return (
    <div className="flex flex-col w-64">
      <Bubble className="w-full">
        <TripSelector />
      </Bubble>
      <Bubble className={`flex flex-col ${collapsed ? "w-16" : "w-64"}`}>
        <ToolsPanel />
        <DistancePanel distanceKm={distanceKm} />
      </Bubble>
      <Bubble className="w-full">
        <Login />
      </Bubble>
    </div>
  );
}
