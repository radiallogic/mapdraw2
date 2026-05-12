import { Bubble } from "../Bubble";
import { ToolsPanel } from "./ToolsPanel";
import { TripSelector } from "./TripSelector";
import { DistancePanel } from "./Distance";
import Footer from "../interface/Footer";
export function ToolBar({ distanceKm }: { distanceKm?: number }) {
  return (
    <Bubble>
      <TripSelector />
      <ToolsPanel />
      <DistancePanel distanceKm={distanceKm} />

      <Footer />
    </Bubble>
  );
}
